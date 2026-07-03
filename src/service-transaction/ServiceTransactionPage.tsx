import { Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ServiceTransactionTable from "./ServiceTransactionTable";
import Constant from "../constant/Constant";

const ServiceTransactionPage = () => {
  const [serviceTransactions, setServiceTransaction] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${Constant.coreUrl}/service-transaction`).then((response) => {
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
        <a href="/service-transaction/form">
          <Button
            backgroundColor="var(--color-accent)"
            color="white"
            _hover={{ backgroundColor: "var(--color-accent-hover)" }}
            border="none"
          >
            Add Transaction
          </Button>
        </a>
      </div>
      <ServiceTransactionTable serviceTransactions={serviceTransactions} />
    </div>
  );
};

export default ServiceTransactionPage;
