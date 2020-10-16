<template>
  <div>
      <datepicker></datepicker>
    {{infoTest}}
    <Demo message="demo111">
      <div> 我是從父組件傳來的</div>
      </Demo>
     <Demo @yoyo ="yoyo_fn"/>

    <Logo />
    <img src="@/assets/img/demo.png" alt="">
    <img src="@/assets/img/demo.svg" alt="">
    <h1>
      {{title}}
    </h1>
    <h2 @click="demoFn">
      {{h2}}
    </h2>
    <h2>
      {{demoH2}}
    </h2>

    <nuxt-link to="/demo/tpl">到 demo/tpl 頁</nuxt-link> 
    <nuxt-link to="/">回首頁</nuxt-link>

  </div>
</template>

<script>

import Vue from "vue"

import Logo from '~/components/Logo.vue'
import {sleep,deepCopy} from "~/assets/js/tool.js"
import * as tool from "~/assets/js/tool.js"
import test from "~/assets/js/test.js"  

import Demo from "~/components/Demo.vue"
export default {
  layout: 'demo',
  data () {
    return {
      title: "demo",
      h2: "這是 h2",
      infoTest:0
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ],
    script:
      [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js" }
      ]
    }
},
  
  created(){

    // test.test1("wayne")
    console.log("我是mounted.vue");
    // console.log(tool.sleep,"ddddd")
    // console.log('sleep')
    // console.log(this.$gsap)
  },

  mounted(){
    //   console.log("mounted")
    // this.$gsap.to("img", {rotation: 27, x: 100, duration: 1});
    // this.$axios.get("http://localhost:3013/demo/tpl").then((response)=>{
    //     console.log(response.data)
    // })

},
  computed: {
    demoH2(){
      return this.h2 + "(computed)"
    }
  },
  methods: {
    demoFn(){
      console.log("demoFn")
    },
    yoyo_fn(info){
      this.infoTest = this.infoTest + info
      console.log(info)
    }
  },
  components: {
    Logo,
    Demo,

  }
}
</script>
<style lang="scss" >
/*scoped*/
@import '~/assets/scss/demo.scss';



</style>
