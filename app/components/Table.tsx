import React from "react";

type TableProps = React.PropsWithChildren<{
  title?: string;
  description?: string;
  primaryAction?: JSX.Element;
}>;

export function Table({
  children,
  title,
  description,
  primaryAction,
}: TableProps) {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        {(title || description || primaryAction) && (
          <div className="sm:flex sm:items-center">
            {(title || primaryAction) && (
              <div className="sm:flex-auto">
                {title && (
                  <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                )}
                {description && (
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all the users in your account including their
                    name, title, email and role.
                  </p>
                )}
              </div>
            )}
            {primaryAction && (
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                {primaryAction}
              </div>
            )}
          </div>
        )}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  {children}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type TableHeaderProps = React.PropsWithChildren<{}>;

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <>
      <thead className="bg-gray-50">
        <tr>{children}</tr>
      </thead>
    </>
  );
}

type TableHeaderThProps = React.PropsWithChildren<{}>;

export function TableHeaderTh({ children }: TableHeaderThProps) {
  return (
    <>
      <th
        scope="col"
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
      >
        {children}
      </th>
    </>
  );
}

type TableBodyProps = React.PropsWithChildren<{}>;

export function TableBody({ children }: TableBodyProps) {
  return <tbody className="bg-white">{children}</tbody>;
}

type TableBodyRowProps = React.PropsWithChildren<{
  className: string;
}>;

export function TableBodyRow({ children, className }: TableBodyRowProps) {
  return <tr className={className}>{children}</tr>;
}

// type TableType = typeof Table & {
//   Header: typeof TableHeader & {
//     Th: typeof TableHeaderTh;
//   };
//   Body: typeof TableBody & {
//     Row: typeof TableBodyRow;
//   };
// };
