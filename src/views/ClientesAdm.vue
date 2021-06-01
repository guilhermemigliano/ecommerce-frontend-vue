<template>
  <div class="cliente-box">
    <router-link to="/admin">Perfil</router-link>
    |
    <router-link to="/pedidosAdm">Pedidos</router-link>
    |
    <router-link to="/clientesAdm">Clientes</router-link>

    <div id="buscarCliente">
        <label>Buscar cliente por id: </label>
        <input type="text" value="" @input="clienteId">
        <button @click="buscarClienteId">Buscar</button>

        <table id="clienteInfo" style="width: 100%" v-if="isClienteId">
            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Autorização</th>
                <th>Excluir</th>
            </tr>
            <tr>
                <td>{{ this.clienteInfo.nome }}</td>
                <td>{{ this.clienteInfo.email }}</td>
                <td>{{ this.clienteInfo.autorizacoes[0].nome }}</td>
                <td><button @click="excluirCliente(clienteInfo.id)">Excluir</button></td>                
            </tr>      
            </table>
    </div>

    
    
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "BuscarCliente",

  data() {
    return {
      cliId: "",
      clienteInfo: {nome: "", email: "", id: "", autorizacoes: [{nome: ''}]},
      isClienteId: false
    };
  },
  methods: {
      clienteId(event){
          this.cliId = event.target.value;
          //console.log(this.cliId);
      },
    async buscarClienteId() {
      //console.log(JSON.parse(localStorage.getItem("user")).token);

      if(this.cliId != ""){
          await axios
        .get(
          "cliente/id/" + this.cliId,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.isClienteId = true
          this.clienteInfo = res.data;
        })
        .catch((error) => {
            if(error.response.status === 404){
                this.isClienteId = false
                alert("Cliente não encontrado");
            }
        
          console.log(error);
        });
      }else{
          alert("Você deve colocar um id");
          this.isClienteId = false
      }
      
    },
    async excluirCliente(id){
        await axios
        .delete(
          "cliente/id/" + id,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.isClienteId = false
          alert("Cliente excluido com sucesso!")
        })
        .catch((error) => {
            if(error.response.status === 404){
                alert("Cliente não encontrado");
            }
            if(error.response.status === 401){
                alert("Não foi possível excluir o usuário");
            }

        
          console.log(error);
        });

    }
  },
  beforeMount() {
    //this.dadosCliente();
  },
};
</script>


<style>

#buscarCliente{
    margin-top: 20px;
}

#buscarCliente input{
    height: 35px;
    padding-left: 10px;
}

#buscarCliente button{
    height: 35px;
}
</style>