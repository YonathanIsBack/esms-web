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
    <>
      <Heading>Service Transactions List</Heading>
      <a href="/service-transaction/form">
        <Button>Add</Button>
      </a>
      <ServiceTransactionTable serviceTransactions={serviceTransactions} />
    </>
  );
};

export default ServiceTransactionPage;
