import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/app/home";
import { NewRequisition } from "./pages/app/requisitions/newReqForm";
import { HomeLayout } from "./pages/_layouts/homeLayout";
import { OrderLayout } from "./pages/_layouts/orderLayout";
import { AuthLayout } from "./pages/_layouts/authLayout";
import { SignIn } from "./pages/auth/sign-in";
import { RequisitionsList } from "./pages/app/requisitions/requisitionsList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/",
    element: <OrderLayout />,
    children: [{ path: "/orders", element: <NewRequisition /> }],
  },
  {
    path: "/",
    element: <OrderLayout />,
    children: [{ path: "/list", element: <RequisitionsList /> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sign-in", element: <SignIn /> }],
  },
]);
