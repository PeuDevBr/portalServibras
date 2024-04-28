import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/app/home";
import { NewOrder } from "./pages/app/orders/newOrder";
import { HomeLayout } from "./pages/_layouts/homeLayout";
import { OrderLayout } from "./pages/_layouts/orderLayout";
import { AuthLayout } from "./pages/_layouts/authLayout";
import { SignIn } from "./pages/auth/sign-in";
import { OrdersList } from "./pages/app/orders/ordersList";

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
  {
    path: "/",
    element: <OrderLayout />,
    children: [{ path: "/list", element: <OrdersList /> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sign-in", element: <SignIn /> }],
  },
]);
