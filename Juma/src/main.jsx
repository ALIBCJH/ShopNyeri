import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App.jsx";
import Homescreen from "./Screens/Homescreen";
import ProductScreen from "./Screens/ProductScreen";
import { Provider } from "react-redux";
import store from "./store.js";

// Create a browser router with routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} element={<Homescreen />} />
        <Route path="product/:id" element={<ProductScreen />} />
      </Route>
    </>
  )
);

// Render the app with RouterProvider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
