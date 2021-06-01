<template>
  <div id="app">
    <div id="nav">
      <div id="logo">
        <p>ECOMMERCE</p>
        <div v-if="isLogged" id="usuario">
          <button @click='logout'>Logout</button>
        </div>
      </div>      
     <!-- <router-link to="/">Login</router-link> | -->
    </div>
    <div id="box">
      <router-view />
    </div>
  </div>
</template>


<script>

import { mapGetters } from 'vuex'
import {mapMutations} from 'vuex';

export default {
  name: "app",
  computed: {
    ...mapGetters([
      'isLogged' ])
  },
  data() {
    return {
      
    };
  },
  methods: {
    ...mapMutations([      
      'setIsLogged'
    ]),
    logout(){      
      this.setIsLogged(false);
      localStorage.removeItem('user');
      this.$router.push('/')
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
#nav {
  padding: 0px;
  width: 100%;
  height: 50px;
  background-color: #1a5896;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

#logo {
  float: left;
  width: 100%;
}

#logo p {
  color: #fff;
  line-height: 50px;
  font-weight: 700;
  padding-left: 40px;
  float: left;
  width: 150px;
}

#usuario{
  float: right;
  height: 50px;
  width: 300px;

}

#usuario p{
  line-height: 50px;
  float: left;
  width: 150px;
  font-size: 14px;
}

#usuario button{
  height: 30px;
  width: 100px;
  margin-top: 10px;
}

#box{
  margin-top: 100px;
}



</style>