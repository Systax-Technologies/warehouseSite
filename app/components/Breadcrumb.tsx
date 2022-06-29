import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

type BreadcrumbProps = React.PropsWithChildren<{}>;

export function Breadcrumb({ children }: BreadcrumbProps) {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="/dashboard" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </div>
        </li>
        {children}
      </ol>
    </nav>
  );
}

type ItemProps = {
  name: string;
  href: string;
};

function Item({ name, href }: ItemProps) {
  return (
    <li key={name}>
      <div className="flex items-center">
        <ChevronRightIcon
          className="flex-shrink-0 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <Link
          to={href}
          className="ml-4 text-sm font-semibold text-gray-500 hover:text-gray-700"
        >
          {name}
        </Link>
      </div>
    </li>
  );
}

Breadcrumb.Item = Item;
