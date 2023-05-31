<template>
    <div id="app">
        <ejs-grid :dataSource="data"> </ejs-grid>
    </div>
</template>
<script>


import {DataManager, ODataAdaptor} from "@syncfusion/ej2-data";

export default {
    name:"TeamManage",
    data() {
        let SERVICE_URI =
            "https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders?$top=7";
        return {
            data: new DataManager({
                url: SERVICE_URI,
                adaptor: new ODataAdaptor()
            })
        };
    }
}
</script>
<style>
</style>