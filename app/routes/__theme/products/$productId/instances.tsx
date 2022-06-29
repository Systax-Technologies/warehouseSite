import { Breadcrumb } from "~/components/Breadcrumb";

export default function ProductInstances() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Breadcrumb>
        <Breadcrumb.Item name={"Products"} href={"/products"} />
      </Breadcrumb>
      Instances!
    </div>
  );
}
