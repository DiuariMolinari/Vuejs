<template>
    <div class="container">
        <div class="row">
            <div class="col-3 col-lg-8" >
                <h2>Pessoas</h2>
                <div class="col-4 col-lg-5">
                    <div>
                        <input type="submit" value="Sortear Pessoa" class="btn btn-warning" @click="sortPerson">
                    </div>
                    <label for="filterName" style="margin-top: 15px;">Nome</label>
                    <div class="filter">
                        <input type="text" id="filterName" name="filterName"  class="form-control">
                        <a id="Filter" @click="FilterByName" class="btn btn-primary"><fa icon="search" /> </a>
                        <a id="ClearFilter" @click="ClearFilter" class="btn btn-danger"><fa icon="window-close" /> </a>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th id="tdName" scope="col" @click="orderByName()" class="column">Name 
                                <fa :icon="iconName" id="faIconName"/>
                            </th>

                            <th id="tdEmail" :v-if="orderEmailIcon" scope="col" @click="orderByEmail()" class="column">Email
                                <fa :icon="iconEmail" id="faIconEmail"/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in people" v-bind:key="p.id" :class="[ p.id == personDrawn.id ? 'selectRow' : '']">
                            <th scope="row" >  {{ p.id }} </th>
                            <td> {{ p.name }} </td>
                            <td> {{ p.email }} </td>
                            <td> <a @click="editPerson(p.id)" class="btn btn-warning"> Alterar</a> </td>
                            <td> <a @click="deletePerson(p.id)" class="btn btn-danger"> Deletar</a> </td>
                        </tr>
                        <tr class="totalizer" col>
                            <td colspan="3">  Total: {{ people.length }}</td>
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

        this.eventBus.on("changedPerson", (person) => {
            this.changePerson(person);
        });
        let filter = document.querySelector("#filterName");
        filter.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                document.querySelector("#Filter").click();
            }
        });
    },
    data() {
        return {
            people: new Array(),
            peopleBkp: new Array(),
            personDrawn: {},
            iconEmail: "",
            iconName: "",
            sequence: 0,
        }
    },
    methods:  {
        addPerson(personAdd) {
            let newPerson = { id: this.getSequence(), name: personAdd.name, email: personAdd.email };
             if (this.validatePerson(newPerson))
                this.people.push(newPerson);

            this.peopleBkp = this.people;
        },
        changePerson(personChanged){
            this.people = this.people.filter(p => p.id != personChanged.id);
            this.people.push(personChanged);

            this.peopleBkp = this.peopleBkp.filter(p => p.id != personChanged.id);
            this.peopleBkp.push(personChanged);
        },
        editPerson(id) {
            let person =  _.filter(this.people, function(o) { 
                if (o.id == id) {
                    return o;
                }
            });
            this.eventBus.emit("editPerson", {id: person[0].id, name: person[0].name, email: person[0].email});
        },
        deletePerson(id){
            this.people =  this.people.filter((a) => a.id != id)
            this.peopleBkp =  this.peopleBkp.filter((a) => a.id != id)
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
            this.iconEmail = (this.iconEmail == "" || this.iconEmail == "arrow-down") ? "arrow-up" : "arrow-down";
            this.iconName = "";

            if(this.iconName == "arrow-up")
                this.SortAsc("email");
            else
                this.SortDesc("email");
        },
         orderByName() {
            this.iconName = (this.iconName == "" || this.iconName == "arrow-down") ? "arrow-up" : "arrow-down";
            this.iconEmail = "";

            if(this.iconName == "arrow-up")
                this.SortAsc("name");
            else
                this.SortDesc("name");
        },
        SortAsc(field) {
             this.people = this.people.sort((a, b) => a[field].localeCompare(b[field]));
        },
        SortDesc(field){
            this.people = this.people.sort((a, b) => (a[field].localeCompare(b[field] * -1)));
        },
        FilterByName(){
            let filter = document.getElementById("filterName").value;
            let peopleFilter = _.filter(this.peopleBkp, function(o) { 
                if (o.name.toUpperCase().indexOf(filter.toUpperCase()) != -1) {
                    return o;
                }
            });

            if(peopleFilter.length != 0){
                this.people = peopleFilter; 
            }
        },
        ClearFilter() {
            document.getElementById("filterName").value = "";
            this.people = this.peopleBkp;
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
.column {
   cursor: pointer;
}
.filter {
    
    margin-bottom: 15px;
    display: flex;
}

</style>