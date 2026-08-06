import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Overview from "./pages/dashboard/Overview.jsx";
import Wallets from "./pages/dashboard/Wallets.jsx";
import Transactions from "./pages/dashboard/Transactions.jsx";
import ApiKeys from "./pages/dashboard/ApiKeys.jsx";
import Settings from "./pages/dashboard/Settings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Overview /> },
      { path: "wallets", element: <Wallets /> },
      { path: "transactions", element: <Transactions /> },
      { path: "api-keys", element: <ApiKeys /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
