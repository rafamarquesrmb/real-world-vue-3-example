<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>

    <div id="nav">
      <router-link :to="{ name: 'EventDetails', params: { id } }"
        >Details</router-link
      >
      |
      <router-link :to="{ name: 'EventRegister', params: { id } }"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'EventEdit', params: { id } }"
        >Edit</router-link
      >
    </div>

    <router-view :event="event" />

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
