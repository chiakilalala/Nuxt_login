<template>
  <div>
    <Header     @loginClick="loginClick" 
      @registeredClick="registeredClick"    title="123@@@"></Header>
    <nuxt />
    <LoginModal
      v-if="openModal" 
      @loginModalSubmit="loginModalSubmit" 
      :modalTyple="modalTyple" 
      :openModal.sync="openModal" 

    ></LoginModal>

    <!-- <Footer></Footer> -->
  </div>
</template>
<script>


import Header from '~/components/Header/Header.vue'
import LoginModal from '~/components/Modal/LoginModal.vue'
  
export default {
  created(){
    
  },
  data () {
    return {
      openModal: false,
      modalTyple: ""

    }
  },
  mounted(){
     if(this.$route.query.id_token && this.$route.query.refresh_token){
  // console.log('this.$route.query.id_token',this.$route.query.id_token)
      window.history.replaceState(null, null, window.location.pathname);
      return
    }
          
  },

  methods:{ 
    loginClick(){
      this.openModal = !this.openModal;
      this.modalTyple = "login"
    },
    registeredClick(){
      this.openModal = !this.openModal;
      this.modalTyple = "registered"
    },
    loginModalSubmit(data){
    if(data.modalTyple == "login"){
      this.$axios({
        method: 'post',
        baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.firebaseApiKey,
        headers: {
          'Content-Type': 'application/json' 
        },
        data: {
          ...data,
          returnSecureToken: true
        }
      }).then((response)=> {
        console.log(response.data);
        this.openModal =false
      }).catch(error => {
          console.log(error)
      });
    }
    if(data.modalTyple == "registered"){
      this.$axios({
        method: 'post',
        baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.firebaseApiKey,
        headers: {
          'Content-Type': 'application/json' 
        },
        data: {
          ...data,
          returnSecureToken: true
        }
      }).then((response)=> {
        console.log(response.data);
        this.openModal =false
      }).catch(error => {
          console.log(error)
      });
    }
}


  },
  components: {
    Header,
    LoginModal
  }
}
  
</script>
<style>

</style>


