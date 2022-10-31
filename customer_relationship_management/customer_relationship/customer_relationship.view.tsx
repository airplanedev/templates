import {
  Button,
  Checkbox,
  Stack,
  Table,
  Text,
  Title,
  TextInput,
  Card,
  useComponentState,
  Select,
  Dialog,
  Textarea,
  Divider,
} from "@airplane/views";

import { useState } from "react";

const CustomerRelationshipDashboard = () => {
  const [stageButtonIndex, setStageButtonIndex] = useState(0);
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
          slug: "demo_customers_list",
          params: {
            stage: stageFilterButtons[stageButtonIndex].key,
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
        ]}
        rowSelection="single"
        rowActions={({ row }: { row: CustomerRowType }) => {
          console.log("ACTION BUTTONS", row.opportunity_stage);
          const nextStage = getNextStage(row.opportunity_stage);
          return (
            <Stack direction="row">
              <Button
                preset="secondary"
                task={{
                  slug: "demo_update_customer",
                  params: {
                    stage: nextStage,
                    customer_id: row.customer_id,
                  },
                  refetchTasks: {
                    slug: "demo_customers_list",
                    params: {
                      stage: row.opportunity_stage,
                    },
                  },
                }}
                disabled={row.opportunity_stage == "customer"}
                confirm={{
                  title: `Do you want to upgrade this customer's stage to ${nextStage}?`,
                  confirmText: "Yes",
                  cancelText: "Cancel",
                }}
              >
                {row.opportunity_stage == "customer"
                  ? "Convert to customer"
                  : `Convert to ${nextStage}`}
              </Button>
            </Stack>
          );
        }}
      ></Table>
    </Stack>
  );
};

interface CustomerRowType {
  customer_id: number;
  contact_name: string;
  contact_title: string;
  address: string;
  country: string;
  opportunity_stage: string;
  phone: string;
}
const customersCols = [
  { accessor: "contact_name", label: "Contact name" },
  { accessor: "contact_title", label: "Contact title" },
  { accessor: "address", label: "Address" },
  { accessor: "country", label: "Country" },
  { accessor: "phone", label: "Phone number" },
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
