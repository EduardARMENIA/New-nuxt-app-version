 <template>
    <div class="card">
    <h4 style="margin-left:10px;margin-top:10px;">User Settings</h4>
  <img  :src="`${img}`"style="width:100%">
  <div class="container">
    <h4><b>{{ name }}</b></h4>
    <p>{{ email }}</p>
          <button class="getFile" style="display:block;width:120px; height:30px;" onclick="document.getElementById('getFile').click()">Change Avatar</button>
         <input type="file" id="getFile" accept="image/*" @change="onChange" class='hiddenFileInput' style="display:none" placeholer="Change Picture"/>
        <input id="text" type="password"  v-model="content" placeholder="Change Password" name="content" style="margin-top:20px;"/>
        <button @click="$emit('password', content)" id = 'send' style="margin-top:20px;margin-bottom:20px;">Change Password</button>
  </div>
</div>
</template>        



<script>
export default {
  props: {
      img: { required: false },
      id: { required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
  },
  data() {
          return {
            content: '',
            item:{
             image : null,
             imageUrl: null
            },
          };
  },        
   methods:{
             async onChange(e) {
                const file = e.target.files[0]
                this.item.imageUrl = URL.createObjectURL(file)
                let images = new FormData();
                images.append('image', file); 
                const cookieValue = this.$cookiz.get('jwt')     
                await this.$axios.$post(`/api/profile_image`, images,  {
                     headers: {Authorization:  `${cookieValue}`}
                })
                window.location.reload()
             } 
  
  }
 } 
</script>
<style scoped>
.card {
  margin-top: 50px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 40%;
  margin-left:5%;
}
/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 5px 5px 0 0;
}
#send{
  box-shadow:0px 0px 2px 2px grey;
  border:none !important;
  outline:none;
  border-radius:10px;
  background-color:white;
}
.getFile{
  border:none;
  width:180px !important;
  font-size:23px;
  margin-left:-15px  !important;
  background-color:white;
}
.container{
  display:flex;
  flex-direction:column;
}
#text{
  outline:none;
  padding-left:10px;
}
@media (max-width:700px){
  .card{
  width:100%;
  margin-left:0%;
  }
}


.hiddenFileInput{
  display: inline-block;
  border:none !important;
}
</style>