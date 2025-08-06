import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthContextProvider from "./contexts/authContext/Provider.tsx";
import { HeadingProvider } from "./contexts/headingContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <HeadingProvider>
        <App />
      </HeadingProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
