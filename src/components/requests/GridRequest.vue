<template>
    <div class="container">
        <form-request @loadRequest="loadRequest"></form-request>  
        <div class="btnGroup">
            <input class="btn btn-primary" type="button" @click="showModal()" value="Novo Produto">
            <form-product @addProduct='addProductGrid' @changeProduct='changeProductGrid' @showForm="showModal()" @hideForm="hideModal()" :key="FormProductKey" :productEdit="this.productEdit" hidden id="modalProduct" />
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th id="tdName"  scope="col" class="column">Produto</th>
                    <th id="tdEmail" scope="col" class="column">Quantidade</th>
                    <th id="tdEmail" scope="col" class="column">Preço Unitário</th>
                    <th id="tdEmail" scope="col" class="column">Valor de Desconto</th>
                    <th id="tdEmail" scope="col" class="column">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in request.products" v-bind:key="p.id" >
                    <td> {{ p.name }} </td>
                    <td> {{ p.amount }} </td>
                    <td> {{ p.unitaryValue }} </td>
                    <td> {{ p.discountValue }} </td>
                    <td> {{ p.total }} </td>
                    <td> <a @click="emitEditProduct(p)" class="btn btn-warning"> Alterar</a> </td>
                    <td> <a @click="deleteProductGrid(p)" class="btn btn-danger"> Deletar</a> </td>
                </tr>
                <div class="totalizer">
                    <span>Total pedido: {{ this.totalRequest }}</span>
                    <br>
                    <span>Quantidade de itens: {{ this.request.products.length }}</span>
                </div>
            </tbody>
        </table>
        <div>   
            <input class="btn btn-primary" type="submit" value="Salvar" @click="save()" >
            <input class="btn btn-primary"  type="submit" value="Salvar/Novo" @click="saveNew()" >
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import FormRequest from '../requests/FormRequest.vue'
import FormProduct from '../requests/products/FormProduct.vue'

