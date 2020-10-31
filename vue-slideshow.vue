<template>
    <div tabindex="-1" :style="{'outline-color':'transparent','position':'relative',backgroundColor:backgroundColor}">
        <div class="container" style="overflow:hidden;">
            <slot></slot>
            <div v-show="nav" class="nav-left" :style="{zIndex:contents.length+1}">
                <div><a @click="previousSlide" :style="{color:navArrow,'border-color':navBorder,'background-color':navBackground}"><slot name="nav-left">&#9664;</slot></a></div>
            </div>
            <div v-show="nav" class="nav-right" :style="{zIndex:contents.length+1}">
                <div><a @click="nextSlide" :style="{color:navArrow,'border-color':navBorder,'background-color':navBackground}"><slot name="nav-right" >&#9654;</slot></a></div>
            </div>
            <div class="pagination" v-show="pager" :style="{zIndex:contents.length+1}">
                <a v-for="(page,i) in contents" :style="{'background-color':i==slideIndex?pagerBackground:'transparent'}" v-bind:key="'page'+i" @click="selectPage(i)"></a>
            </div>
            <a class="fullscreen" @click="fullScreen" v-show="fullscreen" :style="{zIndex:contents.length+1}">
                <slot name="fullscreen">
                    &#8599;
                    <span>&#8601;</span>
                    <span class="fullscreen2">&#8599;</span>
                    <span class="fullscreen3">&#8601;</span>
                </slot>
            </a>
            
        </div>

        <div class="thumbnails" v-if="thumbs" :style="{'position':'relative','width':'100%','overflow-x':'hidden','height':params.thumbs.height+'px'}" >
            <table style="position:absolute;top:0px;left:0px;border-style:none;padding:0;margin:0;border-spacing:0;border:none;">
                <tr>
                    <td v-for="(src,index) in thumb_paths" cellpadding="0" cellspacing="0" :data-x="params.thumbs.height*index" :data-index="index" v-bind:key="src" style="padding:0;margin:0;box-sizing:border-box;border-spacing:0;">
                        <div :style="{'cursor':'pointer','background-image':'url('+src+')','background-repeat':'no-repeat','background-size':'cover','width':params.thumbs.width+'px','height':params.thumbs.height+'px','box-sizing':'border-box','border-style':'solid','border-width':'2px','border-color':index==slideIndex?thumbsSelectedBorder:thumbsBorder}" @click="selectThumb(index)"></div>
                    </td>
                </tr>
            </table>
        </div>
        
    </div>
