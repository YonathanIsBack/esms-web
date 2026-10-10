import {
  Button,
  HStack,
  Heading,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useParams } from "react-router";
import formatCurrency from "../util/formatCurrency";
import Constant from "../constant/Constant";
import InvoiceDocument, {
  InvoiceTransactionDto,
} from "./service-transaction-invoice/InvoiceDocument";
import InvoiceReceipt from "./service-transaction-invoice/InvoiceReceipt";

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

const toInvoiceTransaction = (
  serviceTransaction: ServiceTransaction
): InvoiceTransactionDto => ({
  customerName: serviceTransaction.customerName,
  customerPhone: serviceTransaction.customerPhone,
  transactionDate: serviceTransaction.transactionDate,
  transactionCode: serviceTransaction.transactionCode,
  transactionDetails: serviceTransaction.transactionDtls,
});

const ServiceTransactionDetailPage = () => {
  const { transactionId } = useParams();
  const [serviceTransaction, setServiceTransaction] =
    useState<ServiceTransaction>(defaultServiceTransaction);
  const [copying, setCopying] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [receiptWidth, setReceiptWidth] = useState<80 | 58>(80);
  const [statusText, setStatusText] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${Constant.coreUrl}/service-transaction/` + transactionId)
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

  const copyPlainInvoice = () => {
    setCopying(true);
    setStatusText("");
    axios
      .get(
        `${Constant.coreUrl}/service-transaction/${transactionId}/invoice/plain`,
        { responseType: "text" }
      )
      .then((response) => navigator.clipboard.writeText(response.data))
      .then(() => setStatusText("Invoice copied to clipboard."))
      .catch(() => setStatusText("Failed to copy invoice."))
      .finally(() => setCopying(false));
  };

  const downloadInvoicePdf = () => {
    setDownloading(true);
    setStatusText("");
    const transaction = toInvoiceTransaction(serviceTransaction);
    pdf(<InvoiceDocument transaction={transaction} />)
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${transaction.transactionCode}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
        setStatusText("Invoice PDF downloaded.");
      })
      .catch(() => setStatusText("Failed to download invoice."))
      .finally(() => setDownloading(false));
  };

  const printReceipt = () => {
    setStatusText("");
    const transaction = toInvoiceTransaction(serviceTransaction);
    const printWindow = window.open(
      "",
      "_blank",
      "width=420,height=640,noopener=no"
    );
    if (!printWindow) {
      setStatusText("Failed to open print window. Allow popups for this site.");
      return;
    }
    const markup = renderToStaticMarkup(
      <InvoiceReceipt transaction={transaction} widthMm={receiptWidth} />
    );
    printWindow.document.write(
      `<!doctype html><html><head><title>invoice-${transaction.transactionCode}</title></head><body>${markup}</body></html>`
    );
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <div className="page-container">
      <Heading color="var(--color-primary)" fontSize="2xl" marginBottom="24px">
        Service Transaction Detail
      </Heading>

      <div className="detail-section">
        <Heading fontSize="lg" color="var(--color-secondary)" marginBottom="16px">
          Customer Information
        </Heading>
        <Stack gap="3">
          <Stack direction="row" gap="2">
            <Text fontWeight="bold" color="var(--color-text-muted)" minWidth="120px">Name</Text>
            <Text>{serviceTransaction.customerName}</Text>
          </Stack>
          <Stack direction="row" gap="2">
            <Text fontWeight="bold" color="var(--color-text-muted)" minWidth="120px">Phone Number</Text>
            <Text>{serviceTransaction.customerPhone}</Text>
          </Stack>
        </Stack>
      </div>

      <div className="detail-section">
        <Heading fontSize="lg" color="var(--color-secondary)" marginBottom="16px">
          Transaction Information
        </Heading>
        <HStack w="full" justifyContent="space-between" flexWrap="wrap" gap="4">
          <Stack>
            <Text fontWeight="bold" color="var(--color-text-muted)" fontSize="sm">Transaction Date</Text>
            <Text fontWeight="medium">{serviceTransaction.transactionDate}</Text>
          </Stack>
          <Stack>
            <Text fontWeight="bold" color="var(--color-text-muted)" fontSize="sm">Transaction UID</Text>
            <Text fontWeight="medium">{serviceTransaction.transactionCode}</Text>
          </Stack>
          <Stack>
            <Text fontWeight="bold" color="var(--color-text-muted)" fontSize="sm">Total Price</Text>
            <Text fontWeight="bold" fontSize="xl" color="var(--color-accent)">{formatCurrency(serviceTransaction.totalPrice)}</Text>
          </Stack>
        </HStack>
      </div>

      <div className="detail-section">
        <Heading fontSize="lg" color="var(--color-secondary)" marginBottom="16px">
          Item Details
        </Heading>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader
                color="white"
                backgroundColor="var(--color-secondary)"
                padding="12px"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Item Name
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="white"
                backgroundColor="var(--color-secondary)"
                padding="12px"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Solution
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="white"
                backgroundColor="var(--color-secondary)"
                padding="12px"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Price
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {serviceTransaction.transactionDtls?.map((transactionDtl, idx) => (
              <Table.Row
                backgroundColor={idx % 2 === 0 ? "white" : "#F8FAFC"}
                _hover={{ backgroundColor: "var(--color-accent-light)" }}
              >
                <Table.Cell padding="12px" borderBottom="1px solid" borderColor="var(--color-border)">{transactionDtl.itemName}</Table.Cell>
                <Table.Cell padding="12px" borderBottom="1px solid" borderColor="var(--color-border)">{transactionDtl.solution}</Table.Cell>
                <Table.Cell padding="12px" borderBottom="1px solid" borderColor="var(--color-border)" fontWeight="medium">{formatCurrency(transactionDtl.price)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      <div className="detail-section">
        <Heading fontSize="lg" color="var(--color-secondary)" marginBottom="16px">
          Operation
        </Heading>
        <HStack gap="3" flexWrap="wrap">
          <Button
            backgroundColor="var(--color-accent)"
            color="white"
            _hover={{ backgroundColor: "var(--color-accent-hover)" }}
            border="none"
            disabled={copying}
            onClick={copyPlainInvoice}
          >
            {copying ? "Generating..." : "Copy Invoice (Plain)"}
          </Button>
          <Button
            backgroundColor="var(--color-accent)"
            color="white"
            _hover={{ backgroundColor: "var(--color-accent-hover)" }}
            border="none"
            disabled={downloading}
            onClick={downloadInvoicePdf}
          >
            {downloading ? "Generating..." : "Download Invoice PDF"}
          </Button>
          <select
            value={receiptWidth}
            onChange={(event) =>
              setReceiptWidth(Number(event.target.value) as 80 | 58)
            }
            style={{
              height: "40px",
              padding: "0 12px",
              border: "1px solid var(--color-border)",
              borderRadius: "6px",
              backgroundColor: "white",
              color: "var(--color-text)",
              fontSize: "14px",
            }}
          >
            <option value={80}>80mm</option>
            <option value={58}>58mm</option>
          </select>
          <Button
            backgroundColor="var(--color-accent)"
            color="white"
            _hover={{ backgroundColor: "var(--color-accent-hover)" }}
            border="none"
            onClick={printReceipt}
          >
            Print Receipt
          </Button>
          <Text fontSize="sm" color="var(--color-text-muted)">
            {statusText}
          </Text>
        </HStack>
      </div>
    </div>
  );
};

export default ServiceTransactionDetailPage;
