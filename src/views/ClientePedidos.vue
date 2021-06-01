<template>
  <div class="cliente-box">
    <router-link to="/cliente">Perfil</router-link>
    |
    <router-link to="/clientePedidos">Pedidos</router-link>

    <table id="clientePedido" style="width: 100%">
      <tr>
        <th>Pedido</th>
        <th>Valor</th>
      </tr>
      <tr v-for="pedido in pedidos" :key="pedido.nome">
        <td>{{ pedido.nome }}</td>
        <td>{{ pedido.valor }}</td>
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
      pedidos: []
    };
  },
  methods: {
    async pedidosCliente() {
        
        console.log(JSON.parse(localStorage.getItem("user")).token);
      await axios
        .get("cliente/nome?nome=" + JSON.parse(localStorage.getItem("user")).username , {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then((res) => {

            this.pedidos = res.data.pedidos;
            if(res.data.pedidos.length > 0){
                console.log("tem pedido");
            }else{
                console.log("não tem pedido");
            }
        })
        .catch((error) => {
          console.log(error);          
        });
    },
  },
  beforeMount(){
    this.pedidosCliente()
 },
};
</script>


<style>
#clientePedido{
    width: 100%;
    margin-top: 20px;
}

#clientePedido th{
    background-color: rgb(154, 195, 216);
    width: 50%;
}
</style>