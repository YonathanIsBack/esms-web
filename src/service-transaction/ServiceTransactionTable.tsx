import { Button, Stack, Table } from "@chakra-ui/react";

const ServiceTransactionTable: React.FC<ServiceTransactionTablePropType> = ({
  serviceTransactions,
}) => {
  return (
    <Stack width="100%">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textAlign="center">No</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">UID</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">
              Customer Name
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">
              Transaction Date
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {serviceTransactions.map((serviceTransaction, index) => (
            <Table.Row>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{serviceTransaction.id}</Table.Cell>
              <Table.Cell>{serviceTransaction.customerName}</Table.Cell>
              <Table.Cell textAlign="end">
                {serviceTransaction.transactionDate}
              </Table.Cell>
              <Table.Cell textAlign="end">
                <Stack direction="row" >
                  <a href={`/service-transaction/${serviceTransaction.id}`} >
                    <Button color="blue">Detail</Button>
                  </a>
                  <a target="blank" href={`/service-transaction/${serviceTransaction.id}/invoice`} >
                    <Button>Generate PDF</Button>
                  </a>
                  <a target="blank" href={`/service-transaction/${serviceTransaction.id}/print-text`} >
                    <Button>Copy Text</Button>
                  </a>
                </Stack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

interface ServiceTransactionTablePropType {
  serviceTransactions: {
    id: string;
    customerName: string;
    transactionDate: string;
  }[];
}

export default ServiceTransactionTable;
