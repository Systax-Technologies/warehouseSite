import { string } from "zod";

type TableProps = React.PropsWithChildren<{}>;

export function Table({ children }: TableProps) {
  return <>{children}</>;
}

type TableHeaderProps = {
  headers: string[];
};

export function TableHeader({ headers }: TableHeaderProps) {
  return (
    <>
      <thead>
        {headers.map((header) => (
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
            >
              {header}
            </th>
          </tr>
        ))}
      </thead>
    </>
  );
}

export function TableBody() {
  return (
    <>
      {/* content.map(content => (
        element.forEach((property) => {
            return(
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                        {content.property.value}
                    </td>
            )
        });
    )) */}
    </>
  );
}

Table.Body = TableBody;
Table.Header = TableHeader;
