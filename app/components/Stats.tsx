type StatsProps = React.PropsWithChildren<{}>;

export function Stats({ children }: StatsProps) {
  return (
    <div>
      <dl className="py-4 gap-3 flex">{children}</dl>
    </div>
  );
}

type ItemProps = React.PropsWithChildren<{}>;

export function Item({ children }: ItemProps) {
  return (
    <>
      <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 flex-1">
        {children}
      </div>
    </>
  );
}

Stats.Item = Item;
