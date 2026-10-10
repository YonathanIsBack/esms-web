import { Container } from "@chakra-ui/react";
import { PDFViewer } from "@react-pdf/renderer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Constant from "../../constant/Constant";
import InvoiceDocument, {
  InvoiceTransactionDto,
} from "./InvoiceDocument";

interface ServiceTransactionInvoicePropType {}

const defaultTransaction: InvoiceTransactionDto = {
  customerName: "",
  customerPhone: "",
  transactionDate: "",
  transactionCode: "",
  transactionDetails: [],
};

const ServiceTransactionInvoice: React.FC<
  ServiceTransactionInvoicePropType
> = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] =
    useState<InvoiceTransactionDto>(defaultTransaction);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${Constant.coreUrl}/service-transaction/` + transactionId)
      .then((response) => {
        const { data } = response.data;
        const transaction: InvoiceTransactionDto = {
          customerName: data.customer_name,
          customerPhone: data.customer_phone,
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
        <InvoiceDocument transaction={transaction} />
      </PDFViewer>
    </Container>
  );
};

export default ServiceTransactionInvoice;
