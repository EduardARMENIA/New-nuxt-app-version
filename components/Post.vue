 <template>
   <section class="main">
    <div class="wrapper">
        <div class="left-col">
            <div class="post">
                <div class="info">
                 <div class="user">
                         <img  :src="`${profile_img}`" class="post-image" alt="" id="user" @click.prevent="openUser(author_id)">
                         <p class="username" @click.prevent="openUser(author_id)"><span> </span>{{ author }} </p>
                    </div> 
                 
                   

                </div>
                <img  :src="`${img}`" class="post-image" alt="">
               
               
                <div class="post-content">
                    <div class="reaction-wrapper">
                        <img src="https://www.pngfind.com/pngs/m/52-526485_heart-icon-instagram-like-icon-png-transparent-png.png" class="icon" alt=""  @click="addLike(id)">
                        <img src="https://cdn-icons-png.flaticon.com/128/5338/5338282.png" class="icon" alt="">
                    </div>
      

                    <p class="likes">{{ likes[0] }} likes</p>
                                  <p class="description"><span>title </span>{{ title }} </p>
                    <p class="description"><span>desription </span>{{ description }} </p>
                
                    <div v-for="(comments, x) in comments" :key="x" style="display:flex;margin-left:-20px;margin-top:10px;">
                       <p class="description" @click.prevent="openUser(comments.author_id)">
                             <div class="user">
                              <img  :src="`${comments.author_img}`" class="post-image" alt="" id="user" @click.prevent="openUser(author_id)">
                            </div> 
                            <div style="display:flex;flex-direction:column;margin-left:10px;">
                            <span style="color:black;font-weight:bold;">{{ comments.author }} </span>
                            <span> {{ comments.content }}</span>
                            </div>
                       </p> 
                    </div>

                </div>
                <div class="comment-wrapper">
                    <input type="text" class="comment-box"  v-model="content"  placeholder="Add a comment">
                    <button  @click="$emit('success', id, content)" class="comment-btn">post</button>
                </div>
            </div>
        </div>
    </div>
    </section>
 </template>

 <script>
export default {
  props: {
      img: { required: true },
      id:  { required: true },
      ['likes']:  { type: Array, required: true },
      author: { type: String, required: true },
      profile_img: { required: true },
      author_id: { type: Array, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      ['comments']: { type: Array, required: true },
  },
  data() {
          return {
            content: '',
            inputs: '',
          };
  },

   

  methods: {
    openUser (user) {
      this.$router.push('/User/' + user)
    },
    addLike (id) {
      console.log(this.profile_img)
      console.log(this.img)
      this.$store.dispatch('post/post/addLike', {id})
    }
  }  
 }
</script>
<style scoped>
.post{
    width: 67%;
    height: auto;
    background: #fff;
    border: 1px solid #dfdfdf;
    margin-top: 40px;
    margin-left:5%;
}

.info{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.info .username{
    width: auto;
    font-weight: bold;
    color: #000;
    font-size: 14px;
    margin-left: 10px;
}

.info .options{
    height: 10px;
    cursor: pointer;
}

.info .user{
    display: flex;
    align-items: center;
}

.info .profile-pic{
    height: 5px;
    width: 1px;

}

.info .profile-pic img{
    border: none;
}

.post-image{
    width: 100%;
    object-fit: cover;
    background-size:cover;
}
#user{
    width:40px;
    height:40px;
    margin-left:10px;
    border-radius:50% 50%;
    cursor:pointer;
}
.username{
    margin-top:10px;
    cursor:pointer;
}
.post-content{
    width: 100%;
    padding: 20px;
}

.likes{
    font-weight: bold;
}

.description{
    margin: 10px 0;
    font-size: 14px;
    line-height: 20px;
}

.description span{
    font-weight: bold;
    margin-right: 10px;
}

.post-time{
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
}

.comment-wrapper{
    width: 100%;
    height: 50px;
    border-radius: 1px solid #dfdfdf;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.comment-wrapper .icon{
    height: 30px;
}

.comment-box{
    width: 80%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    padding-left:20px;
}

.comment-btn,
.action-btn{
    width: 70px;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    text-transform: capitalize;
    font-size: 16px;
    color: rgb(0, 162, 255);
    opacity: 0.5;
}

.reaction-wrapper{
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: -20px;
    align-items: center;
}

.reaction-wrapper .icon{
    height: 25px;
    margin: 0;
    margin-right: 20px;
}

.reaction-wrapper .icon.save{
    margin-left: auto;
}
@media (max-width:1200px){
    .post{
     width:100% !important;
     margin-left:0%;
     
    }
    .post-image{
      background-size:cover;
      object-fit:cover;
      height:auto;
    }
}
</style>


