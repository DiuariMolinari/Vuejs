<template>
    <div class="container">
        <h2>Produto</h2>
        <div class="row">
            <form @submit.prevent="adicionarProduto" >
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="name">Produto</label>
                        <input type="text" class="form-control" name="name" id="name" v-model="product.Name"  autofocus required>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="amount">Quantidade</label>
                        <input type="number" min="0" class="form-control" name="amount" id="amount" v-model="product.amount" required >
                    </div>
                    <div class="form-group col-md-2">
                        <label for="unitaryValue">Preço Unitário</label>
                        <input type="number" min="0" class="form-control" name="unitaryValue" id="unitaryValue" v-model="product.unitaryValue" required >
                    </div>
                    <div class="form-group col-md-2">
                        <label for="discountValue">Valor de Desconto</label>
                        <input type="number" min="0" class="form-control" name="discountValue" id="discountValue" v-model="product.discountValue" required >
                    </div>
                    <div class="form-group col-md-2" style="margin-top: 22px">
                        <button type="submit" class="btn btn-success">Adicionar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            product: {
                id: 0,
                name: '',
                amount: 0,
                unitaryValue: 0,
                discountValue: 0,
                total: 0,
            },
            isAdd: true,
        }
    },
    emits: [

    ],
    methods: {
        adicionarProduto(){

        }
    },
    components: {
    }
    // mounted : {
        
    // }
}
</script>

<style>
  
</style>