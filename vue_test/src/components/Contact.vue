<template>
    <p>{{ message }} {{ name }}</p>
    <button v-on:click="getUser()">Get Random User</button>
</template>

<script>

export default {
    name: "ContactItem",
    methods: {
        async getUser() {
            const res = await fetch('https://randomuser.me/api')
            const {results} = await res.json()
            console.log(results)
        },

        async testAPI() {
            const res = await fetch('http://localhost:8080/api/v1/people/getAllPeople')
            const results = await res.json()
            console.log(results[0].name)
        },
    }
}
</script>

<style scoped>

</style>