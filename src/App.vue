<template>
    <head>
         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
    </head>
    <div>
      <GridRequest></GridRequest>
    </div>
</template>

<script>
//import FormGrid from "./components/people/FormGrid.vue";
import GridRequest from "./components/requests/GridRequest.vue";

  export default {
    name: "App",
    components: {
      GridRequest
    },
  }

</script>
<style>
  .multiselect {
    height: 34px;
    font-size: 14px !important;
  }

  .multiselect-option {
    font-size: 14px !important;
  }

  .multiselect-option.is-pointed:hover {
    background: #26c08e !important;
  }
  
</style>