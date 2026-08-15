import { Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import CustomerTable from "./CustomerTable";
import Constant from "../constant/Constant";
import apiClient from "../util/apiClient";

const CustomerPage = () => {
  const [customers, setCustomer] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    apiClient.get(`${Constant.coreUrl}/customer`).then((response) => {
      const { data: customers } = response.data;
      setCustomer(customers);
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Heading color="var(--color-primary)" fontSize="2xl">
          Customer List
        </Heading>
        <Link to="/customer/form">
          <Button
            backgroundColor="var(--color-accent)"
            color="white"
            _hover={{ backgroundColor: "var(--color-accent-hover)" }}
            border="none"
          >
            Add Customer
          </Button>
        </Link>
      </div>
      <CustomerTable customers={customers} />
    </div>
  );
};

export default CustomerPage;
