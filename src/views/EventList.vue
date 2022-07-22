<template>
  <div class="events">
    <h1>Events For Good</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventServices from "@/services/EventServices";
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";

export default {
  name: "EventList",
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
    };
  },
  created() {
    EventServices.getEvents()
      .then((response) => {
        this.events = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
