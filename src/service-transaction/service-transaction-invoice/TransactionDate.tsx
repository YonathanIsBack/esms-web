import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

interface TransactionDatePropType {
  transactionDate: string;
}

const TransactionDate: React.FC<TransactionDatePropType> = ({
  transactionDate,
}) => {
  const styles = StyleSheet.create({
    transactionDateSection: {
      marginTop: "10px",
      marginBottom: "10px",
    },
  });
  return (
    <View style={styles.transactionDateSection}>
      <Text>Transaction Date:</Text>
      <Text>{transactionDate}</Text>
    </View>
  );
};

export default TransactionDate;
