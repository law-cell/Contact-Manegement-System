<template>
    <button v-on:click="testAPI()">Get Random User</button>
    <ejs-grid :dataSource='people'>
        <e-columns>
            <e-column field='id' headerText='ID' textAlign='Right'  width=100></e-column>
            <e-column field='name' headerText='Name' width=120></e-column>
            <e-column field='age' headerText='Age' width=150></e-column>
            <e-column field='email' headerText='Email' width=150></e-column>
            <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
            <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
            <e-column field='Freight' headerText='Freight' textAlign='Right' format='C2' width=90></e-column>
            <e-column field='OrderDate' headerText='Order Date' textAlign='Right' format='yMd' type='date' width=120></e-column>
        </e-columns>
    </ejs-grid>
</template>

<script>

import { GridComponent, ColumnsDirective, ColumnDirective} from "@syncfusion/ej2-vue-grids";

export default {
    name: "ContactItem",
    components: {
        "ejs-grid": GridComponent,
        "e-columns": ColumnsDirective,
        "e-column": ColumnDirective,
    },
    methods: {
        async getUser() {
            const res = await fetch('https://randomuser.me/api')
            const {results} = await res.json()
            console.log(results)
        },

        async testAPI() {
            const res = await fetch('http://localhost:8080/api/v1/people/getAllPeople')
            this.people = await res.json()
        },
    },
    data() {
        return {
            people: []
        };
    },
    created() {
        this.getUser()
        this.testAPI()
    },
}
</script>

<style scoped>

</style>