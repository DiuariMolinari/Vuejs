<template>
    <div class="container">
        <form-request></form-request>  
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
                    <td> <a @click="emitEditProduct(p.id)" class="btn btn-warning"> Alterar</a> </td>
                    <td> <a @click="deleteProductGrid(p.id)" class="btn btn-danger"> Deletar</a> </td>
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
import FormRequest from '../requests/FormRequest.vue'
import FormProduct from '../requests/products/FormProduct.vue'

export default {
    data() {
        return {
            request: {
                id: '',
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
        emitEditProduct(id) {
            this.productEdit = this.request.products.find(p => p.id == id);
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
            var index = this.request.products.findIndex(p => p.id == product.id);
            this.request.products[index] = product;
            this.calculateTotalRequestValue();
        },
        deleteProductGrid(id){
            if(window.confirm("Confirmar exclusão?")){
                var index = this.request.products.findIndex(p => p.id == id);
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
            var requestClient = document.getElementsByClassName("multiselect-single-label");

            var errorList = '';
            if (requestNumber.value == "") {
                errorList += "\r\n Campo \"Número pedido\" obrigatório!"
            }

            if (!requestClient[0] || !requestClient[0].innerText) {
                errorList += "\r\n Campo \"Cliente\" obrigatório!"
            }
            
            if(errorList.length > 0) {
                alert(errorList);
            }
            
        },
        save() {
            this.validateRequesFields();
        },
        saveNew() {

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