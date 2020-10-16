<template>
  <div>
       Select file to upload:
    <input type="file" id="file" ref="file" @change="uploadFile" class="input-file">

  <!-- <form action="http://localhost:3034/api/form" method="post">
　姓名：<input type="text" name="UserName"><br>
　內容：<textarea name="Content"></textarea><br>
　<input type="submit" value="送出表單">
</form> -->

  </div>
</template>
<script>
export default {
  layout: 'mock',
  data () {
    return {
    }
  },
  created(){
  },
  mounted(){
  // this.$axios({
  //     method: 'post',
  //     baseURL: 'http://localhost:3034/api/form',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded' 
  //     },
  //     data: this.$qs.stringify({
  //       UserName: 'value1',
  //       Content: 'aaaa2'
  //     })
  //   }).then((response)=> {
  //       console.log(response.data);
  //   })
  //   return



    this.$axios({
      method: 'post',
      baseURL: 'http://localhost:3034/api/test',
      headers: {
        'X-Custom-Header': 'foobar',
        'Authorization': 'Basic 123456'
      },
      data:{
  "id": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}

    }).then((response)=>{
      console.log(response.data)
    })
    console.log("mounted");
  },
  computed: {
  },
  methods: {
    uploadFile(){
     let formData = new FormData(); //form重設
     formData.append("videoFile",this.$refs.file.files[0]);
     formData.append("title","title");
     formData.append("description","description");
      this.$axios({
        method: 'post',
        baseURL: 'http://localhost:3034/api/file',
        headers: {
          'Content-Type': 'multipart/form-data' 
        },
        data: formData
      }).then((response)=> {
          console.log(response.data);
      })
    }

  },
  components: {
  }
}
</script>
