import { Button } from "@/components/ui/button";
import { CornerDownLeft } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export function OrderLayout() {
  const { pathname } = useLocation();

  return (
    <div>
      <div className="flex justify-between p-4">
        <div>
          <div className="flex items-center gap-2">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="cursor-default px-8"
              asChild
            >
              <span className="text-xl">Pedidos:</span>
            </Button>
            {pathname === "/orders" ? (
              <Button variant={"secondary"} size={"sm"} asChild>
                <Link to={"/orders"}>Ativos</Link>
              </Button>
            ) : (
              <Button variant={"outline"} size={"sm"} asChild>
                <Link to={"/orders"}>Ativos</Link>
              </Button>
            )}

            {pathname === "/archivedOrders" ? (
              <Button variant={"secondary"} size={"sm"} asChild>
                <Link to={"/archivedOrders"}>Arquivados</Link>
              </Button>
            ) : (
              <Button variant={"outline"} size={"sm"} asChild>
                <Link to={"/archivedOrders"}>Arquivados</Link>
              </Button>
            )}
          </div>
        </div>

        <Button variant={"ghost"} size={"sm"} asChild>
          <Link to={"/"}>
            <CornerDownLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex justify-center pt-12">
        <Outlet />
      </div>
    </div>
  );
}
