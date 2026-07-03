import Constant from "../constant/Constant";
import {
  Button,
  Combobox,
  Field,
  HStack,
  Heading,
  Input,
  Portal,
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
    <div className="page-container">
      <Heading color="var(--color-primary)" fontSize="2xl" marginBottom="24px">
        Add Transaction
      </Heading>
      <div className="form-card">
        <form onSubmit={onSubmit} className="form">
          <Stack gap="5">
            <Field.Root>
              <Field.Label color="var(--color-text)" fontWeight="medium">Customer Name</Field.Label>
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
                      <Combobox.Input
                        placeholder="Select customer"
                        borderColor="var(--color-border)"
                        color="var(--color-text)"
                        backgroundColor="white"
                        _placeholder={{ color: "var(--color-text-muted)" }}
                        _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
                        _hover={{ borderColor: "var(--color-accent)" }}
                        onFocus={() => filter("")}
                      />
                      <Combobox.IndicatorGroup>
                        <Combobox.ClearTrigger
                          color="var(--color-text-muted)"
                          _hover={{ color: "var(--color-accent)" }}
                        />
                        <Combobox.Trigger
                          color="var(--color-accent)"
                          _hover={{ color: "var(--color-accent-hover)" }}
                        />
                      </Combobox.IndicatorGroup>
                    </Combobox.Control>
                    <Portal>
                      <Combobox.Positioner>
                        <Combobox.Content
                          backgroundColor="white"
                          borderColor="var(--color-border)"
                          boxShadow="0 4px 12px rgba(0,0,0,0.1)"
                        >
                          <Combobox.Empty
                            color="var(--color-text-muted)"
                            padding="8px"
                          >
                            No customer found
                          </Combobox.Empty>
                          {collection.items.map(
                            (item: { value: string; label: string }) => (
                              <Combobox.Item
                                item={item}
                                key={item.value}
                                color="var(--color-text)"
                                _hover={{ backgroundColor: "var(--color-accent-light)", color: "var(--color-primary)" }}
                                _selected={{ backgroundColor: "var(--color-accent)", color: "white" }}
                                _highlighted={{ backgroundColor: "var(--color-accent-light)", color: "var(--color-primary)" }}
                                padding="8px 12px"
                              >
                                <Combobox.ItemIndicator color="var(--color-accent)" />
                                {item.label}
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
              <Field.Label color="var(--color-text)" fontWeight="medium">Transaction Date</Field.Label>
              <Controller
                name="transactionDate"
                control={control}
                render={({ field }) => (
                  <SingleDatepicker
                    name="transaction-date"
                    date={field.value}
                    onDateChange={field.onChange}
                    propsConfigs={{
                      dateInputProps: {
                        style: {
                          borderColor: "var(--color-border)",
                          color: "var(--color-text)",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          fontSize: "14px",
                          width: "100%",
                        },
                      },
                      dayLabels: {
                        style: {
                          color: "var(--color-text)",
                        },
                      },
                      selectedDayProps: {
                        style: {
                          backgroundColor: "var(--color-accent)",
                          color: "white",
                          borderRadius: "8px",
                        },
                      },
                      todayButtonProps: {
                        style: {
                          color: "var(--color-accent)",
                        },
                      },
                    }}
                  />
                )}
              ></Controller>
            </Field.Root>
            <HStack justify="space-between" marginTop="16px">
              <Text fontWeight="bold" fontSize="lg" color="var(--color-primary)">Service Information</Text>
              <Button
                onClick={() => addNewDetailInforamtion()}
                backgroundColor="var(--color-accent)"
                color="white"
                _hover={{ backgroundColor: "var(--color-accent-hover)" }}
                border="none"
              >
                Add
              </Button>
            </HStack>
            {Array.from({ length: detailRow }).map((_, index: number) => (
              <Stack key={index} gap="4" padding="16px" backgroundColor="var(--color-accent-light)" borderRadius="8px" border="1px solid var(--color-border)">
                <Field.Root>
                  <Field.Label color="var(--color-secondary)" fontWeight="medium">Quantity</Field.Label>
                  <Input
                    {...register(`detailInformations[${index}].quantity`)}
                    type="number"
                    placeholder="0"
                    borderColor="var(--color-border)"
                    color="var(--color-text)"
                    _placeholder={{ color: "var(--color-text-muted)" }}
                    _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label color="var(--color-secondary)" fontWeight="medium">Item Name</Field.Label>
                  <Input
                    {...register(`detailInformations[${index}].itemName`)}
                    placeholder="Enter item name"
                    borderColor="var(--color-border)"
                    color="var(--color-text)"
                    _placeholder={{ color: "var(--color-text-muted)" }}
                    _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label color="var(--color-secondary)" fontWeight="medium">Description</Field.Label>
                  <Input
                    {...register(`detailInformations[${index}].description`)}
                    placeholder="Enter description"
                    borderColor="var(--color-border)"
                    color="var(--color-text)"
                    _placeholder={{ color: "var(--color-text-muted)" }}
                    _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label color="var(--color-secondary)" fontWeight="medium">Price</Field.Label>
                  <Input
                    {...register(`detailInformations[${index}].price`)}
                    type="number"
                    placeholder="0"
                    borderColor="var(--color-border)"
                    color="var(--color-text)"
                    _placeholder={{ color: "var(--color-text-muted)" }}
                    _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
                  />
                </Field.Root>
              </Stack>
            ))}
            <Button
              type="submit"
              backgroundColor="var(--color-accent)"
              color="white"
              _hover={{ backgroundColor: "var(--color-accent-hover)" }}
              border="none"
              width="fit-content"
              marginTop="8px"
            >
              Submit Transaction
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default ServiceTransactionFormPage;
