<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>

    <router-link :to="{ name: 'EventList' }">Return to events list</router-link>
  </div>
</template>

<script>
import EventServices from "@/services/EventServices";
export default {
  props: ["id"],
  data() {
    return {
      event: null,
    };
  },
  created() {
    EventServices.getEventById(this.id)
      .then((response) => {
        this.event = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
