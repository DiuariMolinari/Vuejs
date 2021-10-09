import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

//date component
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';

//select component
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

library.add(fas);

const eventBus = mitt();
const app = createApp(App);

app.config.globalProperties.eventBus = eventBus;
app.component("Datepicker", Datepicker);
app.component("Multiselect", Multiselect);
app.component('fa', FontAwesomeIcon).mount('#app');
