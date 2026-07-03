import ButtonLink from "../common/ButtonLink";
import { Button, Stack, Table } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import Constant from "../constant/Constant";

const CustomerTable: React.FC<CustomerListPropType> = ({ customers }) => {
  const deleteUser = (customerId: number) => {
    axios
      .delete(`${Constant.coreUrl}/customer/${customerId}`)
      .then((response) => {
        window.location.reload();
      });
  };

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
              Customer Phone
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
              Customer Address
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
          {customers.map((customer, idx) => (
            <Table.Row
              backgroundColor={idx % 2 === 0 ? "white" : "#F8FAFC"}
              _hover={{ backgroundColor: "var(--color-accent-light)" }}
            >
              <Table.Cell padding="12px" borderBottom="1px solid" borderColor="var(--color-border)">{customer.customerName}</Table.Cell>
              <Table.Cell padding="12px" borderBottom="1px solid" borderColor="var(--color-border)">{customer.customerPhone}</Table.Cell>
              <Table.Cell padding="12px" borderBottom="1px solid" borderColor="var(--color-border)">{customer.customerAddress}</Table.Cell>
              <Table.Cell padding="12px" borderBottom="1px solid" borderColor="var(--color-border)">
                <Stack direction="row" gap="2">
                  <ButtonLink url={`customer/${customer.customerName}?action=VIEW`} label="Detail"/>
                  <ButtonLink url={`customer/${customer.customerName}?action=EDIT`} label="Edit"/>
                  <Button
                    backgroundColor="var(--color-danger)"
                    color="white"
                    _hover={{ backgroundColor: "var(--color-danger-hover)" }}
                    size="sm"
                    border="none"
                    onClick={() => deleteUser(customer.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

interface CustomerListPropType {
  customers: {
    id: number;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
  }[];
}

export default CustomerTable;
