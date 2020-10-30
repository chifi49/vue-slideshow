<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    data(){
        return {
            parent:null,
            contents:[],
            ghost:null,
            width:0,
            height:0
        }
    },
    methods:{
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
            this.loadImage(content,src,function(opt){
                content.style.setAttribute('data-width',opt.w);
                content.style.setAttribute('data-height',opt.h);
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
                if(done){done({w:w,h:h})}
            }
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
        window.addEventListener('resize',this.resized)
        this.resized();
    },
    destroy(){
        window.removeEventListener('resize',this.resized);
    }
}
</script>
<style scoped>

</style>