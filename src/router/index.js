import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import Canvas from "../views/Canvas.vue";
import Mint from "../views/Mint.vue";
import FAQ from "../views/FAQ.vue";
import GM from "../views/GM.vue";
import Dashboard from '../views/Dashboard.vue'
import FillUp from '../views/FillUp.vue'


const routes = [
  { path: "/", name: "Home", component: Home, meta: { title: "Home" } },
  {
    path: "/canvas",
    name: "Canvas",
    component: Canvas,
  },
  {
    path: "/mint",
    name: "Mint",
    component: Mint,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
  },
  {
    path: "/gm",
    name: "GM",
    component: GM,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/fillup/:tokenId",
    name: "FillUp",
    component: FillUp,
    props: true
  },
  { path: "/:path(.*)", component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
