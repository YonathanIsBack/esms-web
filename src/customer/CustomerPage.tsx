import { Button, Container, Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomerTable from "./CustomerTable";
import Constant from "../constant/Constant";

const CustomerPage = () => {
  const [customers, setCustomer] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${Constant.coreUrl}/customer`).then((response) => {
      const { data: customers } = response.data;
      setCustomer(customers);
    });
  };

  return (
    <Stack>
      <Heading textAlign="center">Customer List</Heading>
      <Stack direction="row">
        <Button>
          <a href="/customer/form">Add</a>
        </Button>
      </Stack>
      <CustomerTable customers={customers} />
    </Stack>
  );
};

export default CustomerPage;
