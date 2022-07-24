import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import AboutView from "../views/AboutView.vue";
import EventDetails from "../views/event/EventDetails.vue";
import EventEdit from "../views/event/EventEdit.vue";
import EventRegister from "../views/event/EventRegister.vue";
import EventLayout from "../views/event/EventLayout.vue";
import NotFound from "../views/NotFound.vue";
import NetworkError from "../views/NetworkError.vue";
import NProgress from "nprogress";
import EventServices from "@/services/EventServices";
import GStore from "@/store";
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
        beforeEnter: (to) => {
            return EventServices.getEventById(to.params.id)
                .then((response) => {
                    GStore.event = response.data;
                })
                .catch((err) => {
                    if (err.response && err.response.status == 404) {
                        return {
                            name: "404Resource",
                            params: { resource: "event" },
                        };
                    } else {
                        return { name: "NetworkError" };
                    }
                });
        },
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
    {
        path: "/404/:resource",
        name: "404Resource",
        component: NotFound,
        props: true,
    },
    {
        path: "/network-error",
        name: "NetworkError",
        component: NetworkError,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(() => {
    NProgress.start();
});
router.afterEach(() => {
    NProgress.done();
});

export default router;
