import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
import Footer from "../component/Footer"
import Home from "../component/Home"
import CarsParst from "../component/CarsParst"
import Nav from "../component/Nav"
const Root = createRootRoute({
component: function RootLayout(){
    return (
        <>
       <Nav />
        <section id="center">
            <Outlet />
        </section>
        <footer>
            <Footer />
        </footer>
        </>
    )
}
})

const homePage = createRoute({
    getParentRoute: () => Root,
    path: "/",
    component: Home,
})

const carsPage = createRoute({
    getParentRoute: () => Root,
    path: "/Cars",
    component: CarsParst,
})
const routeTree = Root.addChildren([homePage, carsPage])

export const router = createRouter({routeTree})

