import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/app/home";
import { HomeLayout } from "./pages/_layouts/homeLayout";
import { OrderLayout } from "./pages/_layouts/orderLayout";
import { AuthLayout } from "./pages/_layouts/authLayout";
import { SignIn } from "./pages/auth/sign-in";
import { RequisitionsList } from "./pages/app/requisitions/_index";
import { ServiceOrders } from "./pages/app/servicesOrders/_index";
import { PartsOrders } from "./pages/app/partsOrders/_index";
import { OrdersContextProvider } from "./contexts/ordersContext";
import { RequisitionsContextProvider } from "./contexts/RequisitionsContex";
import { ArchivedOrdersContextProvider } from "./contexts/archivedOrdersContext";
import { ArchivedOrdersList } from "./pages/app/partsOrders/archivedList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/",
    element: <OrderLayout />,
    children: [{ path: "/services", element: <ServiceOrders /> }],
  },
  {
    path: "/",
    element: <OrderLayout />,
    children: [
      {
        path: "/orders",
        element: (
          <OrdersContextProvider>
            <PartsOrders />
          </OrdersContextProvider>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <OrderLayout />,
    children: [
      {
        path: "/archivedOrders",
        element: (
          <ArchivedOrdersContextProvider>
            <ArchivedOrdersList />
          </ArchivedOrdersContextProvider>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <OrderLayout />,
    children: [
      {
        path: "/requisitions",
        element: (
          <RequisitionsContextProvider>
            <RequisitionsList />
          </RequisitionsContextProvider>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sign-in", element: <SignIn /> }],
  },
]);
