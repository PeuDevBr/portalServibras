import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/app/home";
import { NewOrder } from "./pages/app/orders/newOrder";
import { HomeLayout } from "./pages/_layouts/homeLayout";
import { OrderLayout } from "./pages/_layouts/orderLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/",
    element: <OrderLayout />,
    children: [{ path: "/orders", element: <NewOrder /> }],
  },
]);
