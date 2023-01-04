<template>
<nav class="navbar">
    <div class="nav-wrapper">
          <nuxt-link class="brand-img"  v-if="this.$store.state.token"  to="/home">
        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" class="brand-img">
        </nuxt-link>
        <div class="nav-items">
            <nuxt-link active-class="active"  v-if="this.$store.state.token"  to="/home">
                 <img   src="https://images.vexels.com/media/users/3/147094/isolated/preview/055a10de0c31e98eef1451f742c32345-instagram-home-icon.png" class="icon" alt="">
            </nuxt-link>
            <nuxt-link active-class="active"  v-if="this.$store.state.token"  to="/add">
                 <img  v-if="this.$store.state.token"  src="https://cdn.iconscout.com/icon/free/png-256/add-instagram-story-4941588-4108988.png" class="icon" alt="" to="/add" >
            </nuxt-link>
             <nuxt-link active-class="active"  v-if="this.$store.state.token"  to="/profile">
                 <img  v-if="this.$store.state.token" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFq_XICspIbMdmG2muTxEwmrZfmtUn0TDdT1rq3CP-MsHNyuBDCMhSnV9Phd8QnGNr9Uo&usqp=CAU" class="icon" alt="">
            </nuxt-link>
             <nuxt-link active-class="active"  v-if="this.$store.state.token"  to="/users">
                 <img  v-if="this.$store.state.token" src="https://cdn-icons-png.flaticon.com/512/2583/2583138.png" class="icon" alt="">
            </nuxt-link>
            <nuxt-link active-class="active"  v-if="this.$store.state.token"  to="/users">
                 <img  @click.prevent="logout" v-if="this.$store.state.token" src="https://cdn-icons-png.flaticon.com/512/126/126467.png" class="icon" alt="">
            </nuxt-link>
            <nuxt-link active-class="actives"  v-if="!this.$store.state.token"  to="/">
            Login
            </nuxt-link>
            <nuxt-link active-class="actives1"  v-if="!this.$store.state.token" id="act"  to="/register">
            Register
            </nuxt-link>
        </div>
    </div>
</nav>
</template>



<script>
import {useStore} from "vuex";
export default {
  middleware: ['auth'],
  computed: {
    hasToken() {
      return this.$store.getters.hasToken
    }
  },
  methods: {
    logout() {
       this.$cookiz.remove('jwt')
       this.$store.dispatch('logout'),
       this.$router.push('/')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

*:focus{
    outline: none;
}

body{
    width: 100%;
    background: #fafafa;
    position: relative;
    font-family: 'roboto', sans-serif;
}

.navbar{
    width: 100%;
    height: 80px;
    background: #fff;
    border-bottom: 1px solid #dfdfdf;
    display: flex;
    justify-content: center;
    padding: 5px 0;
}

.nav-wrapper{
    width: 70%;
    max-width: 1000px;
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nav-items{
    width:30%;
    height:80px !important;
    display:flex;
    margin:0px auto;
}
.nav-items a{
    display:flex;
    align-items:center;
}

.actives{
    margin-left:300px;
}
#act{
    margin-left:20px ;
}

.brand-img{
    height: 100%;
    margin-top: 5px;
}

.search-box{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 25px;
    background: #fafafa;
    border: 1px solid #dfdfdf;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    text-transform: capitalize;
}

.search-box::placeholder{
    color: rgba(0, 0, 0, 0.5);
}


.icon{
    height: 50%;
    cursor: pointer;
    margin: 0 20px;
    display: inline-block;
}

.user-profile{
    width: 22px;
    border-radius: 50%;
    background-size: cover;
}
@media (max-width:768px){
    .icon{
       height:30%;
    }
    .brand-img{
       height:70%;
    }
    .actives{
    margin-left:170px;
    }
}
@media (max-width:576px){
.navbar{
    width:100%;
}
.nav-wrapper{
    width:100%;
}
.nav-items{
    width:45%;
}
}
@media (max-width:476px){
.nav-items{
    width:80%;
}
.navbar{
    width:100%;
}
.brand-img{
    height:30px !important;
    margin-top:1px;
}
}
</style>
