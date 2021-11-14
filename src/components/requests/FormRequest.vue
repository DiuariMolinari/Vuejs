<template>
    <div class="container">
        <h2>Cadastro de Pedidos</h2>
        <form @submit.prevent="adicionarPedido" >
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="requestNumber">Número pedido</label>
                    <div style="display: inline-flex;">
                        <input type="number" min="1" class="form-control" name="requestNumber" id="requestNumber" v-model="request.number" required>
                        <input class="btn btn-primary" type="button" @click="loadRequest()" value="Carregar pedido">
                    </div>
                </div>
                <div class="form-group col-md-4">
                    <label for="emitDate">Data de emissão</label>
                    <input type="date" class="form-control" name="emitDate" id="emitDate" v-model="request.emitDate" required >
                </div>
            </div>
            <div class="form-row">
                 <div class="form-group col-md-4">
                    <label for="client">Cliente</label>
                    <select class="form-control" v-model="request.client.id" id="requestClient">
                        <option v-for="cli in clients" v-bind:key="cli.id" :value="cli.id">{{cli.nome}}</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            request: {
                id: -1,
                number: '',
                emitDate: '',
                client: {
                    id: -1,
                    nome: ""
                },
                products: [
                    {
                        id: null,
                        name: '',
                        amount: -1,
                        unitaryValue: -1,
                        discountValue: -1,
                        total: -1,
                    }
                ]
            },
            clients: [
                {
                    id: 0,
                    nome: ""
                }
            ],
        }
    },
    emits: [
        "loadRequest"
    ],
    props: {
    },
    methods: {
        isValidFields() {
            var errorList = '';
            if (this.request.number == "") {
                errorList += "\r\n Campo número do pedido obrigatório!"
            }

            if (this.request.client == 0) {
                errorList += "\r\n Campo cliente obrigatório!"
            }
            
            if(errorList.length > 0) {
                alert(errorList);
            }
        },
        FormataStringData(data) {
            if (data.indexOf('-') >= 0)
                return data;

            var dia  = data.split("/")[0];
            var mes  = data.split("/")[1];
            var ano  = data.split("/")[2];

            return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
        },
        loadRequest() {
            if(this.request.number == null || this.request.number <= 0 ){
                alert("Número de pedido inválido!")
            }
            else {
                axios.get(`http://localhost:8080/pedido?numero=${this.request.number}`).then(response => {
                    var data = response.data[0];
                    if (data!= null && data.id != null) {
                        this.request.id = data.id;
                        this.request.number = data.numero;
                        this.request.emitDate = this.FormataStringData(data.dataEmissao);
                        this.request.client = data.cliente;
                        this.request.products = [];
                        data.produtos.map(p => this.request.products.push({ 
                            id: p.id,
                            name: p.nome,
                            amount: p.quantidade,
                            unitaryValue: p.valorUnitario,
                            discountValue: p.valorDesconto,
                        }))

                        this.$emit('loadRequest', this.request)
                    }
                })
            }
        },
    },
    components: {
    },
    beforeCreate() {
        axios.get(`http://localhost:8080/cliente`).then(response => {
            var data = response.data;
            if (data != null) {
                this.clients = [];
                data.map(x => this.clients.push(x))
            }
        })
    }
}
</script>

<style>

</style>