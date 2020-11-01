# vue-slideshow
A content/image slideshow with touch support and fade/slide effect made with vuejs

## Installation
`npm install --save @chifi49/vue-slideshow`

or

`<script src="vue-slideshow.umd.min.js"></script>`

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
import vueslideshow from '@chifi49/vue-slideshow'

export default{
    components:{
        vueslideshow
    },
    data:function(){
        return {
           slideshowParams:{
              animation:'fade',//fade or slide,
              autoplay:true, //true or false
              minHeight: 400, //default to 100% of window viewport height
              maxHeight: 600, //default to 100% of window viewport height
              nav:{
                  visible:true,
                  borderColor:'#fff',
                  arrowColor:'#fff',
                  backgroundColor:'transparent'
              },
              pager:{
                  visible:true,
                  mode:'bullets',//defaults to bullets (bullets or counter)
                  borderColor:'#fff',//defaults to #fff
                  backgroundColor:'#000',//defaults to transparent
                  borderColor:'#fff', //defaults to #fff
                  size: 12 //defaults to 12 only for 'bullets' mode
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

### Events
```
<vueslideshow 
    @inited
    @animated 
    @beforeAnimate 
    @animated
    @nextSlide 
    @previousSlide
    @enterFullScreen
    @exitFullScreen
    @pageSelected
    @thumbSelected
    >
    ...
</vueslideshow>
```

### Methods
```
<vueslideshow ref="slider">
......
</vueslideshow>

var slider = this.$refs['slider'];

```

#### nextSlide
`slider.nextSlide()`
#### previousSlide
`slider.previousSlide()`
#### firstSlide
`slider.firstSlide()`
#### lastSlide
`slider.lastSlide()`
#### moveTo
`slider.moveTo(3)` move to 3rd slide
#### showThumbs
`slider.showThumbs()`
#### hideThumbs
`slider.hideThumbs()`
#### fullScreen
`slider.fullScreen()`

