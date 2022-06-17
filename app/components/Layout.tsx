import { Outlet } from "@remix-run/react";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div>
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
              <Outlet />
        </main>
      </div>
    </div>
  );
}
