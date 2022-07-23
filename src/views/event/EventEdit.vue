<template>
  <div v-if="event">
    <p>Edit for the event here</p>
  </div>
</template>

<script>
export default {
  props: ["event"],
};
</script>
