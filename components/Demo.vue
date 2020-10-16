<template>
  <div>
    {{message}}
    <h1>testssss</h1>
    <Logo  />
    <slot> 我是預設資訊</slot>
    <div @click="emit_test">tesssssst</div>
    
  </div>
</template>
<script>
import Logo from '~/components/Logo.vue'
export default {
  props:['message'],
  methods:{
    emit_test(){
      this.$emit('yoyo',11)
    },
  },
  components:{
    Logo
  }
}
</script>


<style scss="scss" scoped>

</style>