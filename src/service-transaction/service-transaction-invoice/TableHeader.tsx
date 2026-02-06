import { Container } from "@chakra-ui/react";
import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const TableHeader = () => {
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#E4E4E4",
      textAlign: "center",
    },
    qty: {
      width: "10%",
      padding: "4px",
      borderRight: 1,
      borderColor: "black",
    },
    itemName: {
      width: "30%",
      padding: "4px",
      borderRight: 1,
      borderColor: "black",
    },
    description: {
      width: "30%",
      padding: "4px",
      borderRight: 1,
      borderColor: "black",
    },
    price: {
      width: "30%",
      padding: "4px",
    },
  });
  return (
    <View style={styles.header}>
      <Text style={styles.qty}>Qty</Text>
      <Text style={styles.itemName}>Item Name</Text>
      <Text style={styles.description}>Description</Text>
      <Text style={styles.price}>Price</Text>
    </View>
  );
};

export default TableHeader;
