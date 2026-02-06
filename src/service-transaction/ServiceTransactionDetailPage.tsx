import {
  HStack,
  Heading,
  Separator,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import formatCurrency from "../util/formatCurrency";

interface ServiceTransaction {
  customerName: string;
  customerPhone: string;
  transactionDate: string;
  transactionCode: string;
  totalPrice: string;
  transactionDtls: TransactionDetail[];
}

interface TransactionDetail {
  itemName: string;
  solution: string;
  price: number;
}

interface TransactionDetailResponse {
  item_name: string;
  solution: string;
  price: number;
}

const defaultServiceTransaction = {
  customerName: "",
  customerPhone: "",
  transactionDate: "",
  transactionCode: "",
  totalPrice: "",
  transactionDtls: [],
};

const ServiceTransactionDetailPage = () => {
  const { transactionId } = useParams();
  const [serviceTransaction, setServiceTransaction] =
    useState<ServiceTransaction>(defaultServiceTransaction);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/service-transaction/" + transactionId)
      .then((response) => {
        const { data } = response.data;
        const transaction = {
          transactionCode: data.transaction_code,
          customerName: data.customer_name,
          customerPhone: data.customer_phone,
          transactionDate: data.transaction_date,
          totalPrice: data.total_price,
          transactionDtls: data.transaction_dtls.map(
            (transaction_dtl: TransactionDetailResponse) => ({
              itemName: transaction_dtl.item_name,
              solution: transaction_dtl.solution,
              price: transaction_dtl.price,
            })
          ),
        };
        setServiceTransaction(transaction);
      });
  };

  return (
    <>
      <Heading>Service Transactions Detail</Heading>
      <Separator marginBottom="50px" />
      <Stack marginBottom="50px">
        <Heading>Customer Information</Heading>
        <Separator />
        <Text>Name</Text>
        <Text>{serviceTransaction.customerName}</Text>
        <Text>Phone Number</Text>
        <Text>{serviceTransaction.customerPhone}</Text>
      </Stack>

      <Stack marginBottom="50px">
        <Heading>Transaction Information</Heading>
        <Separator />
        <HStack w="full" justifyContent="space-evenly">
          <Stack>
            <Text>Transaction Date</Text>
            <Text>{serviceTransaction.transactionDate}</Text>
          </Stack>
          <Stack>
            <Text>Transaction UID</Text>
            <Text>{serviceTransaction.transactionCode}</Text>
          </Stack>
          <Stack>
            <Text>Total Price</Text>
            <Text>{formatCurrency(serviceTransaction.totalPrice)}</Text>
          </Stack>
        </HStack>
      </Stack>

      <Stack marginBottom="50px">
        <Heading>Item Details</Heading>
        <Separator />
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Item Name</Table.ColumnHeader>
              <Table.ColumnHeader>Solution</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {serviceTransaction.transactionDtls?.map((transactionDtl) => (
              <Table.Row>
                <Table.Cell>{transactionDtl.itemName}</Table.Cell>
                <Table.Cell>{transactionDtl.solution}</Table.Cell>
                <Table.Cell>{formatCurrency(transactionDtl.price)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
    </>
  );
};

export default ServiceTransactionDetailPage;
