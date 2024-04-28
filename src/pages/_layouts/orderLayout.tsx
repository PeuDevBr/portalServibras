import { Button } from "@/components/ui/button";
import { CornerDownLeft } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export function OrderLayout() {
  return (
    <div>
      <div className="flex justify-between p-4">
        <h1>Order Layout</h1>

        <Button variant={"ghost"} size={"sm"} asChild>
          <Link to={"/"}>
            <CornerDownLeft className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="flex justify-center pt-12">
        <Outlet />
      </div>
    </div>
  );
}
