import { createBrowserRouter } from "react-router";
import App, { actionGetSummary } from "./App";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        action: actionGetSummary,
    },
]);
