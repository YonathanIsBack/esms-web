import { Button, Stack, Table } from "@chakra-ui/react";

const ServiceTransactionTable: React.FC<ServiceTransactionTablePropType> = ({
  serviceTransactions,
}) => {
  return (
    <div className="table-container">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              textAlign="center"
              color="white"
              backgroundColor="var(--color-secondary)"
              padding="12px"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              No
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              color="white"
              backgroundColor="var(--color-secondary)"
              padding="12px"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              UID
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              color="white"
              backgroundColor="var(--color-secondary)"
              padding="12px"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Customer Name
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              color="white"
              backgroundColor="var(--color-secondary)"
              padding="12px"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Transaction Date
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              color="white"
              backgroundColor="var(--color-secondary)"
              padding="12px"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Action
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {serviceTransactions.map((serviceTransaction, index) => (
            <Table.Row
              backgroundColor={index % 2 === 0 ? "white" : "#F8FAFC"}
              _hover={{ backgroundColor: "var(--color-accent-light)" }}
            >
              <Table.Cell padding="12px" borderBottom="1px solid" borderColor="var(--color-border)">{index + 1}</Table.Cell>
              <Table.Cell padding="12px" borderBottom="1px solid" borderColor="var(--color-border)">{serviceTransaction.id}</Table.Cell>
              <Table.Cell padding="12px" borderBottom="1px solid" borderColor="var(--color-border)">{serviceTransaction.customerName}</Table.Cell>
              <Table.Cell textAlign="end" padding="12px" borderBottom="1px solid" borderColor="var(--color-border)">
                {serviceTransaction.transactionDate}
              </Table.Cell>
              <Table.Cell textAlign="end" padding="12px" borderBottom="1px solid" borderColor="var(--color-border)">
                <Stack direction="row" gap="2">
                  <a href={`/service-transaction/${serviceTransaction.id}`}>
                    <Button
                      backgroundColor="var(--color-accent)"
                      color="white"
                      _hover={{ backgroundColor: "var(--color-accent-hover)" }}
                      size="sm"
                      border="none"
                    >
                      Detail
                    </Button>
                  </a>
                  <a target="blank" href={`/service-transaction/${serviceTransaction.id}/invoice`}>
                    <Button
                      backgroundColor="var(--color-secondary)"
                      color="white"
                      _hover={{ backgroundColor: "var(--color-primary)" }}
                      size="sm"
                      border="none"
                    >
                      Generate PDF
                    </Button>
                  </a>
                </Stack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
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
