import { ThemeToggle } from "@/components/theme/theme-toggle";
import { AirVent, Heater, Refrigerator, WashingMachine } from "lucide-react";
import { Outlet } from "react-router-dom";

export function HomeLayout() {
  return (
    <div>
      <div className="px-8 mt-4 flex justify-between ">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="flex flex-col gap-1">
              <AirVent className="h-5 w-5" />
              <Heater className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-1">
              <Refrigerator className="h-5 w-5" />
              <WashingMachine className="h-5 w-5" />
            </div>
          </div>

          <div className="text-5xl font-semibold antialiased">Servibras</div>
        </div>

        <ThemeToggle />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}