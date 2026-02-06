import {
  Button,
  Container,
  Field,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router";

interface FormValues {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

const defaultCustomer = {
  customerName: "",
  customerPhone: "",
  customerAddress: "",
};

const CustomerFormPage: React.FC<CustomerFormPagePropType> = () => {
  const { customerName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [action, setAction] = useState(searchParams.get("action") || "VIEW");

  const actions = ["VIEW", "ADD", "EDIT"];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormValues>();

  useEffect(() => {
    if(customerName == null) {
      setAction("ADD");
      setSearchParams({ action: "ADD" });
      return;
    }

    if (!actions.includes(action)) {
      setAction("VIEW");
      setSearchParams({ action: "VIEW" });
    }

    axios
      .get(`http://localhost:3000/customer/${customerName}`)
      .then((response) => {
        const { data } = response.data;
        setSearchParams({ action: "EDIT" });
        setValue('id', data.id);
        setValue('customerName', data.customerName);
        setValue('customerPhone', data.customerPhone);
        setValue('customerAddress', data.customerAddress);
      });
  }, []);

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    if(action === "ADD") {
      axios
      .post("http://localhost:3000/customer", {
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        customer_address: data.customerAddress,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
      return;
    }

    axios
      .put(`http://localhost:3000/customer/${data.id}`, {
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        customer_address: data.customerAddress,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <Container centerContent>
      <Heading>Add new Customer</Heading>
      <form onSubmit={onSubmit} className="form">
        <Stack gap="4">
          <Field.Root>
            <Field.Label>Customer Name</Field.Label>
            <Input
              {...register("customerName")}
              disabled={action === "VIEW"}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Customer Phone Number</Field.Label>
            <Input
              {...register("customerPhone")}
              disabled={action === "VIEW"}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Customer Address</Field.Label>
            <Input
              {...register("customerAddress")}
              disabled={action === "VIEW"}
            />
          </Field.Root>
          {action === "VIEW" ? "" : <Button type="submit">Submit</Button>}
        </Stack>
      </form>
    </Container>
  );
};

interface CustomerFormPagePropType {
  action: string;
  user: object;
}

export default CustomerFormPage;
