<template>
    <div id="app">
        <vueslideshow ref="slideshow" :heightResizer="heightResize" v-bind:params="slideshowParams">
            
                <div class="content" v-bind:key="content.image" v-for="content in contents">
                    <img :src="content.image" />
                    <div :data-pos-v="content.position.vertical" :data-pos-h="content.position.horizontal" >
                        <div>
                            <div>
                                <template v-if="content.title">
                                    <h2>{{content.title}}</h2>
                                </template>
                                <template v-if="content.body">
                                    <p>{{content.body}}</p>
                                </template>
                                <template v-if="content.buttons && content.buttons.length>0">
                                    <button v-for="button in content.buttons" v-bind:key="button.text" v-on:click="button_function(button.action)">
                                        {{button.text}}
                                    </button>
                                </template>
                            </div>
                        </div>

                    </div>
                </div>
            
        </vueslideshow>

        <br />
        <button @click="addContent">Add</button>&nbsp;<button @click="fullScreen">Full</button>
        &nbsp;<button @click="hideThumbs">Hide Thumbs</button>&nbsp;<button @click="showThumbs">Show Thumbs</button>
        &nbsp;<button @click="thirdSlide">3rd Slide</button>
    </div>
</template>
<script>
import vueslideshow from './vue-slideshow'
export default{
    data(){
        return {
            slideshowParams:{
                imageRatio:1,//0, 1 and 2
                autoplay:false,
                fullscreen:true,
                animation:'slide',
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
                'https://media.publit.io/file/islands/3.jpg',
                'https://media.publit.io/file/islands/4.jpg',
                'https://media.publit.io/file/islands/5.jpg',
                'https://media.publit.io/file/islands/6.jpg',
                'https://media.publit.io/file/islands/7.jpg'
            ],
            contents:[
                {
                    title:'hi there', subtitle:'where are you?', body:'everything ok?', 
                    buttons:[
                        {text:'next',action:'nextSlide'}
                    ], 
                    image:'https://media.publit.io/file/islands/1.jpg',
                    position:{
                        vertical:'middle',
                        horizontal:'center'
                    }
                },
                {
                    title:'howdy?', subtitle:'did you go?', body:'everything ok?', 
                    buttons:[
                        {text:'previous',action:'previousSlide'},{text:'next',action:'nextSlide'}
                    ], 
                    image:'https://media.publit.io/file/islands/2.jpg' ,
                    position:{
                        vertical:'top',
                        horizontal:'left'
                    }
                }
                ,
                {
                    title:'My Ninja!', subtitle:'are you white?', body:'we will fight!', 
                    buttons:[
                        {text:'yes',action:'firstSlide'},{text:'no',action:'lastSlide'}
                    ], 
                    image:'https://media.publit.io/file/islands/3.jpg' ,
                    position:{
                        vertical:'middle',
                        horizontal:'center'
                    }
                }
                ,
                {
                    title:'Yes or No!', subtitle:'are you black?', body:'black lives matters!', 
                    buttons:[
                        {text:'yes',action:'previousSlide'},{text:'no',action:'nextSlide'}
                    ], 
                    image:'https://media.publit.io/file/islands/4.jpg' ,
                    position:{
                        vertical:'bottom',
                        horizontal:'center'
                    }
                }
                
            ]
        }
    },
    methods:{
        button_function:function(name){
            this.$refs['slideshow'][name]();
        },
        heightResize:function( instance ){
            return instance.getHeight() - this.slideshowParams.thumbs.height
        },
        addContent:function(){
            //this.images.push('https://media.publit.io/file/islands/'+(this.images.length+1)+'.jpg');
            this.contents.push({
                image:'https://media.publit.io/file/islands/'+(this.contents.length+1)+'.jpg'
            })
        },
        hideThumbs:function(){
            this.slideshowParams.thumbs.visible=false;
        },
        showThumbs:function(){
            this.slideshowParams.thumbs.visible=true;
        },
        thirdSlide:function(){
            this.$refs['slideshow'].slideTo(3);
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
