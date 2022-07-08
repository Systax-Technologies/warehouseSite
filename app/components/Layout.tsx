import { Outlet } from "@remix-run/react";
import { Sidebar } from "./Sidebar";

type LayoutProps = {
  firstName: string;
  lastName: string;
  role: "ADMIN" | "WORKER";
};

export function Layout({ firstName, lastName, role }: LayoutProps) {
  return (
    <div>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <Sidebar firstName={firstName} lastName={lastName} role={role} />
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
