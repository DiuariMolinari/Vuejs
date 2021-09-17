import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

const eventBus = mitt()
const app = createApp(App)


app.config.globalProperties.eventBus = eventBus
app.component('fa', FontAwesomeIcon).mount('#app')