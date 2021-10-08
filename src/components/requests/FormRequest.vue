<template>
    <div class="container">
        <h2>Cadastro de Pedidos</h2>
        <form @submit.prevent="adicionarPedido" >
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="requestNumber">Número pedido</label>
                    <input type="number" class="form-control" name="requestNumber" id="requestNumber" v-model="request.number"  autofocus required>
                </div>
                <div class="form-group col-md-4">
                    <label for="emitDate">Data de emissão</label>
                    <input type="date" class="form-control" name="emitDate" id="emitDate" v-model="request.emitDate" required >
                </div>
            </div>
            <div class="form-row">
                 <div class="form-group col-md-8">
                    <label for="client">Cliente</label>
                    <select class="form-control" name="client" id="client" v-model="request.client" required >
                        <option value="">Teste</option>
                    </select>
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
                client: '',
            },
            isAdd: true,
        }
    },
    emits: [

    ],
    methods: {

    },
    // mounted : {
        
    // }
}
</script>

<style>

</style>