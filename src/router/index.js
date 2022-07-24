import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import NProgress from "nprogress";
import EventServices from "@/services/EventServices";
import GStore from "@/store";

const AboutView = () =>
    import(/* webpackChunkName: "about" */ "../views/AboutView.vue");
const NotFound = () =>
    import(/* webpackChunkName: "404" */ "../views/NotFound.vue");
const NetworkError = () =>
    import(/* webpackChunkName: "404" */ "../views/NetworkError.vue");
const EventDetails = () =>
    import(/* webpackChunkName: "events" */ "../views/event/EventDetails.vue");
const EventEdit = () =>
    import(/* webpackChunkName: "events" */ "../views/event/EventEdit.vue");
const EventRegister = () =>
    import(/* webpackChunkName: "events" */ "../views/event/EventRegister.vue");
const EventLayout = () =>
    import(/* webpackChunkName: "events" */ "../views/event/EventLayout.vue");

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
                meta: { requireAuth: true },
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

router.beforeEach((to, from) => {
    NProgress.start();
    const notAuthorized = true;
    if (to.meta.requireAuth && notAuthorized) {
        GStore.flashMessage = "Sorry, you are not authorized to view this page";
        setTimeout(() => {
            GStore.flashMessage = "";
        }, 3000);
        if (from.hrf) {
            return false;
        } else {
            return { path: "/" };
        }
    }
});
router.afterEach(() => {
    NProgress.done();
});

export default router;
