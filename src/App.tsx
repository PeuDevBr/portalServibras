import { RouterProvider } from "react-router-dom";
import "./global.css";
import { router } from "./routes";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import { RequisitionsContextProvider } from "./contexts/RequisitionsContex";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="portalServibras-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | Portal Servibras" />
        <Toaster richColors />
        <RequisitionsContextProvider>
          <RouterProvider router={router} />
        </RequisitionsContextProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
