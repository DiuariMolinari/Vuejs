<template>
    <div class="container">
        <div class="row">
            <div class="col-4 col-lg-4" >
                <h2>Cadastro de Pedidos</h2>
                <form @submit.prevent="adicionarPedido" >
                        <div class="form-group">
                            <label for="requestNumber">Número pedido</label>
                            <input type="number" class="form-control" name="requestNumber" id="requestNumber" v-model="request.number"  autofocus required>
                        </div>
                        <div class="form-group">
                            <label for="emitDate">Data de emissão</label>
                            <input type="date" class="form-control" name="emitDate" id="emitDate" v-model="request.emitDate" required >
                        </div>
                    <div class="form-group">
                        <label for="client">Cliente</label>
                        <select class="form-control" name="client" id="client" v-model="request.client" required >
                            <option value="">Teste</option>
                        </select>
                    </div>
                    
                    <button v-if="this.isAdd" type="submit" class="btn btn-primary" @click="addRequest">Adicionar</button>
                    <button v-else type="submit" class="btn btn-primary" @click="changeRequest">Alterar</button>
                </form>
            </div>
        </div>
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