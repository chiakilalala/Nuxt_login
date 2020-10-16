<template>
  <div class="container">
    <div>
     <h2>{{get_aaa}}</h2>
    {{this.$store.state.test_data}}
    
      <h1 class="title">{{
        this.$store.state.login.test_data
        }}
       This index
      </h1>
      <LoginModal @loginModalSubmit="loginModalSubmit" :openModal=true modalTyple='registered'></LoginModal>
  
    </div>


  </div>
</template>

<script>
import  LoginModal from '~/components/modal/LoginModal.vue'
import {mapMutations} from 'vuex';

export default {
 async asyncData (context) { //打ajax (async await)

  },
  data(){
    return{
      title:'',
      message:''
    }
  },
  methods: {
    // loginModalSubmit(data){
    //   console.log(data,'data');
    // }
  },
  computed: {
    get_aaa(){
      return  this.$store.getters.get_aaa
    }
  },
  created() {
    if(process.client){
      this.$store.dispatch('ajaxTest');
      // this.$store.dispatch(_M.REMOVE_DATA)
      // this.add_test_data({
      //   title:'test'
      // })
        // this.$store.commit('add_test_data',{
        //   title:'test'
        // })¥
        // this.$store.commit('login/add_test_data',{
        //   title:'test'
        // });
    
    }

    // console.log(this.$store.state.login.test_data);
    // console.log(this.$store.getters['login/get_aaa']);
    console.log(this.$store.state[_M.SET_CONFIG_URL]);
  },
  methods:{
    ...mapMutations(['add_test_data'])
    
    
  },
  components:{
  LoginModal
  }

}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
