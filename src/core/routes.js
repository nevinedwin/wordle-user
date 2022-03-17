import Game from "../pages/game";
import SignUp from "../pages/signup";

export const routes = [

    {
        path: "/signup",
        component: SignUp
    },
    {
        path: "/",
        component: SignUp
    },
    {
        path: "/game",
        component: Game
    },
    // {
    //     path: "*",
    //     component: Game
    // },
    {
        path: "*",
        component: SignUp
    },


]