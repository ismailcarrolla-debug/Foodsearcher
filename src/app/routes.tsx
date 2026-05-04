import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { Search } from "./components/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Home },
      { path: "search", Component: Search },
    ],
  },
]);
