import { createApp } from 'vue'
import App from './App.vue'
import { GridPlugin } from "@syncfusion/ej2-vue-grids";
import {SchedulePlugin} from "@syncfusion/ej2-vue-schedule";

createApp(App).use(GridPlugin)
createApp(App).use(SchedulePlugin)
createApp(App).mount('#app')
