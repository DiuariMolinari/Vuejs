<template>
    <div class="container">
        <div class="row">
            <div class="col-4 col-lg-4" >
                <h2>Cadastro de Pessoas</h2>
                <form @submit.prevent="adicionarPessoa" >
                    <div class="form-group">
                        <label for="name">Nome</label>
                        <input type="text" class="form-control" name="name" id="name" v-model="person.name" placeholder="Your name" autofocus required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" name="email" id="email" v-model="person.email" required placeholder="Enter email">
                    </div>
                   
                    <button type="submit" class="btn btn-primary" @click="addPerson">Adicionar</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            person: {
                name: '',
                email: '',
            },
        }
    },
    emits: [
        "addPerson"
    ],
    methods:  {
        addPerson() {
            if (this.validateFields() == true)
            {
                console.log("submit");
                this.eventBus.emit("addPerson", this.person);
                this.reset();
            }
        },
        validateFields(){
            let messageErros = "";
            if (this.person.name == "" || this.person.name == null) {
                messageErros += "Campo nome obrigatório! \r\n";
            }

            if (this.person.email == "" || this.person.email == null) {
                messageErros += "Campo email obrigatório!\r\n";
            }

            if (messageErros.length > 0) {
                this.showMessage(messageErros);
                return false;
            }
            return true;
        },
        showMessage(message) {
            alert(message);
        },
        reset() {
            this.person.name = null;
            this.person.email = null;
        },
    }
}

</script>

<style>

</style>