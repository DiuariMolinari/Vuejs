<template>
    <div class="container">
        <form-request></form-request>  
        <div class="btnGroup">
            <input class="btn btn-primary" type="button" @click="showModal()" value="Novo Produto">
            <input class="btn" type="button" @click="hideModal()" value="Cancelar">
            <form-product hidden id="modalProduct"/>
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
                    <td> <a @click="editProduct(p.id)" class="btn btn-warning"> Alterar</a> </td>
                    <td> <a @click="deleteProduct(p.id)" class="btn btn-danger"> Deletar</a> </td>
                </tr>
                <div class="totalizer">
                    <span>Total pedido: {{ this.totalRequest }}</span>
                    <br>
                    <span>Quantidade de itens: {{ this.request.products.length }}</span>
                </div>
            </tbody>
        </table>
        <div>   
            <input class="btn btn-primary" type="submit" value="Salvar">
            <input class="btn btn-primary"  type="submit" value="Salvar/Novo">
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
                emitDate: '',
                client: '',
                products: [
                    {
                        id: 0,
                        name: 'Camiseta',
                        amount: 10,
                        unitaryValue: 10,
                        discountValue: 1,
                        total: 0,
                    }
                ],
            },
            isAdd: true,
            totalRequest: 0,
        }
    },
    emits: [

    ],
    methods: {
        editProduct(id){
            console.log(id);
        },
        deleteProduct(id){
            console.log(id);
        },
        showModal() {
            document.getElementById('modalProduct').removeAttribute("hidden");
        },
        hideModal(){
            document.getElementById('modalProduct').setAttribute("hidden", '');
        }
    },

    mounted() {
        if(this.request.products)
        {
            this.request.products.map(prod => {
                prod.total = prod.amount * prod.unitaryValue - prod.discountValue;
                this.totalRequest += prod.total;
            });    
        }
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