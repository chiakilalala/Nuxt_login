<template>
  <div>
    <CourseList :courses="this.get_courses"></CourseList>
  </div>
</template>

<script>
import CourseList from "~/components/CourseList/CourseList.vue";
import API from "~/api.js";
export default {
  //  async fetch(context){
  //   await context.store.dispatch("get_courses")
  // },

  fetch(context) {
    return context
      .$axios({
        method: API.getCoursesList.method,
        url: API.getCoursesList.url,
      })
      .then((response) => {
        let courses_array = [];
        //組成 state.courses 的格式
        for (let key in response.data) {
          courses_array.push({
            id: key,
            ...response.data[key],
          });
        }
        //這邊做排序
        courses_array = courses_array.sort((a, b) => {
          return a.order > b.order ? 1 : -1;
        });
        context.store.commit("set_courses", {
          courses: courses_array,
        });
      })
      .catch((error) => {
        console.log(error.response, "error");
        console.log("TO DO error");
      });
  },

  async asyncData(context) {
    //打ajax (async await)
    return context
      .$axios({
        method: "post",
        url: API.member.exchangeToken.url,
        baseURL: "http://localhost:3034",
        headers: {
          "Content-Type": "application/json",
        },
        data: {},
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      title: "",
      message: "",
    };
  },
  methods: {},
  created() {
    console.log(process.env.NODE_ENV,"index.vue")

    // console.log(process)
    // console.log(1);//只會在前端觸發到 then(只在前端發生)
    if (process.client) {
      //  console.log(process.env.NODE_ENV,process.env.firebaseApiKey)
      this.$axios({
        method: "post",
        url: API.member.exchangeToken.url,

        headers: {
          "Content-Type": "application/json",
        },
        data: {},
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log("process.client");
    }
    if (process.server) {
      console.log("process.server");
    }
  },
  computed: {
    get_courses() {
      return this.$store.state.courses;
    },
  },

  components: {
    CourseList,
  },
};
</script>

<style>
</style>
