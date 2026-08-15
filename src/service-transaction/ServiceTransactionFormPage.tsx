import Constant from "../constant/Constant";
import {
  Button,
  Combobox,
  Field,
  Flex,
  HStack,
  Heading,
  Input,
  Portal,
  Stack,
  Table,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import apiClient from "../util/apiClient";
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
    apiClient.get(`${Constant.coreUrl}/customer`).then((response) => {
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
    apiClient
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
                          color: "var(--color-primary)",
                          backgroundColor: "white",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          fontSize: "14px",
                          width: "100%",
                        },
                        _hover: { borderColor: "var(--color-accent)" },
                        _focus: { borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" },
                      },
                      monthYearButtonProps: {
                        style: {
                          color: "var(--color-primary)",
                          fontWeight: "bold",
                        },
                      },
                      dayLabels: {
                        style: {
                          color: "var(--color-text-muted)",
                          fontWeight: "bold",
                          fontSize: "12px",
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
                          fontWeight: "bold",
                          borderColor: "var(--color-accent)",
                          borderWidth: "1px",
                        },
                      },
                      popoverProps: {
                        style: {
                          borderColor: "var(--color-border)",
                          borderRadius: "12px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        },
                      },
                      dayProps: {
                        style: {
                          borderRadius: "8px",
                          color: "var(--color-text)",
                        },
                        _hover: { backgroundColor: "var(--color-accent-light)", color: "var(--color-primary)" },
                      },
                      weekdayLabels: {
                        style: {
                          color: "var(--color-text-muted)",
                          fontWeight: "bold",
                          fontSize: "12px",
                        },
                      },
                      navigationButtonProps: {
                        style: {
                          color: "var(--color-accent)",
                          borderRadius: "8px",
                        },
                        _hover: { backgroundColor: "var(--color-accent-light)" },
                      },
                    }}
                  />
                )}
              ></Controller>
            </Field.Root>
            <Stack gap="3" marginTop="16px">
              <HStack justify="space-between">
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
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader
                      textAlign="center"
                      color="white"
                      backgroundColor="var(--color-secondary)"
                      padding="10px"
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      width="80px"
                    >
                      Qty
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      textAlign="center"
                      color="white"
                      backgroundColor="var(--color-secondary)"
                      padding="10px"
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wider"
                    >
                      Item Name
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      textAlign="center"
                      color="white"
                      backgroundColor="var(--color-secondary)"
                      padding="10px"
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wider"
                    >
                      Description
                    </Table.ColumnHeader>
                    <Table.ColumnHeader
                      textAlign="center"
                      color="white"
                      backgroundColor="var(--color-secondary)"
                      padding="10px"
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      width="180px"
                    >
                      Price
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {Array.from({ length: detailRow }).map((_, index: number) => (
                    <Table.Row key={index} backgroundColor="white">
                      <Table.Cell padding="8px" borderBottom="1px solid" borderColor="var(--color-border)">
                        <Input
                          {...register(`detailInformations[${index}].quantity`, { valueAsNumber: true })}
                          type="number"
                          defaultValue="1"
                          min="1"
                          borderColor="var(--color-border)"
                          color="var(--color-text)"
                          textAlign="center"
                          _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
                        />
                      </Table.Cell>
                      <Table.Cell padding="8px" borderBottom="1px solid" borderColor="var(--color-border)">
                        <Input
                          {...register(`detailInformations[${index}].itemName`)}
                          placeholder="Enter item name"
                          borderColor="var(--color-border)"
                          color="var(--color-text)"
                          _placeholder={{ color: "var(--color-text-muted)" }}
                          _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
                        />
                      </Table.Cell>
                      <Table.Cell padding="8px" borderBottom="1px solid" borderColor="var(--color-border)">
                        <Input
                          {...register(`detailInformations[${index}].description`)}
                          placeholder="Enter description"
                          borderColor="var(--color-border)"
                          color="var(--color-text)"
                          _placeholder={{ color: "var(--color-text-muted)" }}
                          _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
                        />
                      </Table.Cell>
                      <Table.Cell padding="8px" borderBottom="1px solid" borderColor="var(--color-border)">
                        <Flex position="relative" align="center">
                          <Text
                            position="absolute"
                            left="12px"
                            color="var(--color-text-muted)"
                            fontWeight="bold"
                            fontSize="sm"
                            zIndex="1"
                            pointerEvents="none"
                          >
                            IDR
                          </Text>
                          <Input
                            {...register(`detailInformations[${index}].price`, { valueAsNumber: true })}
                            type="number"
                            defaultValue="0"
                            min="0"
                            paddingLeft="48px"
                            borderColor="var(--color-border)"
                            color="var(--color-text)"
                            _focus={{ borderColor: "var(--color-accent)", boxShadow: "0 0 0 1px var(--color-accent)" }}
                          />
                        </Flex>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Stack>
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
