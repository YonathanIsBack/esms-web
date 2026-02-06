import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

interface TransactionInformationSectionPropType {
  transactionCode: string;
}

const TransactionInformationSection: React.FC<
  TransactionInformationSectionPropType
> = ({ transactionCode }) => {
  const styles = StyleSheet.create({
    transactionInformationSection: {
      marginTop: "10px",
      marginBottom: "10px",
    },
  });
  return (
    <View style={styles.transactionInformationSection}>
      <Text>Transaction UID:</Text>
      <Text>{transactionCode}</Text>
    </View>
  );
};

export default TransactionInformationSection;
