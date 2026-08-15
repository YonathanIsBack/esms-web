import { Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import ServiceTransactionTable from "./ServiceTransactionTable";
import Constant from "../constant/Constant";
import apiClient from "../util/apiClient";

const ServiceTransactionPage = () => {
  const [serviceTransactions, setServiceTransaction] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    apiClient.get(`${Constant.coreUrl}/service-transaction`).then((response) => {
      const { data } = response.data;
      setServiceTransaction(data);
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Heading color="var(--color-primary)" fontSize="2xl">
          Service Transactions List
        </Heading>
        <Link to="/service-transaction/form">
          <Button
            backgroundColor="var(--color-accent)"
            color="white"
            _hover={{ backgroundColor: "var(--color-accent-hover)" }}
            border="none"
          >
            Add Transaction
          </Button>
        </Link>
      </div>
      <ServiceTransactionTable serviceTransactions={serviceTransactions} />
    </div>
  );
};

export default ServiceTransactionPage;
