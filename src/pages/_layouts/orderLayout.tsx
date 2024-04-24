import { Outlet } from "react-router-dom";

export function OrderLayout() {
  return (
    <div>
      <h1>Home Layout</h1>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
