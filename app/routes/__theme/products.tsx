import { Table, TableHeaderTh } from "~/components/Table";

export default function Products() {
  return (
    <>
      <Table>
        <Table.Header>
          <TableHeaderTh>Id</TableHeaderTh>
          <TableHeaderTh>Model</TableHeaderTh>
          <TableHeaderTh>Description</TableHeaderTh>
          <TableHeaderTh>Color</TableHeaderTh>
          <TableHeaderTh>Status</TableHeaderTh>
        </Table.Header>
        <Table.Body></Table.Body>
      </Table>
    </>
  );
}
