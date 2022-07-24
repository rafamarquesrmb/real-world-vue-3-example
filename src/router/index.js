import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import AboutView from "../views/AboutView.vue";
import EventDetails from "../views/event/EventDetails.vue";
import EventEdit from "../views/event/EventEdit.vue";
import EventRegister from "../views/event/EventRegister.vue";
import EventLayout from "../views/event/EventLayout.vue";
import NotFound from "../views/NotFound.vue";
const routes = [
    {
        path: "/",
        name: "EventList",
        component: EventList,
        props: (route) => ({
            page: parseInt(route.query.page) || 1,
        }),
    },
    {
        path: "/:catchall(.*)",
        name: "NotFound",
        component: NotFound,
    },
    {
        path: "/about-us",
        name: "About",
        component: AboutView,
    },
    {
        path: "/about-us",
        redirect: { name: "About" },
    },
    {
        path: "/events/:id",
        name: "EventLayout",
        props: true,
        component: EventLayout,
        children: [
            {
                path: "",
                name: "EventDetails",
                component: EventDetails,
            },
            {
                path: "register",
                name: "EventRegister",
                component: EventRegister,
            },
            {
                path: "edit",
                name: "EventEdit",
                component: EventEdit,
            },
        ],
    },
    {
        path: "/:catchall(.*)",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
