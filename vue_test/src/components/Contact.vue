<template>
<!--    <button v-on:click="testAPI()">Get Random User</button>-->
    <div class="col-lg-12 control-section">
    <ejs-grid ref='grid' :dataSource='data' :allowPaging = "true" :pageSettings='pageSettings' :editSettings='editSettings' :toolbar='toolbar'>
        <e-columns>
            <e-column field='id' headerText='ID' textAlign='Right' :isPrimaryKey='true'  width=100></e-column>
            <e-column field='name' headerText='Name' width=120 :validationRules='nameRules' editType='TextBox'></e-column>
            <e-column field='age' headerText='Age' width=150 :validationRules='ageRules' editType='TextBox'></e-column>
            <e-column field='email' headerText='Email' width=150 :validationRules='emailRules' editType='TextBox' :allowEditing= 'true'></e-column>
        </e-columns>
    </ejs-grid>
    </div>
</template>

<script>
import {ColumnDirective, ColumnsDirective, Edit, GridComponent, Page, Toolbar} from "@syncfusion/ej2-vue-grids";
import {DataManager, UrlAdaptor} from '@syncfusion/ej2-data';
export default {
    name: "ContactItem",
    components: {
        "ejs-grid": GridComponent,
        "e-columns": ColumnsDirective,
        "e-column": ColumnDirective,
    },
    methods: {
        // async getUser() {
        //     const res = await fetch('http://localhost:8080/api/v1/people/getAllPeople')
        //     this.people = await res.json()
        // }
    },
    data() {
        return {
            data: new DataManager({
                url: "http://localhost:8080/api/v2/people/getAllPeople",
                updateUrl: "http://localhost:8080/api/v2/people/update",
                insertUrl: "http://localhost:8080/api/v2/people/addNewPeople",
                removeUrl: "http://localhost:8080/api/v2/people/delete",
                adaptor: new UrlAdaptor
            }),
            people: [],
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' },
            toolbar: ['Add', 'Delete', 'Update', 'Cancel'],
            nameRules: { required: true },
            ageRules: { required: true },
            emailRules: { required: true },
            pageSettings: {pageCount :10, pageSize: 10, pageSizes: true},
            componentKey: 0

        };
    },
    provide: {
        grid: [Toolbar, Edit, Page]
    },
}
</script>

<style scoped>

</style>