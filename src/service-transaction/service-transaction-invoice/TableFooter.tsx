import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

interface TableFooterPropType {
  transactionDetails: { itemName: string; solution: string; price: number }[];
}

const TableFooter: React.FC<TableFooterPropType> = ({
  transactionDetails = [],
}) => {
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      borderBottom: 1,
      borderRight: 1,
      borderLeft: 1,
      borderColor: "black",
      backgroundColor: "#E4E4E4",
      textAlign: "center",
    },
    total: {
      width: "70%",
      padding: "4px",
      borderRight: 1,
      borderColor: "black",
    },
    price: {
      width: "30%",
      padding: "4px",
    },
  });

  const sum = transactionDetails.reduce(
    (tempSum, transactionDetail) => tempSum + transactionDetail.price,
    0
  );

  return (
    <View style={styles.header}>
      <Text style={styles.total}>Total</Text>
      <Text style={styles.price}>
        {new Intl.NumberFormat("En-ID", {
          style: "currency",
          currency: "IDR",
          currencyDisplay: "symbol",
        }).format(sum)}
      </Text>
    </View>
  );
};

export default TableFooter;
