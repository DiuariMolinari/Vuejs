<template>
    <div class="container">
        <h2>Cadastro de Pedidos</h2>
        <form @submit.prevent="adicionarPedido" >
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="requestNumber">Número pedido</label>
                    <input type="number" min="1" class="form-control" name="requestNumber" id="requestNumber" v-model="request.number"  autofocus required>
                </div>
                <div class="form-group col-md-4">
                    <label for="emitDate">Data de emissão</label>
                    <input type="date" class="form-control" name="emitDate" id="emitDate" v-model="request.emitDate" required >
                </div>
            </div>
            <div class="form-row">
                 <div class="form-group col-md-8">
                    <label for="client">Cliente</label>
                    <multiselect mode="single" v-model="request.client" :options="clients"/>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            request: {
                number: '',
                emitDate: '',
                client: null,
            },
            isAdd: true,
            clients: ["Benner Sistemas", "Philips", "Ambev Tech"],
        }
    },
    emits: [

    ],
    methods: {

    },
    components: {
    }
    // mounted : {
        
    // }
}
</script>

<style>

</style>