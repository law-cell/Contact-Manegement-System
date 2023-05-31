<template>
    <div id='app'>
        <ejs-schedule height='550px' width='100%' :selectedDate='selectedDate' :eventSettings='eventSettings'>
            <e-views>
                <e-view option='Day'></e-view>
                <e-view option='Week' startHour='07:00' endHour='15:00'></e-view>
                <e-view option='WorkWeek' startHour='10:00' endHour='18:00'></e-view>
                <e-view option='Month' showWeekend=false></e-view>
                <e-view option='Agenda'></e-view>
            </e-views>
            <e-resources>
<!--                <e-resource field="OwnerId" title="Owner" name="Owners" :dataSource="ownerDataSource"-->
<!--                            textField="OwnerText" idField="Id" colorField="OwnerColor">-->
<!--                </e-resource>-->

                <e-resource></e-resource>

            </e-resources>
        </ejs-schedule>
    </div>
</template>

<script>
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective } from "@syncfusion/ej2-vue-schedule";
import {DataManager, UrlAdaptor} from "@syncfusion/ej2-data";

// let dataManager = new DataManager({
//     url: 'http://localhost:8080/api/v1/event/getAllEvents',
//     crudUrl: 'http://localhost:8080/api/v1/event/eventCRUD',
//     adaptor: new UrlAdaptor
// });

export default {
    name: "SchedulerItem",
    components: {
        'ejs-schedule' : ScheduleComponent,
        'e-views' : ViewsDirective,
        'e-view' : ViewDirective,
        'e-resources' : ResourcesDirective,
        'e-resource' : ResourceDirective
    },
    data() {
        return {
            selectedDate: new Date(),
            allowMultiple: true,
            eventSettings: {
                dataSource: new DataManager({
                    url: 'http://localhost:8080/api/v1/event/getAllEvents',
                    crudUrl: 'http://localhost:8080/api/v1/event/eventCRUD',
                    adaptor: new UrlAdaptor
                }),
            },
        };
    },
    provide: {
        schedule: [Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]
    }
}
</script>

<style scoped>

</style>