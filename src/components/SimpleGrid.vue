<template>
    <div class="container">
        <div class="row">
            <div class="col-4 col-lg-4" >
                <h2>Pessoas</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for=" p in people" v-bind:key="p.id">
                            <th scope="row"> {{ p.id }} </th>
                            <td> {{ p.name }} </td>
                            <td> {{ p.email }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <input type="hidden" id="sequenceId">
</template>

<script>
export default {
     mounted() { 
            this.eventBus.on("addPerson", (person) => {
            this.addPerson(person);
        });
    },
    data() {
        return {
            people: [],
        }
    },
    methods:  {
        addPerson(personAdd) {
            let newPerson = { id: this.getSequence(), name: personAdd.name, email: personAdd.email }
             if (this.validatePerson(newPerson))
                this.people.push(newPerson);
        },
        validatePerson(person) {
            let messageErros = "";
            

            if (this.people.find(p => p.name === person.name) != null) {
                messageErros += "Pessoa já cadastrada!\r\n";
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
        getSequence() {
            let sequence = document.getElementById("sequenceId");
            if (sequence.value == "")
                sequence.value = 0
           
            return sequence.value++;
        }
    }
}

</script>

<style>

</style>