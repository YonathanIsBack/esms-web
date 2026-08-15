import {
  Button,
  Container,
  Field,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router";
import apiClient from "../util/apiClient";
import Constant from "../constant/Constant";

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

    apiClient
      .get(`${Constant.coreUrl}/customer/${customerName}`)
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
      apiClient
      .post(`${Constant.coreUrl}/customer`, {
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

    apiClient
      .put(`${Constant.coreUrl}/customer/${data.id}`, {
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
    <div className="page-container">
      <Heading color="var(--color-primary)" fontSize="2xl" marginBottom="24px">
        {action === "ADD" ? "Add New Customer" : action === "EDIT" ? "Edit Customer" : "Customer Details"}
      </Heading>
      <div className="form-card">
        <form onSubmit={onSubmit} className="form">
          <Stack gap="5">
            <Field.Root>
              <Field.Label color="var(--color-text)" fontWeight="medium">Customer Name</Field.Label>
              <Input
                {...register("customerName")}
                disabled={action === "VIEW"}
                borderColor="var(--color-border)"
                _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label color="var(--color-text)" fontWeight="medium">Customer Phone Number</Field.Label>
              <Input
                {...register("customerPhone")}
                disabled={action === "VIEW"}
                borderColor="var(--color-border)"
                _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label color="var(--color-text)" fontWeight="medium">Customer Address</Field.Label>
              <Input
                {...register("customerAddress")}
                disabled={action === "VIEW"}
                borderColor="var(--color-border)"
                _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
              />
            </Field.Root>
            {action === "VIEW" ? null : (
              <Button
                type="submit"
                backgroundColor="var(--color-accent)"
                color="white"
                _hover={{ backgroundColor: "var(--color-accent-hover)" }}
                border="none"
                width="fit-content"
              >
                {action === "ADD" ? "Add Customer" : "Update Customer"}
              </Button>
            )}
          </Stack>
        </form>
      </div>
    </div>
  );
};

interface CustomerFormPagePropType {
  action: string;
  user: object;
}

export default CustomerFormPage;
