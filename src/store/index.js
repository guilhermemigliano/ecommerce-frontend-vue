import { createStore } from 'vuex'

import VuexPersist from 'vuex-persist'



const vuexPersist = new VuexPersist({ key: 'my-app',
storage: localStorage
})

export default createStore({
  plugins: [
    vuexPersist.plugin
  ],
  state: {
    usuario: '',
    senha: '',
    isLogged: false
  },
  getters: {
    isLogged (state) {
      return state.isLogged
    }
  },
  mutations: {
    setUsuario(state, valor){
      state.usuario = valor;
    },
    setSenha(state, valor){
      state.senha = valor;
    },
    setUser(state, data){
      localStorage.setItem('user', JSON.stringify(data))
    },
    setIsLogged(state, valor){
      state.isLogged = valor;
    }
    
  },
  actions: {
    
  },
  modules: {
  }
})
