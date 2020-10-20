<template>
<div>
  <div class="course_main is-clearfix">
      <div class="course_left master">
        <div class="course_title is-clearfix">
          <h1 class="is-pulled-left">{{get_courses.name}}</h1>
          <div class="button_parent">
               <button v-if="this.$store.state.isUserLoggedIn" :class="{'is-link': this.favicon_active }" class="button is-pulled-right" @click="setFavorite()">
         <span class="icon">
              <i class="far fa-heart"></i>
          </span>
   </button> 

          </div>
        </div>
        <div class="course_content">
          <div class="course_movie">
            <div class="course_movie_inner">
              <figure class="image is-16by9">
                <iframe class="has-ratio" width="640" height="360" :src="'https://www.youtube.com/embed/'+get_courses_item.youtube_id+'?showinfo=0'" frameborder="0" allowfullscreen></iframe>
              </figure>
            </div>
          </div>
          <div class="course_info">
            <div class="tabs is-fullwidth">
              <ul>
                <li @click="setTab(0)" :class="{'is-active':tabActive == 0}">
                  <a>
                    <span class="icon"><i class="far fa-file-alt" aria-hidden="true"></i></span>
                    <span>課程介紹</span>
                  </a>
                </li>
                <li @click="setTab(1)" :class="{'is-active':tabActive == 1}">
                  <a>
                    <span class="icon"><i class="fas fa-bolt" aria-hidden="true"></i></span>
                    <span>即時資訊</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="info_content">
              <div class="content">
                {{get_courses.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="course_right secondary">
        <div class="course_top is-clearfix">
          <div class="course_top_left">章節</div>
          <span class="course_top_station">名稱</span>
        </div>
        <div class="course_item_parent" style="color:#4a4a4a;">
          <div @click="clickItem(index+1)" v-for="(item,index) in coursesItem" :key="index+1" :class="{'active':index+1 == itemActive}" class="course_item">
            <div class="course_item_station">
              <span class="course_item_number">{{index+1}}</span>
            </div>
            <div class="course_item_name">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import API from "~/api.js"; 
//search fn
 let coursesSearch = (courses,id) => {
  let courses_data = {};
  courses.forEach(i => {
    if(i.id === id) courses_data = i;
  })
  return courses_data
}

export default {
  name: 'course-id',
  validate(context){
    const id = context.route.params.id;
    if(!id) context.redirect('/');
    return true;
  },
 async fetch(context){
    //代表重新整理，courses 沒有資料
    const id = context.route.params.id;
    if(!context.store.state.courses.length){
      await context.store.dispatch("setCoursesList")
    }
    //沒有比對到課程資料，則導回首頁
    let courses = coursesSearch(context.store.state.courses,id);
    if(!courses.id) context.redirect('/');
  },

 async asyncData(context){
    const id = context.route.params.id;
    //代表userFavorite 還沒初始化
    if(context.store.state.userFavorite === null){
       await context.store.dispatch("getUserFavorite");
    }

    return context.$axios({
      method: API.getCoursesItem.method,
      url: API.getCoursesItem.url.replace(":id.json",id + ".json")
    }).then((response)=> {
      //console.log(response.data)
      return {
        id,
        coursesItem : response.data.item
      }
    }).catch(error => {
      console.log(error)
    });
  },
  data () {
    return {
      id: "",//上方的參數 id
      coursesItem : [],

      tabActive:0,
      itemActive: 1,
    };
  },
  created(){
  },
  mounted(){
    this.itemActive = this.$route.query.item || 1;
  },
   watch: {
	$route (to, from){
	//console.log(to.query)
	this.itemActive = to.query.item || 1;
}
},
  computed: {
        get_courses(){
      return coursesSearch(this.$store.state.courses,this.id);
    },
       favicon_active(){
      return this.$store.state.userFavorite && this.$store.state.userFavorite[this.id];
    },
      get_courses_item(){
      let item_data = {};
      this.coursesItem.forEach((i,index) => {
        if(this.itemActive == index + 1){
          item_data = i
        }
      })
      return item_data
    }



  },
  methods: {
      setFavorite(){
      if(this.$store.state.userFavorite === null) return
      //先更新 vuex   
      this.$store.commit("set_userFavorite",{
        ...this.$store.state.userFavorite,
        [this.id] : !this.$store.state.userFavorite[this.id]
      });
      //更新Favorite
      this.$store.dispatch("updateUserFavorite")
    },

    clickItem(item){
      if(item == this.itemActive) return;
      this.itemActive = item;
      this.$router.push({
        query: {
          item: item
        }
      });
    },
    setTab(index){
      this.tabActive = index;
    }
  },
  components: {
  }
};
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/course.scss";
</style>


