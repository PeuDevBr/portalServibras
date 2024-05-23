import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/app/home";
import { HomeLayout } from "./pages/_layouts/homeLayout";
import { OrderLayout } from "./pages/_layouts/orderLayout";
import { RequisitionsList } from "./pages/app/requisitions/_index";
import { ServiceOrders } from "./pages/app/servicesOrders/_index";
import { ActiveOrdersList } from "./pages/app/orders/activeOrders/_index";
import { OrdersContextProvider } from "./contexts/activeOrdersContext";
import { RequisitionsContextProvider } from "./contexts/requisitionsContex";
import { ArchivedOrdersContextProvider } from "./contexts/archivedOrdersContext";
import { ArchivedOrdersList } from "./pages/app/orders/archivedList";
import { Products } from "./pages/app/products/_index";
import { ProductsContextProvider } from "./contexts/productsContext";
import { UpdateProduct } from "./pages/app/products/updateProduct/[code]";
import { CreateProduct } from "./pages/app/products/createProduct/_index";
import { Product } from "./pages/app/products/product/[code]";
import { ActiveOrder } from "./pages/app/orders/activeOrders/[id]";
import { ProductCatalog } from "./pages/app/products/productCatalog";
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
            <ActiveOrdersList />
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
        path: "/order/:id",
        element: (
          <OrdersContextProvider>
            <ActiveOrder />
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
  {
    path: "/productCatalog",
    element: (
      <ProductsContextProvider>
        <ProductCatalog />
      </ProductsContextProvider>
    ),
  },

  {
    path: "/product/:code",
    element: (
      <ProductsContextProvider>
        <Product />
      </ProductsContextProvider>
    ),
  },

  {
    path: "/updateProduct/:code",
    element: (
      <ProductsContextProvider>
        <UpdateProduct />
      </ProductsContextProvider>
    ),
  },
  {
    path: "/addProduct",
    element: (
      <ProductsContextProvider>
        <CreateProduct />
      </ProductsContextProvider>
    ),
  },
]);
