import {
  CubeIcon,
  CubeTransparentIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { Link, NavLink } from "@remix-run/react";
import { classNames } from "~/helpers/ui-helper";

const basicNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Products", href: "/products", icon: CubeIcon },
  { name: "Customers", href: "/customers", icon: UserGroupIcon },
];

const secondaryNavigation = [
  { name: "Employees", href: "/employees", icon: UserGroupIcon },
  {
    name: "Active Products",
    href: "/activeProducts",
    icon: CubeTransparentIcon,
  },
];

type SidebarProps = {
  firstName: string;
  lastName: string;
  role: "ADMIN" | "WORKER";
};

export function Sidebar({ firstName, lastName, role }: SidebarProps) {
  return (
    <>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col flex-grow border-r border-gray-200 pt-1 pb-4 bg-white overflow-y-auto">
        <div className="flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-8 bg-white" aria-label="Sidebar">
            <div className="space-y-1">
              {basicNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => {
                    return classNames(
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    );
                  }}
                >
                  <item.icon
                    className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
              {role === "ADMIN" &&
                secondaryNavigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => {
                      return classNames(
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      );
                    }}
                  >
                    <item.icon
                      className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
            </div>
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-300">
          <Link to="/employees/me" className="flex-shrink-0 w-full group block">
            <div className="pt-4 pb-2 flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600 hover:text-gray-900">{`${firstName} ${lastName}`}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
