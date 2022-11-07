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
  showNotification,
  Form,
  Textarea,
} from "@airplane/views";

import { useState } from "react";

const CustomerRelationshipDashboard = () => {
  const [stageButtonIndex, setStageButtonIndex] = useState(0);
  const customersTableState = useComponentState("customers");
  const selectedCustomer: CustomerRowType = customersTableState.selectedRow;

  return (
    <Stack>
      <Stack direction="row" justify="space-between">
        <Title>CRM</Title>
        <CreateLeadButton stageButtonIndex={stageButtonIndex} />
      </Stack>
      <Stack direction="row" justify="start" align="center">
        <Title order={5}>Stage</Title>
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
                customersTableState.clearSelection();
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
          "country",
          "contaact_title",
          "postal_code",
          "city",
          "fax",
          "opportunity_stage",
          "address",
          "touch_points",
        ]}
        rowSelection="single"
        rowActions={[
          ({ row }: { row: CustomerRowType }) => {
            const nextStage = getNextStage(row.opportunity_stage);
            return (
              <>
                {row.opportunity_stage != "customer" && (
                  <Stack direction="row">
                    <Button
                      preset="secondary"
                      task={{
                        slug: "demo_update_customer_stage",
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
                  </Stack>
                )}
              </>
            );
          },

          ({ row }: { row: CustomerRowType }) => {
            const previousStage = getPrevStage(row.opportunity_stage);
            return (
              <Stack direction="row">
                <Button
                  color="red"
                  preset="secondary"
                  task={{
                    slug: "demo_update_customer_stage",
                    params: {
                      opportunity_stage: previousStage,
                      customer_id: row.customer_id,
                    },
                    refetchTasks: {
                      slug: "demo_list_customers_by_stage",
                      params: {
                        opportunity_stage: row.opportunity_stage,
                      },
                    },
                  }}
                  disabled={row.opportunity_stage == "lead"}
                  confirm={{
                    title: `Do you want to churn this customer's stage to ${previousStage}?`,
                    body: `This customer will be listed under ${previousStage} category`,
                    confirmText: "Yes",
                    cancelText: "Cancel",
                  }}
                >
                  Churn
                </Button>
              </Stack>
            );
          },
        ]}
      />
      {selectedCustomer && (
        <>
          <Stack direction="row" grow align="start">
            <Card>
              <Stack direction="row" justify="space-between">
                <Stack sx={{ gap: "2px" }}>
                  <Title order={5}>{selectedCustomer.contact_name}</Title>
                  <Text color="primary">{selectedCustomer.contact_title}</Text>
                  <Text color="gray">
                    {convertNameToEmail(selectedCustomer.contact_name)}
                  </Text>
                  <Text color="gray">{selectedCustomer.phone}</Text>
                  <Text color="gray">
                    {selectedCustomer.address}, {selectedCustomer.country}.
                  </Text>
                </Stack>
                <Stack sx={{ height: "100%" }} justify="space-between">
                  <Stack>
                    <Button
                      onClick={() =>
                        copyTextToCipboard({
                          label: "Email",
                          text: convertNameToEmail(
                            selectedCustomer.contact_name
                          ),
                        })
                      }
                      preset="tertiary"
                    >
                      Copy email
                    </Button>
                    <Button
                      onClick={() =>
                        copyTextToCipboard({
                          label: "Phone number",
                          text: selectedCustomer.phone,
                        })
                      }
                      preset="tertiary"
                    >
                      Copy phone
                    </Button>
                  </Stack>
                  <Stack direction="row">
                    <Text color="gray">
                      <b>{selectedCustomer.touch_points}</b> touch points
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
              <Stack align="end">
                <CreatePointType selectedCustomer={selectedCustomer} />
              </Stack>
            </Card>
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
            />
          </Stack>
        </>
      )}
    </Stack>
  );
};

