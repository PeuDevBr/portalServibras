import { Outlet } from "react-router-dom";

export function OrderLayout() {
  return (
    <div>
      <h1>Order Layout</h1>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
