import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import MPaging from "@/components/base/MPaging/MPaging.vue";
import MTable from "./components/base/MTable.vue"
const app = createApp(App)

app.component('MPaging', MPaging);
app.component("MTable", MTable);
app.use(router)

app.mount('#app')
