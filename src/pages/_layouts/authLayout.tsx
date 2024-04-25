import { Outlet } from "react-router-dom";
import { Store } from "lucide-react"

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Store className="h-5 w-5" />
          <span className="font-semibold">Portal Servibras</span>
        </div>
        <footer>
          Painel de login &copy; Portal Servibras - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
