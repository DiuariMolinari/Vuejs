<template>
    <div class="container">
        <h2>Produto</h2>
        <div class="row">
            <form @submit.prevent="adicionarProduto" >
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="product">Produto</label>
                        <input type="text" class="form-control" name="product" id="product" v-model="product.name" required>
                    </div>
                    <div class="form-group col-md-2">
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
                    <div class="form-group col-md-3" style="margin-top: 22px">

                        <button v-if="this.isAdd" type="submit" class="btn btn-success" @click="addProduct()" >Adicionar</button>
                        <button v-else type="submit" class="btn btn-primary" @click="changeProduct()" > Salvar </button>

                        <button type="submit" class="btn" @click="clearForm()" > Cancelar </button>
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
            sequence: 0,
        }
    },
    props: {
        productEdit: null,
    },
    emits: [
        'addProduct',   
    ],
    methods: {
        addProduct(){
             if (!this.isValidFields()) {
                return;
            }
            this.calculateTotal();
            this.calculateSequence();

            this.$emit('addProduct', Object.assign({}, this.product));
            this.clearForm();
        },
        changeProduct() {
            if (!this.isValidFields()) {
                return;
            }
            this.calculateTotal();

            this.$emit('changeProduct', Object.assign({}, this.product));
            this.clearForm();
        },
        calculateSequence() {
            this.sequence += 1;
            this.product.id = this.sequence;
        },
        clearForm() {
            this.product.id = 0;
            this.product.name = '';
            this.product.amount = 0;
            this.product.unitaryValue = 0;
            this.product.discountValue = 0;
            this.product.total = 0;
            this.isAdd = true;
            this.$emit('hideForm', true);
        },
        calculateTotal() {
            this.product.total = this.product.amount * this.product.unitaryValue - this.product.discountValue; 
        },
        isValidFields() {
            var errorList = '';
            if (this.product.name == "") {
                errorList += "\r\n Nome do produto obrigatório!"
            }

            if (this.product.amount == 0) {
                errorList += "\r\n Quantidade do produto deve ser maior que zero!"
            }
            
            if(errorList.length > 0) {
                alert(errorList);
                return false
            }

            return true;
        }
    },
    components: {

    },
    beforeMount(){
        if (this.productEdit) {
            this.product = Object.assign({}, this.productEdit);
            this.isAdd = false;
        }
    },
    mounted() {
        if (this.productEdit) {
            this.$emit('showForm', true);
        }
    },
}
</script>

<style>
  
</style>