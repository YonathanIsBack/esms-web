import ButtonLink from "../common/ButtonLink";
import { Button, Stack, Table } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

const CustomerTable: React.FC<CustomerListPropType> = ({ customers }) => {
  const navigate = useNavigate();

  const deleteUser = (customerId: number) => {
    axios
      .delete(`http://localhost:3000/customer/${customerId}`)
      .then((response) => {
        window.location.reload();
      });
  };

  return (
    <>
      <Stack width="100%">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader textAlign="center">
                Customer Name
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Customer Phone
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Customer Address
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Action</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {customers.map((customer) => (
              <Table.Row>
                <Table.Cell>{customer.customerName}</Table.Cell>
                <Table.Cell>{customer.customerPhone}</Table.Cell>
                <Table.Cell>{customer.customerAddress}</Table.Cell>
                <Table.Cell >
                  <ButtonLink url={`customer/${customer.customerName}?action=VIEW`} label="Detail"/>
                  <ButtonLink url={`customer/${customer.customerName}?action=EDIT`} label="Edit"/>
                  <Button onClick={() => deleteUser(customer.id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
    </>
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
