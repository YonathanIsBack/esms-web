import { Container, Stack } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import "./App.css";
import SidebarMenu from "./common/SidebarMenu";
import CustomerFormPage from "./customer/CustomerFormPage";
import CustomerPage from "./customer/CustomerPage";
import ServiceTransactionDetailPage from "./service-transaction/ServiceTransactionDetailPage";
import ServiceTransactionFormPage from "./service-transaction/ServiceTransactionFormPage";
import ServiceTransactionPage from "./service-transaction/ServiceTransactionPage";
import ServiceTransactionInvoice from "./service-transaction/service-transaction-invoice/ServiceTransactionInvoice";

function App() {
  return (
    <>
      <Stack>
        <Container>
          <SidebarMenu />
          <Routes>
            <Route path="/" element={<CustomerPage />} />
            <Route path="/customer/form" element={<CustomerFormPage />} />
            <Route path="/customer/:customerName" element={<CustomerFormPage />} />
            <Route
              path="/service-transaction"
              element={<ServiceTransactionPage />}
            />
            <Route
              path="/service-transaction/form"
              element={<ServiceTransactionFormPage />}
            />
            <Route
              path="/service-transaction/:transactionId/invoice"
              element={<ServiceTransactionInvoice />}
            />
            <Route
              path="/service-transaction/:transactionId"
              element={<ServiceTransactionDetailPage />}
            />
          </Routes>
        </Container>
      </Stack>
    </>
  );
}

export default App;
