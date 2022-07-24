<template>
    <div v-if="event">
        <p>Register for the event here</p>
        <button @click="register">Register</button>
    </div>
</template>

<script>
export default {
    props: ["event"],
    inject: ["GStore"],
    methods: {
        register() {
            this.GStore.flashMessage =
                "You are successfully registered for " + this.event.title;
            setTimeout(() => {
                this.GStore.flashMessage = "";
            }, 3000);
            this.$router.push({
                //call api, do registration... then:
                name: "EventDetails",
                params: { id: this.event.id },
            });
        },
    },
};
</script>
