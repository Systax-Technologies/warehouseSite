import {
  CubeIcon,
  CubeTransparentIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { NavLink } from "@remix-run/react";
import { classNames } from "~/helpers/ui-helper";

const basicNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Products", href: "/products", icon: CubeIcon },
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
  isAdmin: boolean;
};

export function Sidebar({ isAdmin }: SidebarProps) {
  return (
    <>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
            alt="Workflow"
          />
        </div>
        <div className="mt-5 flex-grow flex flex-col">
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
              {isAdmin &&
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
      </div>
    </>
  );
}
