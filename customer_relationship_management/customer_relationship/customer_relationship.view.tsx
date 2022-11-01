import {
  Button,
  Stack,
  Table,
  Text,
  Title,
  TextInput,
  Card,
  useComponentState,
  Dialog,
  Divider,
  Column,
} from "@airplane/views";

import { useState } from "react";

const CustomerRelationshipDashboard = () => {
  const [stageButtonIndex, setStageButtonIndex] = useState(0);
  const customersTableState = useComponentState("customers");
  const selectedCustomer: CustomerRowType = customersTableState.selectedRow;

  return (
    <Stack>
      <Stack direction="row" justify="space-between">
        <Title>Customer relationship management</Title>
      </Stack>
      <Text>Mangage customers through engagement stages and touch points.</Text>
      <Stack direction="row" justify="start" align="center">
        <Title order={5}>Filter stage: </Title>
        {stageFilterButtons.map((buttonData, index) => {
          return (
            <Button
              key={buttonData.key}
              variant={
                stageFilterButtons[stageButtonIndex].key == buttonData.key
                  ? "filled"
                  : "outline"
              }
              size="sm"
              onClick={() => {
                setStageButtonIndex(index);
              }}
            >
              {buttonData.title}
            </Button>
          );
        })}
      </Stack>
      <Divider size="xs" sx={{ borderTopColor: "#8080803d" }} />
      <Table
        id="customers"
        title="Customers"
        columns={customersCols}
        defaultPageSize={5}
        task={{
          slug: "demo_list_customers_by_stage",
          params: {
            opportunity_stage: stageFilterButtons[stageButtonIndex].key,
          },
        }}
        hiddenColumns={[
          "customer_id",
          "company_name",
          "contaact_title",
          "postal_code",
          "city",
          "fax",
          "opportunity_stage",
          "address",
        ]}
        rowSelection="single"
        rowActions={({ row }: { row: CustomerRowType }) => {
          const nextStage = getNextStage(row.opportunity_stage);
          return (
            <Stack direction="row">
              <Button
                preset="secondary"
                task={{
                  slug: "demo_upgrade_customer_stage",
                  params: {
                    opportunity_stage: nextStage,
                    customer_id: row.customer_id,
                  },
                  refetchTasks: {
                    slug: "demo_list_customers_by_stage",
                    params: {
                      opportunity_stage: row.opportunity_stage,
                    },
                  },
                }}
                disabled={row.opportunity_stage == "customer"}
                confirm={{
                  title: `Do you want to upgrade this customer's stage to ${nextStage}?`,
                  body: `This customer will be listed under ${nextStage} category`,
                  confirmText: "Yes",
                  cancelText: "Cancel",
                }}
              >
                {row.opportunity_stage == "customer"
                  ? "Convert to customer"
                  : `Convert to ${nextStage}`}
              </Button>
              <Button
                preset="secondary"
                task={{
                  slug: "demo_edit_customer",
                  params: {
                    contact_name: row.contact_name,
                    contact_title: row.contact_title,
                    country: row.country,
                    phone: row.phone,
                    customer_id: row.customer_id,
                  },
                  refetchTasks: {
                    slug: "demo_list_customers_by_stage",
                    params: {
                      opportunity_stage: row.opportunity_stage,
                    },
                  },
                }}
              >
                Edit
              </Button>
            </Stack>
          );
        }}
      ></Table>
      {selectedCustomer && (
        <>
          <CreatePointType selectedCustomer={selectedCustomer} />
          <Table
            title="Customer touch points"
            columns={touchPointsCols}
            defaultPageSize={5}
            task={{
              slug: "demo_list_customer_touch_points",
              params: {
                customer_id: selectedCustomer.customer_id,
              },
            }}
            hiddenColumns={["customer_id"]}
          ></Table>
        </>
      )}
    </Stack>
  );
};

const CreatePointType = ({
  selectedCustomer,
}: {
  selectedCustomer: CustomerRowType;
}) => {
  const [loading, setLoading] = useState(false);
  const dialogState = useComponentState();
  const touchPointState = useComponentState();

  return (
    <>
      <Stack direction="row">
        <Button onClick={dialogState.open}>
          Add touch point
        </Button>
      </Stack>

      <Dialog
        id={dialogState.id}
        title="Add touch point"
        onClose={dialogState.close}
      >
        <Card>
          <Stack>
            <TextInput
              id={touchPointState.id}
              label="Touch point type"
              required
              disabled={loading}
            />

            <Stack direction="row" justify="end">
              <Button
                onClick={() => setLoading(true)}
                task={{
                  slug: "demo_create_touch_point_for_customer",
                  params: {
                    customer_id: selectedCustomer.customer_id,
                    touch_point_type: touchPointState.value,
                  },
                  refetchTasks: [
                    {
                      slug: "demo_list_customer_touch_points",
                      params: {
                        customer_id: selectedCustomer.customer_id,
                      },
                    },
                  ],
                  onSuccess: () => {
                    dialogState.close();
                    setLoading(false);
                  },
                  onError: (error) => {
                    dialogState.close();
                    setLoading(false);
                  },
                }}
                loading={loading}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Dialog>
    </>
  );
};

interface CustomerRowType {
  customer_id: string;
  contact_name: string;
  contact_title: string;
  address: string;
  country: string;
  opportunity_stage: string;
  phone: string;
}

const touchPointsCols: Column[] = [
  { accessor: "touch_point_type", label: "Touch point type" },
  { accessor: "created_at", label: "Date created", type: "date" },
];

const customersCols: Column[] = [
  { accessor: "contact_name", label: "Contact name", canEdit: true },
  { accessor: "contact_title", label: "Contact title", canEdit: true },
  { accessor: "country", label: "Country", canEdit: true },
  { accessor: "phone", label: "Phone number", canEdit: true },
  { accessor: "opportunity_stage", label: "Stage" },
];

const stageFilterButtons = [
  { title: "Leads", key: "lead" },
  { title: "Opportunities", key: "opportunity" },
  { title: "Customers", key: "customer" },
];

const getNextStage = (currentStage: string) => {
  switch (currentStage) {
    case "lead":
      return "opportunity";
    case "opportunity":
      return "customer";
    case "customer":
      return "customer";
    default:
      break;
  }
};

export default CustomerRelationshipDashboard;
