<template>
  <div id="about">
    <h1>About this project</h1>
    <div class="content">
      <p>
        This is a very simple project, with the objective of demonstrating what
        a <a href="https://vuejs.org/" target="_blank">SPA in Vue3</a> would look like in a real world project.
      </p>
      <p>
        Contains the main functionality used in SPAs of real Vue3 projects:
        <ul>
          <li>Use of routes, using <a href="https://router.vuejs.org/" target="_blank">"vue-router"</a></li>
          <li>Data consumption through an external api, using <a href="https://axios-http.com/docs/intro" target="_blank">"axios"</a></li>
        </ul>
      </p>
      <p><a href="https://my-json-server.typicode.com/" target="_blank">"My JSON Server"</a> was used to serve a Fake API with data in JSON format to be consumed by the app.</p>
      
      
    </div>
  </div>
</template>
<style scoped>
#about{
  width: 100%;
  display: block;
  max-width: 400px;
  margin: 0 auto;
  padding: 0 2%;
}
.content{
  text-align: left;
}

</style>
