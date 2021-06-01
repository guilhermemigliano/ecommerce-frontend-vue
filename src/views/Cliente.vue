<template>
  <div class="cliente-box">
    <router-link to="/cliente">Perfil</router-link>
    |
    <router-link to="/clientePedidos">Pedidos</router-link>

    <table id="clientePerfil" style="width: 100%">
      <tr>
        <th>Nome</th>
        <th>Email</th>
      </tr>
      <tr>
        <td>{{ this.nome }}</td>
        <td>{{ this.email }}</td>
      </tr>      
    </table>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "cliente",

  data() {
    return {
      nome: "",
      email: "",
    };
  },
  methods: {
    async dadosCliente() {
      console.log(JSON.parse(localStorage.getItem("user")).token);
      await axios
        .get(
          "cliente/nome?nome=" +
            JSON.parse(localStorage.getItem("user")).username,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.nome = res.data.nome;
          this.email = res.data.email;
          //console.log(this.nome)
          //console.log(res.data.autorizacao);
          //this.sucesso(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeMount() {
    this.dadosCliente();
  },
};
</script>


<style>
div.cliente-box {
  width: 500px;
  height: 300px;
  background-color: rgb(210, 229, 235);
  margin: auto;
  border-radius: 50px;
}

#clientePerfil{
    width: 100%;
    margin-top: 20px;
}

#clientePerfil th{
    background-color: rgb(154, 195, 216);
    width: 50%;
}
</style>