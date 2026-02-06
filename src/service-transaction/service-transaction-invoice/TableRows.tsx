import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface TableRowsPropType {
  transactionDetail: {
    itemName: string;
    solution: string;
    price: number;
  };
}

const TableRows: React.FC<TableRowsPropType> = ({ transactionDetail }) => {
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
      <Text style={styles.qty}>1x</Text>
      <Text style={styles.itemName}>{transactionDetail.itemName}</Text>
      <Text style={styles.description}>{transactionDetail.solution}</Text>
      <Text style={styles.price}>
        {transactionDetail.price == 0
          ? "**FREE**"
          : new Intl.NumberFormat("En-ID", {
              style: "currency",
              currency: "IDR",
              currencyDisplay: "symbol",
            }).format(transactionDetail.price)}
      </Text>
    </View>
  );
};

export default TableRows;
