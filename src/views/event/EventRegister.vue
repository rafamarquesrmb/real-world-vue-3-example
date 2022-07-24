<template>
    <div v-if="event">
        <p>Register for the event here</p>
        <button @click="register">Register</button>
    </div>
</template>

<script>
export default {
    props: ["event"],
    methods: {
        register() {
            this.$router.push({
                //call api, do registration... then:
                name: "EventDetails",
                params: { id: this.event.id },
            });
        },
    },
};
</script>
