<template>
    <div>
        <div class="container">
            <slot></slot>
            <div v-show="navigation" class="nav-left" :style="{zIndex:navIndex}">
                <div><a @click="previousSlide"><slot name="nav-left">left</slot></a></div>
            </div>
            <div v-show="navigation" class="nav-right" :style="{zIndex:navIndex}">
                <div><a @click="nextSlide"><slot name="nav-right">right</slot></a></div>
            </div>
            <div class="pagination"></div>
        </div>
    </div>
</template>
<script>
export default {
    data:function(){
        return {
            navIndex:1,
            navigation:true,
            parent:null,
            contents:[],
            ghost:null,
            width:0,
            height:0,
            dragStartX:0,
            dragStartY:0,
            dragDiffX:0,
            dragDiffY:0
        }
    },
    methods:{
        nextSlide:function(){
            
        },
        previousSlide:function(){

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
            this.parent.style.height = this.height+'px';
            this.resizeBackgrounds();
        },
        createBackgrounds:function(){
            for(var i in this.contents){
                var content = this.contents[i];
                
                this.createBackground(content,i);
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
            
            return content;
        },
        resizeBackground:function(content){
            content.style.height = this.height+'px';
            content.style.width = this.width+'px';
        },
        resizeBackgrounds:function(){
            for(var i in this.contents){
                this.resizeBackground(this.contents[i]);
            }
        },
        loadImage:function(content,src,done){
            var img = new Image();
            var w = 0;
            var h = 0;
            img.onload = function(){
                w = img.width;
                h = img.height;
                content.setAttribute('data-width',w);
                content.setAttribute('data-height',h);
                if(done){done({w:w,h:h})}
            }
            img.src = src;
        },
        createDragHandler:function(){
            this.drag = document.createElement('div');
            this.drag.style.cssText = 'position:absolute;z-index:'+this.contents.length+1+';top:0px;left:0px;';
            this.drag.style.width = this.width+'px';
            this.drag.style.height = this.height+'px';
            this.parent.appendChild(this.drag);
            this.drag.addEventListener('mousedown',this.dragStarted);
        },
        dragStarted:function(){
            this.dragStartX = event.pageX;
            document.addEventListener('mousemove',this.dragging);
            document.addEventListener('mouseup',this.dragEnded)
        },
        dragging:function(){
            this.dragDiffX = event.pageX - this.dragStartX;
            console.log(event.pageX);
        },
        dragEnded:function(){
            document.removeEventListener('mousemove',this.dragging)
            document.removeEventListener('mouseup',this.dragEnded);
            //alert(this.dragDiffX);
            //if minus drag left
            //if plus drag right
        }
    },
    beforeUpdate:function(){
        if(this.$slots.default && this.$slots.default.length>0){
            var children = this.$slots.default[0];
            console.log(children);
        }
    },
    mounted(){
        this.$el.style.cssText = 'position:relative';
        this.parent = this.$el.querySelector('div:first-child');
        this.parent.style.cssText = 'position:relative;';
        var children = this.$el.querySelectorAll('.content');
        [].forEach.call(children,(elem)=>{
            this.contents.push(elem);
        })
        this.createGhost();
        this.createBackgrounds();
        this.createDragHandler();
        window.addEventListener('resize',this.resized)
        this.resized();
    },
    destroy(){
        window.removeEventListener('resize',this.resized);
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
</style>