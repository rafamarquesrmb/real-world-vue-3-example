<template>
    <div v-if="event">
        <p>Edit for the event here</p>
    </div>
</template>

<script>
export default {
    props: ["event"],
    data: function () {
        return {
            unsavedChanges: true,
        };
    },
    // beforeRouteLeave(routeTo, routeFrom, next) {
    //     if (this.unsavedChanges) {
    //         const answer = window.confirm(
    //             "Do you really want to leave? You have unsaved changes!"
    //         );
    //         if (answer) {
    //             next(); // <-- Confirms the navigation
    //         } else {
    //             next(false); // <-- Cancels the navigation
    //         }
    //     } else {
    //         next(); // <-- Confirms the navigation
    //     }
    // },
    beforeRouteLeave() {
        if (this.unsavedChanges) {
            const answer = window.confirm(
                "Do you really want to leave? You have unsaved changes!"
            );
            if (!answer) {
                return false; // <-- Cancels the navigation
            }
        }
    },
};
</script>
