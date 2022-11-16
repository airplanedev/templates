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
  Textarea,
  Select,
  Tooltip,
  DescriptionList,
  useTaskQuery,
  Loader,
  DateTimePicker,
} from "@airplane/views";

import { XCircleIcon } from "@airplane/views/icons";

import { useMemo, useState } from "react";

import md5 from "md5";

const CustomerRelationshipDashboard = () => {
  const [stageButtonIndex, setStageButtonIndex] = useState(0);
  const customersTableState = useComponentState("customers");
  let selectedCustomer: CustomerRowType = customersTableState.selectedRow;

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
          onSuccess: (data) => {
            customersTableState.selectedRow = data.Q1[0];
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
            const [initialHash, setInitialHash] = useState(
              md5(JSON.stringify(row))
            );
            const currentHash = md5(JSON.stringify(row));
            return (
              <>
                <Stack direction="row">
                  <Button
                    preset="secondary"
                    disabled={initialHash == currentHash}
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
                      onSuccess: () => {
                        setInitialHash(md5(JSON.stringify(row)));
                      },
                    }}
                  >
                    Update
                  </Button>
                </Stack>
              </>
            );
          },
        ]}
      />
      {selectedCustomer && (
        <>
          <Stack direction="row" grow align="start">
            <CustomerCard
              selectedCustomer={selectedCustomer}
              onDelete={() => {
                customersTableState.selectedRow = null;
              }}
            />
            <TouchPoints selectedCustomer={selectedCustomer} />
          </Stack>
        </>
      )}
    </Stack>
  );
};

const TouchPoints = ({
  selectedCustomer,
}: {
  selectedCustomer: CustomerRowType;
}) => {
  const { output, loading, error } = useTaskQuery({
    slug: "demo_list_customer_touch_points",
    params: {
      customer_id: selectedCustomer.customer_id,
    },
  });

  const descriptionData = useMemo(() => {
    let result: any[] = [];
    if (output != null) {
      output.Q1.map((touchPoint) => {
        let term = touchPoint.touch_point_type;
        term = term.charAt(0).toUpperCase() + term.slice(1);
        result.push({
          term: term,
          description: (
            <Stack direction="row" align="center">
              <Text sx={{ width: "210px" }}>{touchPoint.created_at}</Text>{" "}
              <Button
                variant="subtle"
                task={{
                  slug: "demo_delete_touch_point_for_customer",
                  params: {
                    customer_id: touchPoint.customer_id,
                    touch_point_type: touchPoint.touch_point_type,
                  },
                  refetchTasks: {
                    slug: "demo_list_customer_touch_points",
                  },
                }}
                confirm={{
                  title: `Do you want to delete this touch point?`,
                  body: `You can add as many touch points as you need later`,
                  confirmText: "Yes",
                  cancelText: "Cancel",
                }}
              >
                <XCircleIcon color="red" />
              </Button>
            </Stack>
          ),
        });
      });
    }
    return result;
  }, [output]);

  return (
    <>
      <Title order={5}>Customer touch points</Title>
      {loading ? (
        <Stack sx={{ padding: "10px 0" }}>
          <Loader size="sm" />
        </Stack>
      ) : descriptionData.length == 0 ? (
        <Text sx={{ padding: "10px 0" }}>
          There are no touch points yet for this customer
        </Text>
      ) : (
        <Stack sx={{ maxHeight: "250px", overflow: "scroll" }}>
          <DescriptionList items={descriptionData} />
        </Stack>
      )}
    </>
  );
};

