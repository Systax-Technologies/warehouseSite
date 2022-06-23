import { Outlet } from "@remix-run/react";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="h-screen w-screen">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
      <main className="flex-1">
            <div className="">
              <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 bg-gradient-to-b from-white to-orange-200 h-screen">
                <Outlet/>
              </div>
            </div>
          </main>
      </div>
    </div>
  );
}