const CreateLeadButton = ({
  stageButtonIndex,
}: {
  stageButtonIndex: number;
}) => {
  const [loading, setLoading] = useState(false);
  const dialogState = useComponentState();
  const companyNameState = useComponentState();
  const contactNameState = useComponentState();
  const contactTitleState = useComponentState();
  const countryState = useComponentState();
  const phoneState = useComponentState();
  const addressState = useComponentState();

  return (
    <>
      <Button onClick={dialogState.open}>Create lead</Button>

      <Dialog
        id={dialogState.id}
        title="Create lead"
        onClose={dialogState.close}
      >
        <Stack>
          <Stack direction="row">
            <TextInput
              id={companyNameState.id}
              label="Company name"
              required
              disabled={loading}
            />
            <TextInput
              id={contactNameState.id}
              label="Contact name"
              required
              disabled={loading}
            />
          </Stack>

          <Stack direction="row">
            <TextInput
              id={contactTitleState.id}
              label="Company title"
              required
              disabled={loading}
            />
            <TextInput
              id={countryState.id}
              label="Country"
              required
              disabled={loading}
            />
          </Stack>

          <TextInput
            id={phoneState.id}
            label="Phone number"
            required
            disabled={loading}
          />

          <Textarea
            id={addressState.id}
            label="Address"
            required
            disabled={loading}
          />

          <Stack direction="row" justify="end">
            <Button
              type="submit"
              onClick={() => setLoading(true)}
              task={{
                slug: "demo_create_lead",
                params: {
                  customer_id: companyNameState.value
                    ?.replaceAll(" ", "_")
                    .slice(0, 5)
                    .toUpperCase(),
                  company_name: companyNameState.value,
                  contact_name: contactNameState.value,
                  contact_title: contactTitleState.value,
                  country: countryState.value,
                  phone: phoneState.value,
                  address: addressState.value,
                },
                refetchTasks: {
                  slug: "demo_list_customers_by_stage",
                  params: {
                    opportunity_stage: stageFilterButtons[stageButtonIndex].key,
                  },
                },
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
              Submit
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
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
        <Button sx={{ margin: "10px 0" }} onClick={dialogState.open}>
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
                    {
                      slug: "demo_list_customers_by_stage",
                      params: {
                        opportunity_stage: selectedCustomer.opportunity_stage,
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
  company_name: string;
  contact_name: string;
  contact_title: string;
  address: string;
  country: string;
  opportunity_stage: string;
  phone: string;
  touch_points: number;
}

const touchPointsCols: Column[] = [
  { accessor: "touch_point_type", label: "Touch point type" },
  { accessor: "created_at", label: "Date created", type: "date" },
];

const customersCols: Column[] = [
  { accessor: "company_name", label: "Company name", canEdit: true },
  { accessor: "contact_name", label: "Contact name", canEdit: true },
  { accessor: "contact_title", label: "Contact title", canEdit: true },
  { accessor: "country", label: "Country", canEdit: true },
  { accessor: "phone", label: "Phone number", canEdit: true },
  { accessor: "opportunity_stage", label: "Stage" },
  {
    accessor: "update",
    label: "Update",
    component: (row) => {
      return (
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
          Update
        </Button>
      );
    },
  },
  // { accessor: "update", label: "Convert" },
];

const stageFilterButtons = [
  { title: "Leads", key: "lead" },
  { title: "Opportunities", key: "opportunity" },
  { title: "Customers", key: "customer" },
];

const copyTextToCipboard = ({
  text,
  label,
}: {
  text: string;
  label?: string;
}) => {
  navigator.clipboard.writeText(text);
  showNotification({ message: `${label || "Text"} copied`, type: "success" });
};

const convertNameToEmail = (name: string) => {
  return (name + "@" + name + ".com").replaceAll(" ", "_").toLowerCase();
};

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

const getPrevStage = (currentStage: string) => {
  switch (currentStage) {
    case "lead":
      return "lead";
    case "opportunity":
      return "lead";
    case "customer":
      return "opportunity";
    default:
      break;
  }
};

export default CustomerRelationshipDashboard;
