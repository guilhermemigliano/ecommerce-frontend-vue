<template>
  <div class="cliente-box">
    <router-link to="/admin">Perfil</router-link>
    |
    <router-link to="/pedidosAdm">Pedidos</router-link>
    |
    <router-link to="/clientesAdm">Clientes</router-link>

    <div id="buscarPedido">
        <label>Buscar pedido por id: </label>
        <input type="text" value="" @input="pedidoId">
        <button @click="buscarPedidoId">Buscar</button>

        <table id="pedidoCliente" style="width: 100%" v-if="isPedidoId">
            <tr>
                <th>Nome pedido</th>
                <th>valor</th>
                <th>Cliente</th>
                <th>Excluir</th>
            </tr>
            <tr>
                <td>{{ this.pedidoCliente.nome }}</td>
                <td>{{ this.pedidoCliente.valor }}</td>
                <td>{{ this.pedidoCliente.cliente.email }}</td>
                <td><button @click="excluirPedido(pedidoCliente.id)">Excluir</button></td>                
            </tr>      
            </table>
    </div>

    
    
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "BuscarPedido",

  data() {
    return {
      pedId: "",
      pedidoCliente: {nome: "", valor: "", id: "", cliente: {email: ""}},
      isPedidoId: false
    };
  },
  methods: {
      pedidoId(event){
          this.pedId = event.target.value;
          //console.log(this.pedId);
      },
    async buscarPedidoId() {
      //console.log(JSON.parse(localStorage.getItem("user")).token);

      if(this.pedId != ""){
          await axios
        .get(
          "pedido/id/" + this.pedId,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.isPedidoId = true
          this.pedidoCliente = res.data;
        })
        .catch((error) => {
            if(error.response.status === 404){
                this.isPedidoId = false
                alert("Pedido não encontrado");
            }
        
          console.log(error);
        });
      }else{
          alert("Você deve colocar um id");
          this.isPedidoId = false
      }
      
    },
    async excluirPedido(id){
        await axios
        .delete(
          "pedido/id/" + id,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.isPedidoId = false
          alert("Pedido excluido com sucesso!")
        })
        .catch((error) => {
            if(error.response.status === 404){
                alert("Pedido não encontrado");
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

#buscarPedido{
    margin-top: 20px;
}

#buscarPedido input{
    height: 35px;
    padding-left: 10px;
}

#buscarPedido button{
    height: 35px;
}
</style>