const CustomerCard = ({
  selectedCustomer,
  onDelete,
}: {
  selectedCustomer: CustomerRowType;
  onDelete: () => void;
}) => {
  const nextStage = getNextStage(selectedCustomer.opportunity_stage);
  const previousStage = getPrevStage(selectedCustomer.opportunity_stage);
  return (
    <Card>
      <Stack direction="row" justify="space-between">
        <Stack sx={{ gap: "2px" }}>
          <Title order={5}>{selectedCustomer.contact_name}</Title>
          <Text color="primary">{selectedCustomer.contact_title}</Text>
          <Text
            color="gray"
            onClick={() => {
              copyTextToCipboard({
                label: "Email",
                text: convertNameToEmail(selectedCustomer.contact_name),
              });
            }}
          >
            <Tooltip label="Click to copy email">
              {convertNameToEmail(selectedCustomer.contact_name)}
            </Tooltip>
          </Text>
          <Text
            color="gray"
            onClick={() =>
              copyTextToCipboard({
                label: "Phone number",
                text: selectedCustomer.phone,
              })
            }
          >
            <Tooltip label="Click to copy phone number">
              {selectedCustomer.phone}
            </Tooltip>
          </Text>
          <Text color="gray">
            {selectedCustomer.address}, {selectedCustomer.country}.
          </Text>
        </Stack>
        <Stack sx={{ height: "100%" }} justify="space-between">
          <Stack>
            <Button
              preset="secondary"
              task={{
                slug: "demo_update_customer_stage",
                params: {
                  opportunity_stage: nextStage,
                  customer_id: selectedCustomer.customer_id,
                },
                refetchTasks: {
                  slug: "demo_list_customers_by_stage",
                  params: {
                    opportunity_stage: selectedCustomer.opportunity_stage,
                  },
                },
              }}
              disabled={selectedCustomer.opportunity_stage == "customer"}
              confirm={{
                title: `Do you want to upgrade this customer's stage to ${nextStage}?`,
                body: `This customer will be listed under ${nextStage} category`,
                confirmText: "Yes",
                cancelText: "Cancel",
              }}
            >
              {selectedCustomer.opportunity_stage == "customer"
                ? "Convert to customer"
                : `Convert to ${nextStage}`}
            </Button>
            <Button
              color="red"
              preset="secondary"
              task={{
                slug: "demo_delete_customer",
                params: {
                  customer_id: selectedCustomer.customer_id,
                },
                onSuccess: () => {
                  onDelete();
                },
                refetchTasks: {
                  slug: "demo_list_customers_by_stage",
                  params: {
                    opportunity_stage: selectedCustomer.opportunity_stage,
                  },
                },
              }}
              confirm={{
                title: `Do you want to delete this customer?`,
                body: `You can create another entry at any time`,
                confirmText: "Yes",
                cancelText: "Cancel",
              }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" align="center" justify="end">
        <Text color="gray">
          <b>{selectedCustomer.touch_points}</b> touch points
        </Text>
        <CreatePointType selectedCustomer={selectedCustomer} />
      </Stack>
    </Card>
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
  const stageState = useComponentState();

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
          <Select
            id={stageState.id}
            label="Select a stage"
            defaultValue={"lead"}
            data={[
              {
                value: "lead",
                label: "Lead",
              },
              {
                value: "oppurtunity",
                label: "Oppurtunity",
              },
              {
                value: "customer",
                label: "Customer",
              },
            ]}
          />
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
                  opportunity_stage: stageState.value,
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
  const dateState = useComponentState();

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
            <Select
              id={touchPointState.id}
              label="Select a point type"
              disabled={loading}
              required
              defaultValue={"email"}
              data={[
                {
                  value: "email",
                  label: "Email",
                },
                {
                  value: "phone",
                  label: "Phone",
                },
                {
                  value: "video",
                  label: "Video",
                },
                {
                  value: "in person",
                  label: "In person",
                },
              ]}
            />

            <DateTimePicker
              id={dateState.id}
              label="Date"
              defaultValue={new Date()}
              required
            />

            <Stack direction="row" justify="end">
              <Button
                onClick={() => setLoading(true)}
                task={{
                  slug: "demo_create_touch_point_for_customer",
                  params: {
                    customer_id: selectedCustomer.customer_id,
                    touch_point_type: touchPointState.value,
                    created_at: dateState.value?.toISOString(),
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

const customersCols: Column[] = [
  { accessor: "company_name", label: "Company name", canEdit: true },
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
