import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/app/home";
import { HomeLayout } from "./pages/_layouts/homeLayout";
import { OrderLayout } from "./pages/_layouts/orderLayout";
import { RequisitionsList } from "./pages/app/requisitions/_index";
import { ServiceOrders } from "./pages/app/servicesOrders/_index";
import { PartsOrders } from "./pages/app/partsOrders/_index";
import { OrdersContextProvider } from "./contexts/activeOrdersContext";
import { RequisitionsContextProvider } from "./contexts/requisitionsContex";
import { ArchivedOrdersContextProvider } from "./contexts/archivedOrdersContext";
import { ArchivedOrdersList } from "./pages/app/partsOrders/archivedList";
import { Products } from "./pages/app/products/_index";
import { ProductsContextProvider } from "./contexts/productsContext";
//import { CardWithForm } from "./pages/app/products/card";

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
    path: "/products",
    element: (
      <ProductsContextProvider>
        <Products />
      </ProductsContextProvider>
    ),
  },
]);
