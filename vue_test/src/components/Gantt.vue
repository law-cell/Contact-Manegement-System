<template>
    <div>
        <ejs-gantt ref='gantt' id="GanttContainer" :dataSource="data" :taskFields= "taskFields" :height= "height" :treeColumnIndex= "1" :resourceFields= "resourceFields" :resources= "resources" :highlightWeekends= "true" :labelSettings= "labelSettings" :toolbar="toolbar" :editSettings= "editSettings" :enableContextMenu="true"></ejs-gantt>
    </div>
</template>
<script>
import {GanttComponent, Edit, Selection, Toolbar, ContextMenu} from '@syncfusion/ej2-vue-gantt';
import {DataManager, UrlAdaptor} from "@syncfusion/ej2-data";

export default {
    name: "GanttItem",
    components: {
        'ejs-gantt' : GanttComponent
    },
    data: function() {
        return{
            data: new DataManager({
                url: 'http://localhost:8080/api/v1/task/getAllTasks',
                adaptor: new UrlAdaptor,
                batchUrl: 'http://localhost:8080/api/v1/task/batchUrl'
            }),
            taskFields: {
                id: 'id',
                name: 'taskName',
                parentId: 'parentId',
                startDate: 'startDate',
                endDate: 'endDate',
                duration: 'duration',
                progress: 'progress',
                dependency: 'Predecessor',
                child: 'subtasks',
                resourceInfo: 'resources',
                segments: 'Segments'
            },
            height: '450px',

            resourceFields: {
                id: 'id',
                name: 'name',
                unit: 'resourceUnit',
                group: 'team'
            },

            // resources: new DataManager({
            //     url: 'http://localhost:8080/api/v2/people/getAllPeople',
            //     adaptor: new UrlAdaptor
            // }),
            // resources:[],
            resources: [
                { id: 1, name: 'Martin Tamer' , team: "BPS"},
                { id: 2, name: 'Rose Fuller' },
                { id: 3, name: 'Margaret Buchanan' },
                { id: 4, name: 'Fuller King' },
                { id: 5, name: 'Davolio Fuller' },
                { id: 6, name: 'Van Jack' },
                { id: 7, name: 'Fuller Buchanan' },
                { id: 8, name: 'Jack Davolio' },
                { id: 9, name: 'Tamer Vinet' },
                { id: 10, name: 'Vinet Fuller' },
                { id: 11, name: 'Bergs Anton' },
                { id: 12, name: 'Construction Supervisor' }
            ],
            labelSettings: {
                leftLabel: 'taskName',
                rightLabel: 'resources'
            },
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
        };
    },
    methods: {
        // async getUser() {
        //     const res = await fetch('http://localhost:8080/api/v2/people/getPeopleDTO')
        //     this.resources = await res.json()
        // },
    },
    provide: {
        gantt: [ Edit, Selection, Toolbar ,ContextMenu]
    },
    created() {
        // this.getUser();
    }

};
</script>

<style>

</style>
