import Header from "./components/Header.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CatsPage from "./pages/CatsPage.tsx";
import AuthPage from "./pages/authPage.tsx";
import CatsFavoritesPage from "./pages/CatsFavoritesPage.tsx";
import RouteGuard from "./pages/routeGuard.tsx";

function App() {

    const router = createBrowserRouter([
        {
            element: <Header/>,
            children: [
                {
                    path: "/",
                    element: <CatsPage/>,
                },
                {
                    element: <RouteGuard/>,
                    children:[
                        {
                            path: "/favorites",
                            element: <CatsFavoritesPage/>
                        },
                    ]
                },
                {
                    path: "/auth",
                    element: <AuthPage/>
                }
            ]
        }
    ]);

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
