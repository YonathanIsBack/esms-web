import { Container } from "@chakra-ui/react";
import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CustomerName from "./CustomerName";
import InvoiceFooter from "./InvoiceFooter";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import TransactionDate from "./TransactionDate";
import TransactionInformationSection from "./TransactionInformationSection";
import Constant from "../../constant/Constant";

interface ServiceTransactionInvoicePropType {}

interface TransactionDto {
  customerName: string;
  transactionDate: string;
  transactionCode: string;
  transactionDetails: {
    itemName: string;
    solution: string;
    price: number;
  }[];
}

const defaultTransaction = {
  customerName: "",
  transactionDate: "",
  transactionCode: "",
  transactionDetails: [],
};

const ServiceTransactionInvoice: React.FC<
  ServiceTransactionInvoicePropType
> = () => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#E4E4E4",
      padding: "25px",
      lineHeight: "1.5",
    },
    header: {
      textAlign: "right",
    },
  });

  const { transactionId } = useParams();
  const [transaction, setTransaction] =
    useState<TransactionDto>(defaultTransaction);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${Constant.coreUrl}/service-transaction/` + transactionId)
      .then((response) => {
        const { data } = response.data;
        const transaction: TransactionDto = {
          customerName: data.customer_name,
          transactionDate: data.transaction_date,
          transactionCode: data.transaction_code,
          transactionDetails: data.transaction_dtls.map(
            (transaction_dtl: {
              item_name: string;
              solution: string;
              price: number;
            }) => ({
              itemName: transaction_dtl.item_name,
              solution: transaction_dtl.solution,
              price: transaction_dtl.price,
            })
          ),
        };
        setTransaction(transaction);
      });
  };

  return (
    <Container>
      <PDFViewer width="100%" height="550px">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text>Yonathan Co.</Text>
            </View>
            <CustomerName customerName={transaction.customerName} />
            <TransactionDate transactionDate={transaction.transactionDate} />
            <TransactionInformationSection
              transactionCode={transaction.transactionCode}
            />
            <View>
              <Text>Detail Item</Text>
              <TableHeader />
              {transaction.transactionDetails?.map((transactionDetail) => (
                <TableRows transactionDetail={transactionDetail} />
              ))}
              <TableFooter
                transactionDetails={transaction.transactionDetails}
              />
            </View>
            <InvoiceFooter />
          </Page>
        </Document>
      </PDFViewer>
    </Container>
  );
};

export default ServiceTransactionInvoice;
