import { StyleSheet, Text, View } from "@react-pdf/renderer";

const InvoiceFooter = () => {
  const styles = StyleSheet.create({
    invoiceFooter: {
      marginTop: "50px",
      marginBottom: "5px",
    },
    signature: {
      marginTop: "125px",
      textAlign: "right",
    },
  });
  return (
    <>
      <View style={styles.invoiceFooter}>
        <Text>Thank you for using our services.</Text>
        <Text>Best Regards.</Text>
      </View>
      <View style={styles.signature}>
        <Text>Signed Here.</Text>
        <Text>Yonathan</Text>
      </View>
    </>
  );
};

export default InvoiceFooter;
