import { CubeIcon, HomeIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/react/solid";
import { NavLink, Link } from "@remix-run/react";
import { classNames } from "~/helpers/ui-helper";


const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Products", href: "/products_sample", icon: CubeIcon },
  { name: "Users", href: "/users", icon: UserGroupIcon },
];

const foot = [ 
  { name: "Profile", href: "/profile", icon: UserCircleIcon },
]

const profileIcon = UserCircleIcon.prototype
export function Sidebar() {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-auto max-w-auto"
              src={"/assets/seren-up-logo.png"}
              alt="Seren-Up"
            />
          </div>
          <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
            {navigation.map((item) => (
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
          </nav>
        </div>
        <Link to="/profile" className="flex-shrink-0 w-full group block">
        <div className="flex items-center">
              <div  className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                  aria-hidden="true">

              {/*Insert the icon UserCircle here insteahead of the profile picture, ANDRE PLIS HELP*/}
              {profileIcon}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Tom Cook
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  View profile
                </p>
              </div>
            </div>
        </Link>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <a href="/profile" className="flex-shrink-0 w-full group block">

          </a>
        </div>
      </div>
    </div>
  );
}
