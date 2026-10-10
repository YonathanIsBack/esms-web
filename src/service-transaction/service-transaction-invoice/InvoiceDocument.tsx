import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import formatCurrency from "../../util/formatCurrency";

export interface InvoiceTransactionDto {
  customerName: string;
  customerPhone: string;
  transactionDate: string;
  transactionCode: string;
  transactionDetails: {
    itemName: string;
    solution: string;
    price: number;
  }[];
}

interface InvoiceDocumentPropType {
  transaction: InvoiceTransactionDto;
}

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  brand: {
    fontSize: 13,
    fontWeight: "bold",
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 3,
  },
  rule: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#111827",
    marginTop: 12,
    marginBottom: 28,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  metaRight: {
    alignItems: "flex-end",
  },
  metaLabel: {
    fontSize: 8,
    color: "#6B7280",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  customerName: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
  },
  mutedText: {
    fontSize: 10,
    color: "#4B5563",
  },
  metaValue: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 8,
    color: "#6B7280",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#111827",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tableHeaderText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 9,
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableRowAlt: {
    backgroundColor: "#F9FAFB",
  },
  colItem: {
    width: "40%",
  },
  colSolution: {
    width: "40%",
  },
  colPrice: {
    width: "20%",
    textAlign: "right",
  },
  cell: {
    fontSize: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 18,
  },
  totalLabel: {
    fontSize: 9,
    color: "#6B7280",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginRight: 20,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footerRule: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    marginTop: 48,
    paddingTop: 16,
  },
  footerNote: {
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 4,
  },
  signature: {
    marginTop: 40,
    textAlign: "right",
  },
  signatureLabel: {
    fontSize: 9,
    color: "#6B7280",
  },
  signatureName: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 4,
  },
});

const InvoiceDocument: React.FC<InvoiceDocumentPropType> = ({
  transaction,
}) => {
  const totalPrice = transaction.transactionDetails.reduce(
    (tempSum, transactionDetail) => tempSum + transactionDetail.price,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.brandRow}>
          <Text style={styles.brand}>Yonathan Co.</Text>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
        </View>
        <View style={styles.rule} />

        <View style={styles.metaRow}>
          <View>
            <Text style={styles.metaLabel}>Billed To</Text>
            <Text style={styles.customerName}>{transaction.customerName}</Text>
            <Text style={styles.mutedText}>{transaction.customerPhone}</Text>
          </View>
          <View style={styles.metaRight}>
            <Text style={styles.metaLabel}>Transaction UID</Text>
            <Text style={styles.metaValue}>{transaction.transactionCode}</Text>
            <Text style={styles.metaLabel}>Transaction Date</Text>
            <Text style={styles.metaValue}>{transaction.transactionDate}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Item Details</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colItem]}>
            Item Name
          </Text>
          <Text style={[styles.tableHeaderText, styles.colSolution]}>
            Solution
          </Text>
          <Text style={[styles.tableHeaderText, styles.colPrice]}>
            Price
          </Text>
        </View>
        {transaction.transactionDetails?.map((transactionDetail, idx) => (
          <View
            key={idx}
            style={
              idx % 2 === 1
                ? [styles.tableRow, styles.tableRowAlt]
                : styles.tableRow
            }
          >
            <Text style={[styles.cell, styles.colItem]}>
              {transactionDetail.itemName}
            </Text>
            <Text style={[styles.cell, styles.colSolution]}>
              {transactionDetail.solution}
            </Text>
            <Text style={[styles.cell, styles.colPrice]}>
              {transactionDetail.price === 0
                ? "FREE"
                : formatCurrency(transactionDetail.price)}
            </Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{formatCurrency(totalPrice)}</Text>
        </View>

        <View style={styles.footerRule}>
          <Text style={styles.footerNote}>
            Thank you for using our services.
          </Text>
          <Text style={styles.footerNote}>Best regards,</Text>
          <View style={styles.signature}>
            <Text style={styles.signatureLabel}>Signed by</Text>
            <Text style={styles.signatureName}>Yonathan</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
