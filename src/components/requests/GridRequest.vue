<template>
    <form-request></form-request>  
</template>

<script>
import FormRequest from '../requests/FormRequest.vue'
export default {
    data() {
        return {
            request: {
                id: '',
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
        
    // },
    components: {
        FormRequest
    }
}
</script>

<style>

</style>