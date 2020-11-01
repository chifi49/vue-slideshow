# vue-slideshow
A content/image slideshow with touch support and fade/slide effect made with vuejs

## Installation
npm install --save @chifi49/vue-slideshow

## Usage
```
<template>
 <vueslideshow :params="slideshowParams">
   <div class="content">
     <img src="./images/1.jpg" />
   </div>
   <div class="content">
     <img src="./images/2.jpg" />
   </div>
   <div class="content">
     <img src="./images/3.jpg" />
   </div>
 </vueslideshow>
</template>
<script>
import vueslideshow from '@chifi49/vue-slideshow
export default{
    components:{
        vueslideshow
    },
    data:function(){
        return {
           slideshowParams:{
              animation:'fade',//fade or slide,
              autoplay:true, //true or false
              nav:{
                  visible:true
              },
              pager:{
                  visible:true,
                  mode:'bullets',//defaults to bullets (bullets or counter)
              },
              thumbs:{
                  visible:true,
                  width:100,
                  height:70
              }
           }
        }
    }
}
</script>

```