import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Unauthorized from "./../pages/Unauthorized/Unauthorized";
import NotFound from "../pages/NotFound/NotFound";
// import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserManagement from "../pages/UserManagement/UserManagement";
import AstrologerManagement from "../pages/AstrologerManagement/AstrologerManagement";
import TransactionsAndPayments from "../pages/TransactionsAndPayments/TransactionsAndPayments";
import SubscriptionPlan from "../pages/SubscriptionPlan/SubscriptionPlan";
import UserDetails from "../pages/UserDetails/UserDetails";
import AstrologerDetails from "../pages/AstrologerDetails/AstrologerDetails";
import Products from "../pages/Products/Products";
import Puja from "../pages/Puja/Puja";
import PujaDetails from "../pages/Puja/PujaDetails";
import ProductDetails from "../pages/Products/ProductDetails";
import ProductOrders from "../pages/ProductOrders/ProductOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "dashboard",
    // element: <ProtectedRoute><Layout /></ProtectedRoute>,
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
      {
        path: "user/:id",
        element: <UserDetails />,
      },
      {
        path: "astrologer-management",
        element: <AstrologerManagement />,
      },
      {
        path: "astrologer/:id",
        element: <AstrologerDetails />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "puja",
        element: <Puja />,
      },
      {
        path: "puja/:id",
        element: <PujaDetails />,
      },
      {
        path: "transactions-payments",
        element: <TransactionsAndPayments />,
      },
      {
        path: "subscription-plan",
        element: <SubscriptionPlan />,
      },
      {
        path: "product-orders",
        element: <ProductOrders />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
