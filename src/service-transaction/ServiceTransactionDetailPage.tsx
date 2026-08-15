import {
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  Menu,
  Portal,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import formatCurrency from "../util/formatCurrency";
import Constant from "../constant/Constant";
import { Link } from "react-router";
import DialogModal from "../common/DialogModal";
import apiClient from "../util/apiClient";

interface ServiceTransaction {
  customerName: string;
  customerPhone: string;
  transactionDate: string;
  transactionCode: string;
  totalPrice: string;
  status: string;
  transactionDtls: TransactionDetail[];
}

interface TransactionDetail {
  itemName: string;
  solution: string;
  price: number;
}

interface TransactionDetailResponse {
  item_name: string;
  solution: string;
  price: number;
}

const defaultServiceTransaction = {
  customerName: "",
  customerPhone: "",
  transactionDate: "",
  transactionCode: "",
  totalPrice: "",
  status: "",
  transactionDtls: [],
};

const dialogStateTitle = {
  confirm: "Confirm Payment?",
  success: "Success",
  error: "Failed to process transaction",
  default: "",
} as const;

const dialogStateBody = {
  confirm: "Are you sure you want to confirm payment?",
  success: "Transaction has been paid",
  error: "",
  default: "",
} as const;

type DialogState = keyof typeof dialogStateTitle | null;

interface Operation {
  operationName: string;
  displayName: string;
}

const ServiceTransactionDetailPage = () => {
  const { transactionId } = useParams();
  const [serviceTransaction, setServiceTransaction] =
    useState<ServiceTransaction>(defaultServiceTransaction);
  useEffect(() => {
    fetchData();
    fetchOperations();
  }, []);
  const [dialogState, setDialogState] = useState<DialogState>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [operations, setOperations] = useState<Operation[]>([]);

  const fetchData = () => {
    apiClient
      .get(`${Constant.coreUrl}/service-transaction/` + transactionId)
      .then((response) => {
        const { data } = response.data;

        const transaction = {
          transactionCode: data.transaction_code,
          customerName: data.customer_name,
          customerPhone: data.customer_phone,
          transactionDate: data.transaction_date,
          totalPrice: data.total_price,
          status: data.status,
          transactionDtls: data.transaction_dtls.map(
            (transaction_dtl: TransactionDetailResponse) => ({
              itemName: transaction_dtl.item_name,
              solution: transaction_dtl.solution,
              price: transaction_dtl.price,
            })
          ),
        };
        setServiceTransaction(transaction);
      });
  };

  const fetchOperations = () => {
    apiClient
      .get(`${Constant.coreUrl}/service-transaction/operation/${transactionId}`)
      .then((response) => {
        const { data } = response.data;
        setOperations(data);
      });
  };

  const handleCopyRaw = () => {
    apiClient
      .get(
        `${Constant.coreUrl}/service-transaction/${serviceTransaction.transactionCode}/invoice/plain`
      )
      .then(async (response) => {
        await navigator.clipboard.writeText(response.data);
      });
  };

  const handlePayOperation = () => {
    apiClient
      .post(`${Constant.coreUrl}/service-transaction/operation`, {
        operationName: "pay",
        serviceTransactionCode: transactionId,
      })
      .then((response) => {
        const { data } = response;
        setDialogState("success");
        window.location.reload();
      })
      .catch((exception) => {
        setErrorMessage(exception.response?.data?.message || "");
        setDialogState("error");
      });
  };

  const handleOpenConfirm = () => {
    setDialogState("confirm");
  };

  return (
    <div className="page-container">
      <Heading color="var(--color-primary)" fontSize="2xl" marginBottom="24px">
        Service Transaction Detail
      </Heading>

      <div className="detail-section">
        <Heading
          fontSize="lg"
          color="var(--color-secondary)"
          marginBottom="16px"
        >
          Customer Information
        </Heading>
        <Stack gap="3">
          <Stack direction="row" gap="2">
            <Text
              fontWeight="bold"
              color="var(--color-text-muted)"
              minWidth="120px"
            >
              Name
            </Text>
            <Text>{serviceTransaction.customerName}</Text>
          </Stack>
          <Stack direction="row" gap="2">
            <Text
              fontWeight="bold"
              color="var(--color-text-muted)"
              minWidth="120px"
            >
              Phone Number
            </Text>
            <Text>{serviceTransaction.customerPhone}</Text>
          </Stack>
        </Stack>
      </div>

      <div className="detail-section">
        <HStack w="full" justifyContent="space-between">
          <Heading
            fontSize="lg"
            color="var(--color-secondary)"
            marginBottom="16px"
          >
            Transaction Information
          </Heading>
          {operations.length > 0 && (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="solid" size="sm">
                  Operation
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    {operations.map((operation) => (
                      <Menu.Item
                        key={operation.operationName}
                        value={operation.operationName}
                        onClick={handleOpenConfirm}
                      >
                        {operation.displayName}
                      </Menu.Item>
                    ))}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )}
        </HStack>
        <HStack w="full" justifyContent="space-between" flexWrap="wrap" gap="4">
          <Stack>
            <Text
              fontWeight="bold"
              color="var(--color-text-muted)"
              fontSize="sm"
            >
              Transaction Date
            </Text>
            <Text fontWeight="medium">
              {serviceTransaction.transactionDate}
            </Text>
          </Stack>
          <Stack>
            <Text
              fontWeight="bold"
              color="var(--color-text-muted)"
              fontSize="sm"
            >
              Transaction UID
            </Text>
            <Text fontWeight="medium">
              {serviceTransaction.transactionCode}
            </Text>
          </Stack>
          <Stack>
            <Text
              fontWeight="bold"
              color="var(--color-text-muted)"
              fontSize="sm"
            >
              Total Price
            </Text>
            <Text fontWeight="bold" fontSize="xl" color="var(--color-accent)">
              {formatCurrency(serviceTransaction.totalPrice)}
            </Text>
          </Stack>
        </HStack>
        <HStack>
          <Stack>
            <Text
              fontWeight="bold"
              color="var(--color-text-muted)"
              fontSize="sm"
            >
              Transaction Status
            </Text>
            <Text fontWeight="medium">{serviceTransaction.status}</Text>
          </Stack>
        </HStack>
      </div>

      <div className="detail-section">
        <Heading
          fontSize="lg"
          color="var(--color-secondary)"
          marginBottom="16px"
        >
          Item Details
        </Heading>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader
                color="white"
                backgroundColor="var(--color-secondary)"
                padding="12px"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Item Name
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="white"
                backgroundColor="var(--color-secondary)"
                padding="12px"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Solution
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="white"
                backgroundColor="var(--color-secondary)"
                padding="12px"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Price
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {serviceTransaction.transactionDtls?.map((transactionDtl, idx) => (
              <Table.Row
                backgroundColor={idx % 2 === 0 ? "white" : "#F8FAFC"}
                _hover={{ backgroundColor: "var(--color-accent-light)" }}
              >
                <Table.Cell
                  padding="12px"
                  borderBottom="1px solid"
                  borderColor="var(--color-border)"
                >
                  {transactionDtl.itemName}
                </Table.Cell>
                <Table.Cell
                  padding="12px"
                  borderBottom="1px solid"
                  borderColor="var(--color-border)"
                >
                  {transactionDtl.solution}
                </Table.Cell>
                <Table.Cell
                  padding="12px"
                  borderBottom="1px solid"
                  borderColor="var(--color-border)"
                  fontWeight="medium"
                >
                  {formatCurrency(transactionDtl.price)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      <div className="detail-section">
        <Heading
          fontSize="lg"
          color="var(--color-secondary)"
          marginBottom="16px"
        >
          Actions
        </Heading>
        <Grid templateColumns="repeat(10, 1fr)" gap="1">
          <GridItem>
            <Link to={`/service-transaction/${transactionId}/invoice`}>
              <Button
                backgroundColor="var(--color-secondary)"
                color="white"
                _hover={{ backgroundColor: "var(--color-primary)" }}
                size="sm"
                border="none"
              >
                Download PDF
              </Button>
            </Link>
          </GridItem>
          <GridItem>
            <Button
              backgroundColor="var(--color-secondary)"
              color="white"
              _hover={{ backgroundColor: "var(--color-primary)" }}
              size="sm"
              border="none"
              onClick={handleCopyRaw}
            >
              Copy Raw Text
            </Button>
          </GridItem>
        </Grid>
        <DialogModal
          openModal={dialogState !== null}
          onOpenChange={(e) => {
            if (!e.open) setDialogState(null);
          }}
          title={dialogState ? dialogStateTitle[dialogState] : dialogStateTitle.default}
          body={
            dialogState === "error"
              ? errorMessage
              : dialogState
              ? dialogStateBody[dialogState]
              : dialogStateBody.default
          }
          onConfirm={handlePayOperation}
          onCancel={() => setDialogState(null)}
          showActions={dialogState === "confirm"}
        />
      </div>
    </div>
  );
};

export default ServiceTransactionDetailPage;
