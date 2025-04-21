import { createBrowserRouter } from "react-router-dom";

import Home from "./Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout>
                <Home />
            </MainLayout>
        ),
    },
]);

export default router;