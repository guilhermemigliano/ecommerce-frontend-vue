<template>
  <form class="login-box" @submit.prevent="login">
    <h2>Login</h2>
    <p class="login-box">
      <label class="login-box" for="username">Usuário:</label>
      <input class="login-box" type="text" id="username" required autofocus v-model="nome" />
    </p>
    <p class="login-box">
      <label class="login-box" for="inputPassword">Senha:</label>
      <input class="login-box" type="password" id="inputPassword" required v-model="senha" />
    </p>
    <label class="login-box-msg">{{msg}}</label>

    <button class="login-box" type="submit">Ok</button>
  </form>
</template>


<script>
import axios from 'axios';
import {mapMutations} from 'vuex';


export default{
  name: 'Login',
  data(){
    return { 
      nome: '',
      senha: '',
      msg: ''
    }
  },
  methods: {
    ...mapMutations([
      //'setUsuario',
      //'setSenha',
      'setUser',
      'setIsLogged'
    ]),
    login(){
      axios.post('login',
      {username: this.nome, password: this.senha})
      .then(res =>{

        //console.log(res.data.autorizacao);
        this.sucesso(res.data);
      })
      .catch(error => {
        console.log(error);
        if(error.response.status === 401 || error.response.status === 403){
          console.log("Usuário ou senha inválido");
          this.msg = 'Usuário ou senha inválido';
        }
        //else{
          //this.sucesso(res.data);
        //}
      });
    },
    sucesso(data){      
      this.setUser(data);
      //this.setUsuario(this.nome);
      //this.setSenha(this.senha);
      this.setIsLogged(true);

      if(data.autorizacao == "ROLE_ADMIN"){
        console.log(localStorage.getItem('user'))
        this.$router.push('/admin')
      }
        
      else{
        console.log(localStorage.getItem('user'))
        this.$router.push('/cliente')

      }
    }
  }
}

</script>



<style>

form.login-box{
    background-color: rgb(224, 224, 224);
    width: 250px;
    margin: auto;
    padding: 20px;
    border-radius: 10px;
}

label.login-box{
    margin-left: 0;
    float: left;
}
input.login-box{
    margin-left: 10px;
    height: 25px;
    float: right;
    padding-left: 5px;
}

p.login-box{
    margin-top: 10px;
    float: left;
    line-height: 25px;
    width: 100%;
}

button.login-box{
    width: 150px;
    height: 35px;
    border-radius: 5px;
    margin-top: 10px;
}

label.login-box-msg{
  width: 100%;
  float: left;
  line-height: 30px;
  color: red;
  font-size: 14px;
}

</style>