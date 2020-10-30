<template>
    <div id="app">
        <vueslideshow>
            <div class="container">
                <div class="content" v-bind:key="image" v-for="image in images">
                    <img :src="image" />
                </div>
                
            </div>
        </vueslideshow>
        <br />
        <button @click="addContent">Add</button>
    </div>
</template>
<script>
import vueslideshow from './vue-slideshow'
export default{
    data(){
        return {
            images:[
                'https://media.publit.io/file/islands/1.jpg',
                'https://media.publit.io/file/islands/2.jpg',
                'https://media.publit.io/file/islands/3.jpg'
            ]
        }
    },
    methods:{
        addContent(){
            this.images.push('https://media.publit.io/file/islands/'+(this.images.length+1)+'.jpg');
        }
    },
    components:{vueslideshow}
}
</script>
