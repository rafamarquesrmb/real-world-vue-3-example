<template>
    <div id="app">
        <div id="flashMessage" v-if="GStore.flashMessage">
            {{ GStore.flashMessage }}
        </div>
        <div id="nav">
            <router-link :to="{ name: 'EventList' }">Events</router-link> |
            <router-link :to="{ name: 'About' }">About</router-link>
        </div>
        <router-view />

        <footer>
            <p>
                Project done by Rafael Marques |
                <a href="https://github.com/rafamarquesrmb">@rafamarquesrmb</a>
            </p>
        </footer>
    </div>
</template>
<script>
export default {
    inject: ["GStore"],
};
</script>
<style>
html,
body {
    width: 100%;
    margin: 0;
    box-sizing: border-box;
}
@keyframes yellowfade {
    from {
        background: yellow;
    }
    to {
        background: transparent;
    }
}
#flashMessage {
    animation-name: yellowfade;
    animation-duration: 3s;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100%;
    padding-bottom: 5%;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
h4 {
    font-size: 20px;
}
footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #42b983;
}
a {
    color: #022917;
}
a:hover {
    color: #07834b;
}
</style>
