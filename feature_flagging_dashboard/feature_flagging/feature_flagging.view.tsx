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
} from "@airplane/views";

import { useState } from "react";

const FeaturesDashboard = () => {
  const featuresTableState = useComponentState("features");
  const selectedFeature: FeatureRowType = featuresTableState.selectedRow;

  return (
    <Stack>
      <Stack direction="row" justify="space-between">
        <Title>Features dashboard</Title>

        <CreateFeatureButton />
      </Stack>
      <Text>Look up a feature and list customers subscribed to a feature</Text>

      <Stack direction="row" align="center" grow>
        <Table
          id="features"
          title="Features"
          columns={featuresCols}
          defaultPageSize={5}
          task={{
            slug: "demo_search_features",
          }}
          hiddenColumns={["feature_id"]}
          rowSelection="single"
          rowActions={({ row }: { row: FeatureRowType }) => {
            return (
              <Stack direction="row">
                <Button
                  preset="secondary"
                  compact
                  size="sm"
                  task={{
                    slug: "demo_edit_feature",
                    params: {
                      feature_id: row.feature_id,
                      feature_name: row.feature_name,
                      feature_description: row.feature_description,
                      is_enabled: row.is_enabled,
                    },
                    refetchTasks: {
                      slug: "demo_search_features",
                    },
                  }}
                >
                  Update
                </Button>
                <Button
                  color="red"
                  preset="secondary"
                  compact
                  size="sm"
                  task={{
                    slug: "demo_delete_feature",
                    params: {
                      feature_id: row.feature_id,
                    },
                    refetchTasks: {
                      slug: "demo_search_features",
                    },
                  }}
                  confirm={{
                    title: "Do you want to delete this feature?",
                    body: "You would be able to add it again if you want to",
                    confirmText: "Yes",
                    cancelText: "Cancel",
                  }}
                >
                  Delete
                </Button>
              </Stack>
            );
          }}
        />
      </Stack>
      {selectedFeature && (
        <CustomerFeaturesTable selectedFeature={selectedFeature} />
      )}
    </Stack>
  );
};

const CreateFeatureButton = () => {
  const [loading, setLoading] = useState(false);
  const dialogState = useComponentState();
  const featureNameState = useComponentState();
  const featureDescriptionState = useComponentState();
  const enabledState = useComponentState();

  return (
    <>
      <Button onClick={dialogState.open} >
        Add new feature
      </Button>

      <Dialog
        id={dialogState.id}
        title="Create feature"
        onClose={dialogState.close}
      >
        <Card>
          <Stack>
            <TextInput
              id={featureNameState.id}
              label="Feature name"
              required
              disabled={loading}
            />
            <Textarea
              id={featureDescriptionState.id}
              label="Feature desctiption"
              disabled={loading}
            />
            <Checkbox
              id={enabledState.id}
              label="Enabled"
              defaultChecked
              disabled={loading}
            />
            <Stack direction="row" justify="end">
              <Button
                onClick={() => setLoading(true)}
                task={{
                  slug: "demo_create_feature",
                  params: {
                    feature_name: featureNameState.value,
                    is_enabled: enabledState.value,
                    feature_description: featureDescriptionState.value,
                  },
                  refetchTasks: {
                    slug: "demo_search_features",
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
        </Card>
      </Dialog>
    </>
  );
};

const CustomerFeaturesTable = ({
  selectedFeature,
}: {
  selectedFeature: FeatureRowType;
}) => {
  return (
    <Stack>
      <AddCustomerToFeature selectedFeature={selectedFeature} />
      <Stack direction="row" align="center" grow>
        <Table
          title="Feature customers"
          columns={featureCustomersCols}
          defaultPageSize={5}
          task={{
            slug: "demo_search_feature_customers",
            params: {
              feature_id: selectedFeature.feature_id,
            },
          }}
          hiddenColumns={["feature_id", "customer_id"]}
          rowSelection="single"
          rowActions={({ row }: { row: CustomerFeatureRowType }) => {
            return (
              <Button
                preset="secondary"
                color="red"
                compact
                size="sm"
                task={{
                  slug: "demo_delete_feature_customer",
                  params: {
                    feature_id: selectedFeature.feature_id,
                    customer_id: row.customer_id,
                  },
                  refetchTasks: {
                    slug: "demo_search_feature_customers",
                  },
                }}
                confirm={{
                  title: "Do you want to delete this customer?",
                  body: "You would be able to add them again if you want to",
                  confirmText: "Yes",
                  cancelText: "Cancel",
                }}
              >
                Delete
              </Button>
            );
          }}
        />
      </Stack>
    </Stack>
  );
};

const AddCustomerToFeature = ({
  selectedFeature,
}: {
  selectedFeature: FeatureRowType;
}) => {
  const [loading, setLoading] = useState(false);
  const customerSelectState = useComponentState();
  return (
    <>
      <Stack width="1/2">
        <Title order={5}>Add customer to feature</Title>
        <Stack direction="row">
          <Select
            id={customerSelectState.id}
            task="demo_customers_list"
            outputTransform={(v) =>
              v.Q1.map((customer) => ({
                label: customer.contact_name,
                value: customer.customer_id,
              }))
            }
            value={customerSelectState.value}
            placeholder="Select a customer"
            disabled={loading}
          />

          <Button
            disabled={customerSelectState.value == null}
            onClick={() => setLoading(true)}
            task={{
              slug: "demo_create_feature_customer",
              params: {
                feature_id: selectedFeature.feature_id,
                customer_id: customerSelectState.value,
              },
              refetchTasks: {
                slug: "demo_search_feature_customers",
              },
              onSuccess: () => {
                setLoading(false);
                customerSelectState.setValue(null);
              },
              onError: () => {
                setLoading(false);
                customerSelectState.setValue(null);
              },
            }}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

interface FeatureRowType {
  feature_id: number;
  feature_name: string;
  feature_description: string;
  updated_at: string;
  is_enabled: boolean;
}

interface CustomerFeatureRowType {
  feature_id: number;
  customer_id: number;
  contact_name: string;
  address: string;
  country: string;
}

const featuresCols = [
  { accessor: "feature_name", label: "Name", canEdit: "true" },
  { accessor: "feature_description", label: "Description", canEdit: "true" },
  { accessor: "updated_at", label: "Last updated", type: "date" },
  {
    accessor: "is_enabled",
    label: "Is enabled",
    canEdit: "true",
    type: "boolean",
  },
];

const featureCustomersCols = [
  { accessor: "contact_name", label: "Contact name" },
  { accessor: "address", label: "Address" },
  { accessor: "country", label: "Country" },
];

export default FeaturesDashboard;