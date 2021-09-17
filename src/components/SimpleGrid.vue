<template>
    <div class="container">
        <div class="row">
            <div class="col-3 col-lg-8" >
                <h2>Pessoas</h2>
                <input type="submit" value="Sortear Pessoa" class="btn btn-warning" @click="sortPerson">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th id="tdName" scope="col" @click="orderByName()">Name 
                                <fa :icon="iconName" id="faIconName"/>
                            </th>

                            <th id="tdEmail" :v-if="orderEmailIcon" scope="col" @click="orderByEmail()">Email
                                <fa  :icon="iconEmail" id="faIconEmail"/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in people" v-bind:key="p.id" :class="[ p.id == personDrawn.id ? 'selectRow' : '']">
                            <th scope="row" >  {{ p.id }} </th>
                            <td> {{ p.name }} </td>
                            <td> {{ p.email }} </td>
                        </tr>
                        <tr class="totalizer" col>
                            <!-- <td colspan="3">  Total: {{ people.length }}</td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import _ from "lodash";
export default {
     mounted() { 
            this.eventBus.on("addPerson", (person) => {
            this.addPerson(person);
        });
    },
    data() {
        return {
            people: new Array(),
            personDrawn: {},
            iconEmail: "arrow-up",
            iconName: "arrow-up",
            sequence: 0,
        }
    },
    methods:  {
        addPerson(personAdd) {
            let newPerson = { id: this.getSequence(), name: personAdd.name, email: personAdd.email };
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
            this.sequence = this.sequence + 1;
            return this.sequence;
        },
        sortPerson() {
            this.personDrawn =  this.people[Math.floor(Math.random() * this.people.length)];
        },
        orderByEmail() {
            this.iconEmail = (this.iconEmail == "" || this.iconEmail == null  || this.iconEmail == "arrow-down") ? "arrow-up" : "arrow-down";
            this.people = this.SortAsc(this.people);

        },
         orderByName() {
            this.iconName = (this.iconName == "" || this.iconName == null  || this.iconName == "arrow-down") ? "arrow-up" : "arrow-down";
            this.people = this.SortAsc(this.people);
        },
        SortAsc() {
            let array = _.cloneDeep(this.people);
            console.log(array)
             array= _.orderBy(this.array, name, 'asc');
            console.log(array)
        },
        SortDesc(){
            let array = _.cloneDeep(this.people);
            console.log(array)
             array= _.orderBy(this.array, name, 'asc');
            console.log(array)
        }
    },
}

</script>

<style>
.selectRow {
  background-color: yellow;
}

.totalizer {
  background-color: rgb(207, 210, 228)
}

</style>