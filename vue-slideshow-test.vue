<template>
    <div id="app">
        <vueslideshow ref="slideshow" :heightResizer="heightResize" v-bind:params="slideshowParams">
            
                <div class="content" v-bind:key="image" v-for="image in images">
                    <img :src="image" />
                </div>
                
            
        </vueslideshow>
        <br />
        <button @click="addContent">Add</button>&nbsp;<button @click="fullScreen">Full</button>
    </div>
</template>
<script>
import vueslideshow from './vue-slideshow'
export default{
    data(){
        return {
            slideshowParams:{
                imageRatio:2,//0, 1 and 2
                autoplay:true,
                fullscreen:true,
                animation:'fade',
                minHeight:360,
                thumbs:{
                    visible:true,
                    height:70,
                    width:100
                },
                nav:{
                    visible:true
                },
                pager:{
                    visible:true
                }
            },
            images:[
                'https://media.publit.io/file/islands/1.jpg',
                'https://media.publit.io/file/islands/2.jpg',
                'https://media.publit.io/file/islands/3.jpg'
            ]
        }
    },
    methods:{
        heightResize:function( instance ){
            return instance.getHeight() - this.slideshowParams.thumbs.height
        },
        addContent:function(){
            this.images.push('https://media.publit.io/file/islands/'+(this.images.length+1)+'.jpg');
        },
        fullScreen:function(){
            this.$refs['slideshow'].fullScreen();
        }
    },
    components:{vueslideshow}
}
</script>
<style >
body{
    margin:0;padding:0;
}
</style>
