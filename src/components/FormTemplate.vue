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

                    <button v-if="this.isAdd" type="submit" class="btn btn-primary" @click="addPerson">Adicionar</button>
                    <button v-else type="submit" class="btn btn-primary" @click="changePerson">Alterar</button>
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
            isAdd: true,
        }
    },
    emits: [
        "addPerson"
    ],
    mounted() {
        this.eventBus.on("editPerson", (person) => {
            this.person = person;
            this.isAdd = false;
        });
    },
    methods:  {
        addPerson() {
            if (this.validateFields() == true)
            {
                this.eventBus.emit("addPerson", {id: this.person.id, name: this.person.name, email: this.person.email});
                this.reset();
            }
        },
        changePerson() {
            if (this.validateFields() == true)
            {
                this.eventBus.emit("changedPerson", {id: this.person.id, name: this.person.name, email: this.person.email});
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
            this.isAdd = true;
        },
    }
}

</script>

<style>

</style>