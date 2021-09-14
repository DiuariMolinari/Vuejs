<template>
  <div>
    <h1>Meu projeto vue</h1>
    <p :title="informacao">Autor: {{autor.toUpperCase()}} - {{criacao}} </p>
     
    <button @click="trocarInformacoes()">Mostrar/Esconder informações</button> 
    <div v-show="mostrarInformacoesComplementares">
        <h2>Informações adicionais</h2>

        <form @submit.prevent="salvarProjeto">
            <label for="nome">Nome:</label><br/>
            <input type="text" id="nome" autofocus required v-model="projeto.nome"/> <br/>
            <label for="tamanho">Tamanho:</label><br/>
            <input type="number" id="tamanho" required min="0" max="100" v-model="projeto.tamanho"/> <br/>
            
            <input type="submit" :value="acao" />

        </form>  


        <table>
          <tr>
            <th>Nome</th>
            <th>Tamanho</th>
            <th></th>
          </tr>
          <tr v-for="(p, idx) in projetos" :key="p.nome" :class="{'alteracao': alteracaoIdx == idx}">
            <td> {{p.nome}} </td>
            <td> {{p.tamanho}} </td>
            <td> 
              <button @click="alterar(idx)">Alterar</button>
              <button @click="remover(p)">Remover</button> 
            </td>
          </tr>
          <tr>
            <td colspan="3">Tamanho total: {{tamanhoTotal}} </td>
          </tr>
        </table>

    </div> 
  </div>
</template>

<script>
export default {
  data() {
    return {   //JSON - Javascript Object Notation
      autor: 'Fabiano Oss',
      criacao: 'criando em ' + new Date().toLocaleString(),
      informacao: 'Posso colocar uma informação customizada',
      mostrarInformacoesComplementares: false,
      projetos: [
        {nome: "HTML", tamanho: 100 },
        {nome: "CSS", tamanho: 80},
        {nome: "JavaScript", tamanho: 200}
      ],
      projeto: {
        nome: null,
        tamanho: 0
      },
      alteracaoIdx: -1
    }
  },
  methods: {
    trocarInformacoes() {
      this.mostrarInformacoesComplementares = !this.mostrarInformacoesComplementares
    },
    salvarProjeto() {
/*      this.projetos.push(
        {
          nome: this.projeto.nome,
          tamanho: this.projeto.tamanho  
        }
      )      */
      const projetoSalvar = Object.assign({}, this.projeto)
      if (this.alteracaoIdx > -1) {
        this.projetos[this.alteracaoIdx] = projetoSalvar
      }
      else {
        this.projetos.push(projetoSalvar)
      }

      this.reset()
    },
    reset() {
      this.projeto.nome = null
      this.projeto.tamanho = 0
      this.alteracaoIdx = -1
    },
    remover(projetoParaRemover) {
      if (confirm("Excluir registro?") ) {
        // this.projetos.splice(this.projetos.indexOf(projetoParaRemover), 1)
        this.projetos = this.projetos.filter(p => p != projetoParaRemover )
        this.reset()
      }
    },
    alterar(idx) {
      this.projeto = Object.assign({}, this.projetos[idx]) 
      this.alteracaoIdx = idx
    }
  },
  computed: {
    acao() {
      return this.alteracaoIdx > -1 ? "Alterar" : "Adicionar"
    },
    tamanhoTotal() {
      return this.projetos.map(p => p.tamanho )
                  .reduce( (a,b) => a + b , 0 )
    }
  },
  watch: {
    alteracaoIdx: function(val) {
      console.log(val)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.alteracao {
  background-color: yellow;
}

</style>
