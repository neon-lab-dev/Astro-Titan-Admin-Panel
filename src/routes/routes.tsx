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
        path: "transactions-payments",
        element: <TransactionsAndPayments />,
      },
      {
        path: "subscription-plan",
        element: <SubscriptionPlan />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
