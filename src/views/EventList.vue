<template>
    <div class="events">
        <h1>Events For Good</h1>

        <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    <div class="pagination">
        <router-link
            id="page-prev"
            :to="{ name: 'EventList', query: { page: page - 1 } }"
            rel="prev"
            v-if="page != 1"
        >
            &#60; Previous
        </router-link>
        <router-link
            id="page-next"
            :to="{ name: 'EventList', query: { page: page + 1 } }"
            rel="prev"
            v-if="hasNextPage"
        >
            Next &#62;
        </router-link>
    </div>
</template>

<script>
import EventServices from "@/services/EventServices";
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import { watchEffect } from "vue";

export default {
    name: "EventList",
    props: ["page"],
    components: {
        EventCard,
    },
    data() {
        return {
            events: null,
            totalEvents: 0,
        };
    },
    created() {
        watchEffect(() => {
            this.events = null;
            EventServices.getEvents(2, this.page)
                .then((response) => {
                    this.events = response.data;
                    this.totalEvents = response.headers["x-total-count"];
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    },
    computed: {
        hasNextPage() {
            var totalPages = Math.ceil(this.totalEvents / 2);
            return this.page < totalPages;
        },
    },
};
</script>

<style scoped>
.events {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.pagination {
    display: flex;
    width: 290px;
    margin: 0 auto;
    flex-wrap: nowrap;

    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
}
.pagination a {
    flex: 1;
    text-decoration: none;
    color: #2c3e50;
}
#page-prev {
    text-align: left;
}
#page-next {
    text-align: right;
}
</style>
