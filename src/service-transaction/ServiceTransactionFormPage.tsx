import Constant from "../constant/Constant";
import {
  Button,
  Combobox,
  Container,
  Field,
  HStack,
  Heading,
  Input,
  Portal,
  Separator,
  Stack,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import axios from "axios";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface FormValues {
  customerId: string;
  transactionDate: Date;
  detailInformations: {
    quantity: number;
    itemName: string;
    description: string;
    price: number;
  }[];
}

const ServiceTransactionFormPage = () => {
  const [transactionDate, setTransactionDate] = useState(new Date());
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      transactionDate: transactionDate,
    },
  });
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [detailRow, setDetailRow] = useState(0);

  const { contains } = useFilter({ sensitivity: "base" });
  const {
    collection,
    filter,
    set: setCollection,
  } = useListCollection({
    initialItems: customers,
    filter: contains,
  });

  useEffect(() => {
    fetchCustomers();
  }, [detailRow]);

  const fetchCustomers = () => {
    axios.get(`${Constant.coreUrl}/customer`).then((response) => {
      const { data: customers } = response.data;
      const comboBoxValues = customers.map(
        (customer: { customerName: string; id: number }) => ({
          label: customer.customerName,
          value: customer.id,
        })
      );
      setCustomers(customers);
      setCollection(comboBoxValues);
    });
  };

  const onSubmit = handleSubmit((data) => {
    axios
      .post(`${Constant.coreUrl}/service-transaction`, {
        customer_id: data.customerId,
        transaction_date: data.transactionDate,
        transaction_detail: data.detailInformations.map(detail => ({
          description: detail.description,
          item_name: detail.itemName,
          price: detail.price,
          quantity: detail.quantity
        }))
      })
      .then((response) => {
        console.log(response);
        navigate("/service-transaction");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const addNewDetailInforamtion = () => {
    setDetailRow(detailRow + 1);
    Array(detailRow).forEach((row) => {
      console.log(row)
    });
  };

  return (
    <Container centerContent>
      <Heading>Add Transaction</Heading>
      <form onSubmit={onSubmit} className="form">
        <Stack gap="4">
          <Field.Root>
            <Field.Label>Customer Name</Field.Label>
            <Controller
              control={control}
              name="customerId"
              render={({ field }) => (
                <Combobox.Root
                  collection={collection}
                  value={field.value ? [field.value] : []}
                  onValueChange={({ value }) => field.onChange(value[0] || "")}
                  onInputValueChange={(e) => filter(e.inputValue)}
                  onInteractOutside={() => field.onBlur()}
                  width="320px"
                  required
                >
                  <Combobox.Control>
                    <Combobox.Input placeholder="Type to search" />
                    <Combobox.IndicatorGroup>
                      <Combobox.ClearTrigger />
                      <Combobox.Trigger />
                    </Combobox.IndicatorGroup>
                  </Combobox.Control>
                  <Portal>
                    <Combobox.Positioner>
                      <Combobox.Content>
                        <Combobox.Empty>No customer found</Combobox.Empty>
                        {collection.items.map(
                          (item: { value: string; label: string }) => (
                            <Combobox.Item item={item} key={item.value}>
                              {item.label}
                              <Combobox.ItemIndicator />
                            </Combobox.Item>
                          )
                        )}
                      </Combobox.Content>
                    </Combobox.Positioner>
                  </Portal>
                </Combobox.Root>
              )}
            ></Controller>
          </Field.Root>
          <Field.Root>
            <Field.Label>Transaction Date</Field.Label>
            <Controller
              name="transactionDate"
              control={control}
              render={({ field }) => (
                <SingleDatepicker
                  name="transaction-date"
                  date={field.value}
                  onDateChange={field.onChange}
                />
              )}
            ></Controller>
          </Field.Root>
          <HStack justify="space-between">
            <Text>Service Information</Text>
            <Button onClick={() => addNewDetailInforamtion()}>Add</Button>
          </HStack>
          {Array(detailRow).keys().map((_, index: number) => (
            <>
            <Field.Root>
              <Field.Label>Quantity</Field.Label>
              <Input {...register(`detailInformations[${index}].quantity`)} />
            </Field.Root> 
            <Field.Root>
              <Field.Label>Item Name</Field.Label>
              <Input {...register(`detailInformations[${index}].itemName`)} />
            </Field.Root>
            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Input {...register(`detailInformations[${index}].description`)} />
            </Field.Root>
            <Field.Root>
              <Field.Label>Price</Field.Label>
              <Input {...register(`detailInformations[${index}].price`)} />
            </Field.Root>
            <Separator />
            </>
          ))}
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ServiceTransactionFormPage;
