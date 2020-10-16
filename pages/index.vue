<template>

    <div>
    <CourseList :courses = this.get_courses></CourseList>
    </div>

</template>

<script>

import  CourseList from '~/components/CourseList/CourseList.vue'
export default {
  //  async fetch(context){
  //   await context.store.dispatch("get_courses")
  // },

  fetch(context){
    return context.$axios("api/courses").then((data)=>{
      context.store.commit("set_courses",{
        ...data.data
      })
    })
  },

//  async asyncData (context) { //打ajax (async await)
//     let data = await context.$axios("/api/test");
//     console.log(data.data,'data.data');
//     return data.data
//   },
  data(){
    return{
      title:'',
      message:'',
      
    }
  },
  methods: {

  },
  created() {
    // console.log(process)
    // console.log(1);//只會在前端觸發到 then(只在前端發生)
    if(process.client){
      this.$axios("api/courses").then((data)=>{ 
        this.$store.commit("set_courses",{
          ...data.data
        })
})

      console.log('process.client')
    }
    if(process.server){
      console.log('process.server')
    }
  },
    computed:{
    get_courses(){
      return this.$store.state.courses
    },
  },

  components:{
 
  CourseList,

  
  }

}
</script>

<style>


</style>