export default {
    data() {
        return {
            request: {
                id: '',
                number: '',
                emitDate: '',
                client: {
                    id: -1
                },
                products: [
                    // {
                    //     id: 1,
                    //     name: 'teste',
                    //     amount: 10,
                    //     unitaryValue: 10,
                    //     discountValue: 10,
                    //     total: 0,
                    // }
                ],
            },
            isAdd: true,
            totalRequest: 0,

            productEdit: null,
            FormProductKey: 0,
        }
    },
    emits: [

    ],
    methods: {
        emitEditProduct(prod) {
            if(prod.uiId != null && prod.uiId != 0)
                this.productEdit = this.request.products.find(p => p.uiId == prod.uiId);

            else
                this.productEdit = this.request.products.find(p => p.id == prod.id);

            this.FormProductKey += 1;
        },
        
        showModal() {
            document.getElementById('modalProduct').removeAttribute("hidden");
        },
        hideModal(){
            document.getElementById('modalProduct').setAttribute("hidden", '');
        },
        addProductGrid(product) {
            this.request.products.push(product);
            this.hideModal();
            this.calculateTotalRequestValue();
        },
        changeProductGrid(product) {
            var index = -1;
            if (product.uiId != null && product.uiId != 0)
                index = this.request.products.findIndex(p => p.uiId == product.uiId);

            else
                index = this.request.products.findIndex(p => p.id == product.id);

            this.request.products[index] = product;
            this.calculateTotalRequestValue();
        },
        deleteProductGrid(prod){
            if(window.confirm("Confirmar exclusão?")){
                var index = -1;
                if (prod.uiId != null && prod.uiId != 0)
                    index = this.request.products.findIndex(p => p.uiId == prod.uiId);

                else{
                    index = this.request.products.findIndex(p => p.id == prod.id);
                    axios.delete(`http://localhost:8080/produto/${prod.id}`);
                }

                this.request.products.splice(index, 1);
                this.calculateTotalRequestValue();
            }
        },
        calculateTotalRequestValue() {
            if(this.request.products.length > 0)
            {
                this.totalRequest = 0;
                this.request.products.map(prod => {
                    this.totalRequest += prod.total;
                });    
            }
        },
        validateRequesFields(){
            var requestNumber = document.getElementById("requestNumber");
            var requestClient = document.getElementById("requestClient");

            var errorList = '';
            if (requestNumber.value == "") {
                errorList += "\r\n Campo \"Número pedido\" obrigatório!"
            }

            if (requestClient.value == "") {
                errorList += "\r\n Campo \"Cliente\" obrigatório!"
            }
            
            if(errorList.length > 0) {
                alert(errorList);
                return false
            }
            return true;
        },
        loadNewRequest(){
            this.request.number = document.getElementById('requestNumber').value;
            this.request.client.id = document.getElementById('requestClient').value;
            this.request.emitDate = document.getElementById('emitDate').value;

        },
        async save() {
            if(this.request.id <= 0){
                this.loadNewRequest();
            }

            if(this.validateRequesFields()){

                var dataReq = this.TranslateRequestToPortugues(this.request);


                await axios({
                     method: 'post',
                     url: "http://localhost:8080/pedido",
                     data: dataReq
                })
                .then((response) => {
                        console.log(response.data);
                        
                        alert("Registro salvo com sucesso!")
                    })
                    .catch(error => 
                        alert(error)
                    )
            }

        },
        saveNew() {
            this.save();
            this.clearRequest();
        },
        clearRequest(){
            this.request = {
                id: '',
                    number: '',
                    emitDate: '',
                    client: {
                        id: -1
                    },
                    products: [
                        // {
                        //     id: 1,
                        //     name: 'teste',
                        //     amount: 10,
                        //     unitaryValue: 10,
                        //     discountValue: 10,
                        //     total: 0,
                        // }
                    ],
            }

            this.request.number = document.getElementById('requestNumber').value = "";
            this.request.client.id = document.getElementById('requestClient').value = "";
            this.request.emitDate = document.getElementById('emitDate').value = "";

        },
        loadRequest(request){
            this.request.id = request.id;
            this.request.number = request.number;
            this.request.emitDate = request.emitDate;
            this.request.client.id = request.client.id;

            this.request.products = [];
            request.products.map(p => this.request.products.push({ 
                id: p.id,
                name: p.name,
                amount: p.amount,
                unitaryValue: p.unitaryValue,
                discountValue: p.discountValue,
                total: (p.unitaryValue * p.amount) - p.discountValue
            }))

            this.calculateTotalRequestValue();
            console.log(this.request.products)
        },
        TranslateRequestToIngles(request){
            var translatedRequest = {
                id: '',
                number: '',
                emitDate: '',
                client: {
                    id: -1
                },
                products: [
                    // {
                    //     id: 1,
                    //     name: 'teste',
                    //     amount: 10,
                    //     unitaryValue: 10,
                    //     discountValue: 10,
                    //     total: 0,
                    // }
                ],
            };
            translatedRequest.id = request.id;
            translatedRequest.number = request.number;
            translatedRequest.emitDate = request.emitDate;
            translatedRequest.client.id = request.client.id;

            request.products.map(p => translatedRequest.products.push({ 
                id: p.id,
                name: p.name,
                amount: p.amount,
                unitaryValue: p.unitaryValue,
                discountValue: p.discountValue,
                total: (p.unitaryValue * p.amount) - p.discountValue
            }))

            return translatedRequest;
        },
        TranslateRequestToPortugues(request){

            var produtosParse = [];
                request.products.map(p => produtosParse.push({ 
                    id: p.id,
                    nome: p.name,
                    quantidade: p.amount,
                    valorUnitario: p.unitaryValue,
                    valorDesconto: p.discountValue,
                }))

            var translatedRequest = null;
            if(produtosParse[0] != null){
                translatedRequest = {
                    id: this.request.id,
                    numero: this.request.number,
                    dataEmissao: this.request.emitDate,
                    cliente: this.request.client,
                    produtos: produtosParse
                }
            }
            else {
                 translatedRequest = {
                    id: this.request.id,
                    numero: this.request.number,
                    dataEmissao: this.request.emitDate,
                    cliente: this.request.client,
                }
            }

            return translatedRequest;
        },

        
    },
    mounted() {
        this.calculateTotalRequestValue();
    },
    components: {
        FormRequest,
        FormProduct,
    },
}
</script>

<style>
    .btnGroup {
        margin: 10px;
    }
    .btn {
        margin: 2px;
    }
    .totalizer {
        align-content: initial;
        text-align: right;
        width: 375%;
        padding-top: 10%;
    }
</style>