</template>
<script>
export default {
    props:{
        params:{
            type:Object,
            default:function(p){
                console.log(p);
                return{
                    autoplay: true,
                    backgroundColor:'#000',
                    imageRatio:1,
                    fullscreen:true,
                    animation:'fade',
                    speed: 750,
                    timeout: 2500,
                    thumbs:{
                        visible:true,
                        height:90,
                        width:100
                    },
                    nav:{
                        visible:false,
                        borderColor:'#fff',
                        backgroundColor:'transparent',
                        arrowColor:'#fff'
                    },
                    pager:{
                        visible:false
                    }
                }
            }
        },
        heightResizer:{
            type:Function
        }
    },
    data:function(){
        return {
            isDragging:false,
            previous_autoplay:false,
            animating:false,
            animating_timeout:0,

            slideIndex: 0, 
            navIndex:1,
            
            parent:null,
            contents:[],
            ghost:null,
            width:0,
            height:0,
            dragStartX:0,
            dragStartY:0,
            dragDiffX:0,
            dragDiffY:0,
            isFullScreen:false,
            image_paths:[],
            thumb_paths:[],
            animated_elements:0 //counter callback functions
        }
    },
    computed:{
        backgroundColor:function(){
            return this.params && this.params.backgroundColor?this.params.backgroundColor:'#000';
        },
        imageratio:function(){
            return this.params && this.params.imageRatio?this.params.imageRatio:1;
        },
        fullscreen:function(){
            return this.params && typeof this.params.fullscreen!=='undefined'?this.params.fullscreen:true;
        },
        thumbsSelectedBorder:function(){
            return this.params && this.params.thumbs && this.params.thumbs.selectedBorderColor?this.params.thumbs.selectedBorderColor:'#000';
        },
        thumbsBorder:function(){
            return this.params && this.params.thumbs && this.params.thumbs.borderColor?this.params.thumbs.borderColor:'#fff';
        },
        pagerBackground:function(){
            return this.params && this.params.pager && this.params.pager.backgroundColor?this.params.pager.backgroundColor:'#fff';
        },
        autoplay:function(){
            return this.params && typeof this.params.autoplay!=='undefined'?this.params.autoplay:true;
        },
        timeout:function(){
            return this.params && this.params.timeout?Math.abs(parseInt(this.params.timeout)):2500;
        },
        speed:function(){
            return this.params && this.params.speed?Math.abs(parseInt(this.params.speed)):750;
        },
        animation:function(){
            return this.params && this.params.animation && this.params.animation=='slide'?this.params.animation:'fade';
        },
        navArrow:function(){
            return this.params && this.params.nav && this.params.nav.arrowColor?this.params.nav.arrowColor:'#fff';
        },
        navBorder:function(){
            return this.params && this.params.nav && this.params.nav.borderColor?this.params.nav.borderColor:'#fff';
        },
        navBackground:function(){
            return this.params && this.params.nav && this.params.nav.backgroundColor?this.params.nav.backgroundColor:'transparent';
        },
        nav:function(){
            return this.params && this.params.nav && this.params.nav.visible?this.params.nav.visible:false;
        },
        pager:function(){
            return this.params && this.params.pager && this.params.pager.visible?this.params.pager.visible:false;
        },
        thumbs:function(){
            return this.params && this.params.thumbs && this.params.thumbs.visible?this.params.thumbs.visible:false;
        },
        correctHeight:function(){
            var heighttmp = this.height;
            if(this.params && this.params.maxHeight && this.params.maxHeight<heighttmp){
                heighttmp = this.params.maxHeight;
            }
            if(this.heightResizer!=null){
                var user_height= this.heightResizer(this);
                if(user_height<heighttmp){
                    heighttmp = user_height;
                }
            }
            if(this.params && this.params.minHeight && this.params.minHeight>heighttmp){
                heighttmp = this.params.minHeight;
            }
            console.log('height',heighttmp);
            return heighttmp;
        }
    },

    methods:{
        slideLeft:function(elem,to,final,done){
            //var distance = 0;
            var nowt = (new Date()).getTime();
            //console.log('final',final);
            var from = parseFloat(elem.style.left.replace('px',''));
            var tick = ()=>{
                var passedt = (new Date()).getTime();
                var diff = passedt - nowt;
                var step = final/this.speed;///final;
                
                elem.style.left = from - (step*diff)+'px';
                if(this.speed>diff){
                    window.requestAnimationFrame && window.requestAnimationFrame(tick) || setTimeout(tick,16);
                }else{
                    console.log(elem.style.left);
                    elem.style.left = to+'px';
                    done();
                }
            };
            tick();
        },
        slideRight:function(elem,to,final,done){
            //var distance = 0;
            var nowt = (new Date()).getTime();
            //console.log('final',final);
            var from = parseFloat(elem.style.left.replace('px',''));
            var tick = ()=>{
                var passedt = (new Date()).getTime();
                var diff = passedt - nowt;
                var step = final/this.speed;///final;
                
                elem.style.left = from + (step*diff)+'px';
                if(this.speed>diff){
                    window.requestAnimationFrame && window.requestAnimationFrame(tick) || setTimeout(tick,16);
                }else{
                    console.log(elem.style.left);
                    elem.style.left = to+'px';
                    done();
                }
            };
            tick();
        },
        fadeIn:function(elem,done){
            elem.style.left = '0px';
            elem.style.opacity = 0;
            var nowt = (new Date()).getTime();
            var tick = () =>{
                var passedt = (new Date()).getTime();
                var diff = passedt - nowt;
                var left = parseFloat(this.speed - diff);
                var opacity = parseFloat(diff/1000.0) * 1000/this.speed;
                elem.style.opacity = opacity;
                
                if(opacity<1){
                    window.requestAnimationFrame && window.requestAnimationFrame(tick) || setTimeout(tick,16)
                }else{
                    elem.style.opacity = 1;
                    done();
                }
                return left/1000;
            }
            tick();
        },
        fadeOut:function(elem,done){
            elem.style.left = '0px';
            elem.style.opacity = 1;
            var nowt = (new Date()).getTime();
            var tick = () =>{
                var passedt = (new Date()).getTime();
                var diff = passedt - nowt;
                var left = parseFloat(this.speed - diff);
                var opacity = parseFloat(left/1000.0) * 1000/this.speed;
                elem.style.opacity = opacity;
                
                if(opacity>0){
                    window.requestAnimationFrame && window.requestAnimationFrame(tick) || setTimeout(tick,16)
                }else{
                    elem.style.opacity = 0;
                    done();
                }
                return left/1000;
            }
            tick();
        },
        animate:function(cindex,nindex){
            if(this.animating){
                return;
            }
            this.animated_elements = 0;

            this.animating = true;
            var ccontent = this.contents[cindex];
            var ncontent = this.contents[nindex];
            if(this.animation=='fade'){
                ccontent.style.zIndex = 2;
                ncontent.style.zIndex = 1;
                this.fadeOut(ccontent,this.animate_finished);
                this.fadeIn(ncontent,this.animate_finished);
            }else if(this.animation=='slide'){
                if(nindex>cindex){
                    var final = this.width;
                    var cto = this.width*-1;
                    var nto = 0;
                    ccontent.style.zIndex=1;
                    ncontent.style.zIndex=2;
                    ccontent.style.left='0px';
                    ncontent.style.left=this.width+'px';
                    ncontent.style.opacity = 1;
                    this.slideLeft(ccontent,cto,final,this.animate_finished);
                    this.slideLeft(ncontent,nto,final,this.animate_finished);
                }else{
                    ccontent.style.left='0px';
                    ncontent.style.left=this.width*-1+'px';
                    ncontent.style.opacity=1;
                    this.slideRight(ccontent,this.width,this.width,this.animate_finished);
                    this.slideRight(ncontent,0,this.width,this.animate_finished);
                }
            }
        },
        animate_finished:function(){
            this.animated_elements++;
            if(this.animated_elements==2){
                //move to next one
                //this.animated_elements=0;
                this.animating = false;
                var cindex = this.slideIndex;
                var nindex = cindex+1>this.contents.length-1?0:cindex+1;
                if(this.autoplay){
                    this.animating_timeout = setTimeout(()=>{
                        this.slideIndex = nindex;
                        this.animate(cindex,nindex);
                    },this.timeout)
                }
            }
        },
        getDomNode:function(){
            return this.$el;
        },
        fullScreen:function(){
            if(this.isFullScreen){
                document.exitFullscreen();
            }else{
                if(this.$el.requestFullscreen){
                    this.$el.requestFullscreen();
                }
            }
        },
        moveTo:function(index){
            clearTimeout(this.animating_timeout);
            var cindex = this.slideIndex;
            var nindex = parseInt(index);
            this.slideIndex = nindex;
            this.animate(cindex,nindex);
        },
        selectPage:function(index){
            //var content = this.contents[index];
            //alert(content.getAttribute('data-url'));
            if(!this.animating){
                //alert(index);
                this.moveTo(index);
                this.pageSelected(index);
            }
        },
        selectThumb:function(index){
            if(!this.animating){
                this.moveTo(index);
                this.thumbSelected(index)
            }
        },
        pageSelected:function(i){
            
            this.$emit('pageSelected',{index:i})
        },
        thumbSelected:function(i){
            this.$emit('thumbSelected',{index:i});
        },
        getHeight:function(){
            return this.height;
        },
        getBackgroundHeight:function(){
            return this.maxheight;
        },
        nextSlide:function(){
            if(!this.animating){
                clearTimeout(this.animating_timeout);
                var cindex = this.slideIndex;
                var nindex = cindex+1>this.contents.length-1?0:cindex+1;
                this.slideIndex = nindex;
                this.animate(cindex,nindex);
                this.$emit('nextSlide',{})
            }
        },
        previousSlide:function(){
            if(!this.animating){
                clearTimeout(this.animating_timeout);
                var cindex = this.slideIndex;
                var nindex = cindex-1<0?this.contents.length-1:cindex-1;
                this.slideIndex = nindex;
                this.animate(cindex,nindex);
                this.$emit('previousSlide',{})
            }
        },
        createGhost:function(){
            if(this.ghost==null){
                this.ghost = document.createElement('div');
                this.ghost.style.cssText = 'position:fixed;z-index:-1;top:0px;left:0px;right:0px;bottom:0px;';
                this.$el.appendChild(this.ghost);
            }
            this.width = this.ghost.offsetWidth;
            this.height = this.ghost.offsetHeight;
        },
        resized:function(){
            this.width = this.ghost.offsetWidth;
            this.height = this.ghost.offsetHeight;
            this.parent.style.width = this.width+'px';
            this.parent.style.height = this.correctHeight+'px';
            this.drag.style.height = this.correctHeight+'px';
            this.resizeBackgrounds();
        },
        createBackgrounds:function(){
            for(var i in this.contents){
                var content = this.contents[i];
                if(content.getAttribute('data-init')==null){
                    this.createBackground(content,i);
                }
                //this.resizeBackground(content);
            }
        },
        createBackground:function(content,index){
            var img = content.querySelector('img:first-child');
            var src = img.src;
            content.removeChild(img);
            content.setAttribute('data-index',index);
            content.style.cssText = 'position:absolute;left:0px;top:0px;z-index:1';
            this.loadImage(content,src,function(){
                //content.style.setAttribute('data-width',opt.w);
                //content.style.setAttribute('data-height',opt.h);
            })
            content.style.backgroundImage = 'url('+src+')';
            content.style.backgroundRepeat = 'no-repeat';

            content.style.backgroundSize ='cover';
            content.style.backgroundPosition = 'center';

            var tsrc = src;
            if(img.getAttribute('data-thumb')!=null){
                tsrc = img.getAttribute('data-thumb');
            }
            content.setAttribute('data-url',src);
            content.setAttribute('data-thumb',tsrc);
            this.image_paths.push(src);
            this.thumb_paths.push(tsrc);

            content.setAttribute('data-init',1);
            return content;
        },
        resizeBackground:function(content){
            content.style.height = this.correctHeight+'px';
            content.style.width = this.width+'px';
        },
        resizeBackgrounds:function(){
            for(var i in this.contents){
                this.resizeBackground(this.contents[i]);
            }
        },
        setupBackgrounds:function(){
            for(var i in this.contents){
                var content = this.contents[i];
                content.style.left = '0px';
                content.style.opacity = 0;
            }
        },
        loadImage:function(content,src,done){
            var img = new Image();
            var w = 0;
            var h = 0;
            var me = this;
            img.onload = function(){
                w = img.width;
                h = img.height;
                content.setAttribute('data-width',w);
                content.setAttribute('data-height',h);
                var position = 'horizontal';
                if(w<h){
                    position = 'vertical';
                }
                var index = parseInt(content.getAttribute('data-index'));
                //console.log('ratio',me.imageratio);
                if( (position=='vertical' && me.imageratio==1) || me.imageratio==2){
                    content.style.backgroundSize='auto 100%';
                }
                if(index==0){
                    me.init();
                }
                content.setAttribute('data-type',position);
                if(done){done({w:w,h:h})}
            }
            img.src = src;
        },
        createDragHandler:function(){
            this.drag = document.createElement('div');
            this.drag.style.cssText = 'position:absolute;z-index:'+(this.contents.length)+';top:0px;left:0px;';
            this.drag.style.width = this.width+'px';
            this.drag.style.height = this.correctHeight+'px';
            this.parent.appendChild(this.drag);
            this.drag.addEventListener('mousedown',this.dragStarted);
        },
        dragStarted:function(){
            if(this.animating){
                return;
            }
            this.previous_autoplay = this.autoplay;
            this.params.autoplay = false;
            clearTimeout(this.animating_timeout);
            //pause animation
            this.dragStartX = event.pageX;
            document.addEventListener('mousemove',this.dragging);
            document.addEventListener('mouseup',this.dragEnded)
        },
        dragging:function(){
            this.dragDiffX = event.pageX - this.dragStartX;
            //console.log(this.dragDiffX);
            var dragDiffX = Math.abs(this.dragDiffX);
            if(dragDiffX>20){
                this.isDragging=true;

                
                var ccontent = this.contents[this.slideIndex];
                ccontent.style.left = this.dragDiffX+'px';
                //ccontent.style.left = this.dragDiffX+'px';
                if(this.dragDiffX<0){
                    if(this.slideIndex+1<=this.contents.length-1){
                        var ncontent = this.contents[this.slideIndex+1];
                        ncontent.style.opacity = 1;
                        ncontent.style.left = this.width+this.dragDiffX+'px'
                    }
                }else{
                    if(this.slideIndex-1>=0){
                        var pcontent = this.contents[this.slideIndex-1];
                        pcontent.style.opacity = 1;
                        pcontent.style.left = (this.width*-1)+this.dragDiffX+'px';
                    }
                }     
            }else{
                this.isDragging=false;
            }
        },
        dragEnded:function(){
            var animated=false;
            this.animated_elements=0;
            this.params.autoplay = this.previous_autoplay;

            if(this.isDragging){
                
                
                console.log(this.params.autoplay);
                //this.dragDiffX = event.pageX - this.dragStartX;
                //console.log(this.dragDiffX);
                var moved_enought = Math.abs(this.dragDiffX)>(this.width/4)?true:false;
                
                if(moved_enought){
                    //alert(true);
                    if(this.dragDiffX<0){
                        //we need to move left
                        var cindex = this.slideIndex;
                        if(cindex+1<=this.contents.length-1){
                            animated=true;
                            var nindex = cindex+1;
                            var ccontent = this.contents[cindex];
                            var ncontent = this.contents[nindex];
                            this.slideIndex = nindex;
                            this.slideLeft(ccontent,this.width*-1,this.width-Math.abs(this.dragDiffX),this.animate_finished);
                            this.slideLeft(ncontent,0,this.width-Math.abs(this.dragDiffX),this.animate_finished);
                        }else{
                            animated=true;
                            this.slideRight(this.contents[cindex],0,Math.abs(this.dragDiffX),this.animate_finished);
                            this.animate_finished();
                        }
                    }else if(this.dragDiffX>0){
                        var cindex2 = this.slideIndex;
                        if(cindex2-1>=0){
                            animated=true;
                            var nindex2 = cindex2-1;
                            var ccontent2 = this.contents[cindex2];
                            var ncontent2 = this.contents[nindex2];
                            this.slideIndex = nindex2;
                            this.slideRight(ccontent2,this.width,this.width-Math.abs(this.dragDiffX),this.animate_finished);
                            this.slideRight(ncontent2,0,this.width-Math.abs(this.dragDiffX),this.animate_finished);
                        }else{
                            animated=true;
                            //this.slideRight(this.contents[cindex2],0,this.width-Math.abs(this.dragDiffX),this.animate_finished);
                            //this.animate_finished();
                            //alert(true);
                            this.slideLeft(this.contents[cindex2],0,Math.abs(this.dragDiffX),this.animate_finished);
                        
                            this.animate_finished();
                        }
                    }

                }else{
                    //return back
                    if(this.dragDiffX<0){
                        //we need to move right
                        var cindex3 = this.slideIndex;
                        if(cindex3+1<=this.contents.length-1){
                            animated=true;
                            var nindex3 = cindex3+1;
                            var ccontent3 = this.contents[cindex3];
                            var ncontent3 = this.contents[nindex3];
                            //this.slideIndex = nindex;
                            this.slideRight(ccontent3,0,Math.abs(this.dragDiffX),this.animate_finished);
                            this.slideRight(ncontent3,this.width,Math.abs(this.dragDiffX),this.animate_finished);
                        }else{
                            animated=true;
                            this.slideRight(this.contents[cindex3],0,Math.abs(this.dragDiffX), this.animate_finished);
                            this.animate_finished();
                        }
                    }else if(this.dragDiffX>0){
                        var cindex4 = this.slideIndex;
                        if(cindex4-1>=0){
                            animated=true;
                            var nindex4 = cindex4-1;
                            var ccontent4 = this.contents[cindex4];
                            var ncontent4 = this.contents[nindex4];
                        // this.slideIndex = nindex2;
                            this.slideLeft(ccontent4,0,Math.abs(this.dragDiffX),this.animate_finished);
                            this.slideLeft(ncontent4,this.width*-1,Math.abs(this.dragDiffX),this.animate_finished);
                        }else{
                            animated=true;
                            this.slideLeft(this.contents[cindex4],0,Math.abs(this.dragDiffX),this.animate_finished);
                            this.animate_finished();
                        }
                    }
                }
                
            }else{
                var cindex_1 = this.slideIndex;
                var ccontent_1 = this.contents[cindex_1];
                ccontent_1.style.left='0px';
                if(this.dragDiffX<0){
                    if(cindex_1+1<=this.contents.length-1){
                           
                        this.contents[cindex_1+1].style.left=this.width;
                    }
                }else if(this.dragDiffX>0){
                    if(cindex_1-1>=0){
                        this.contents[cindex_1-1].style.left=this.width*-1;
                    }
                }
            }
            console.log(animated);
            if(this.autoplay && !animated){
                this.animating_timeout = setTimeout(()=>{
                    //this.slideIndex = nindex;
                    this.animate(cindex,nindex);
                },this.timeout)
            }
            
            document.removeEventListener('mousemove',this.dragging)
            document.removeEventListener('mouseup',this.dragEnded);
        },
        fullscreenchange:function(){
            if(document.fullscreenElement==this.$el){
                this.isFullScreen=true;
            }else{
                this.isFullScreen=false;
            }
        },
        keyup:function(event){
            if(event.keyCode==37){
                //previousslide
                this.previousSlide();
            }else if(event.keyCode==39){
                //nextslide
                this.nextSlide();
            }
        },
        init:function(){
            this.fadeIn(this.contents[0],()=>{
                //alert('ok')
                //alert(this.autoplay);
                if(this.autoplay){
                   // alert(this.timeout);
                    this.animating_timeout = setTimeout(()=>{
                      //  alert('in');
                        var cindex = this.slideIndex;
                        var nindex = cindex+1>this.contents.length-1?0:cindex+1;
                        this.slideIndex = nindex;
                        this.animate(cindex,nindex);
                    },this.timeout)
                }
            });
            this.$emit('inited',{instance: this});
        }
    },
    beforeUpdate:function(){
        //before update will run also
        if(this.$slots.default && this.$slots.default.length>0){
            var me = this;
            this.$nextTick(()=>{
                var contents = me.$el.querySelectorAll('.content');
                
                console.log('length',contents.length);
                [].forEach.call(contents,function(elem){
                    console.log(elem.getAttribute('data-init'));
                    if(elem.getAttribute('data-init')==null){
                        console.log('found',elem);
                        me.contents.push(elem);
                    }
                })
                me.createBackgrounds();
                me.resizeBackgrounds();
            });
            //this.createBackgrounds();
            //this.resizeBackgrounds();
        }
    },
    mounted(){
        
        //this.$el.style.cssText = 'position:relative';
        this.parent = this.$el.querySelector('div:first-child');
        this.parent.style.cssText = 'position:relative;overflow:hidden';
        var children = this.$el.querySelectorAll('.content');
        [].forEach.call(children,(elem)=>{
            this.contents.push(elem);
        })
        this.createGhost();
        this.createBackgrounds();
        this.setupBackgrounds();
        this.createDragHandler();
        window.addEventListener('resize',this.resized)
        window.addEventListener('fullscreenchange',this.fullscreenchange)
        this.$el.addEventListener('keyup',this.keyup);
        this.resized();
        //this.fadeIn(this.contents[0]);
    },
    destroy(){
        window.removeEventListener('resize',this.resized);
        window.removeEventListener('fullscreenchange',this.fullscreenchange)
    }
}
</script>
<style scoped>
.nav-right, .nav-left{
    position:absolute;
    top:0px;
    bottom:0px;
    display:table;
    height:100%;
    
}
.nav-right a, .nav-left a{
    border:solid 1px #fff;
    padding:5px 9px;
    cursor:pointer;
}
.nav-left{
    left:10px;
}
.nav-left>div{
    display:table-cell;
    vertical-align:middle;
}
.nav-right{
    right:10px;
}
.nav-right>div{
    display:table-cell;
    vertical-align:middle;
}
.pagination{
    position:absolute;
    bottom:10px;
    left:0px;
    width:100%;
    text-align:center;
}
.pagination>a{
    display:inline-block;
    border:solid 1px #fff;
    border-radius:12px;
    height:12px;
    width:12px;
    margin-left:2px;
    margin-right:2px;
    cursor:pointer;
}
.pagination>a.selected{
    background-color:#fff;
}
.fullscreen{
    position:absolute;
    top:20px;
    right:20px;
    color:#fff;
    font-size:21px;
    cursor:pointer;
}
.fullscreen span{
    position:absolute;
    top:0px;left:0px;
}
.fullscreen .fullscreen2, .fullscreen .fullscreen3{
    position:absolute;
    transform:rotate(-90deg);
    top:1px;left:-1px;
}
</style>