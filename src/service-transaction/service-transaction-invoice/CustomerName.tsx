import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

interface CustomerNamePropType {
  customerName: string;
}
const CustomerName: React.FC<CustomerNamePropType> = ({
  customerName,
}) => {
  const styles = StyleSheet.create({
    customerName: {
      marginTop: "10px",
      marginBottom: "10px",
    },
  });
  return (
    <View style={styles.customerName}>
      <Text>Customer Name:</Text>
      <Text>{customerName}</Text>
    </View>
  );
};

export default CustomerName;
