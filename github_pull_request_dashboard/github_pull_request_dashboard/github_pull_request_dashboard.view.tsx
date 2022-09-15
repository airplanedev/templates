import {
  Button,
  Card,
  Link,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
  useComponentState,
  useTaskMutation,
} from "@airplane/views";

// Views documentation: https://docs.airplane.dev/views/getting-started
const GitHubPRDashboard = () => {
  const userName = useComponentState();
  const { output, loading, error, mutate } = useTaskMutation({
    slug: "demo_list_github_pull_requests",
    params: { user: userName.value },
  });

  return (
    <Stack spacing="xl">
      <Title>GitHub Pull Request Dashboard</Title>
      <Stack direction="row" align="end">
        <TextInput
          id={userName.id}
          label="Username"
          placeholder="Type a GitHub username"
          error={error?.message}
        />
        <Button
          onClick={() => mutate()}
          loading={loading}
          disabled={!userName.value}
        >
          Search
        </Button>
      </Stack>

      {output && !error && (
        <Stack direction="row">
          <Stack.Item width={{ xs: "100%", lg: "50%" }}>
            <Card sx={{ height: 500, overflow: "auto" }}>
              <Stack>
                <Title order={3}>Open PRs</Title>
                {output.authored.map((pr) => (
                  <PR pr={pr} />
                ))}
                {!output.authored.length && <Text size="xl">None</Text>}
              </Stack>
            </Card>
          </Stack.Item>

          <Stack.Item width={{ xs: "100%", lg: "50%" }}>
            <Card sx={{ height: 500, overflow: "auto" }}>
              <Stack>
                <Title order={3}>Approved PRs</Title>
                {output.approved.map((pr) => (
                  <PR pr={pr} />
                ))}
                {!output.approved.length && <Text size="xl">None</Text>}
              </Stack>
            </Card>
          </Stack.Item>

          <Stack.Item width={{ xs: "100%", lg: "50%" }}>
            <Card sx={{ height: 500, overflow: "auto" }}>
              <Stack>
                <Title order={3}>To Review</Title>
                {output.toReview.map((pr) => (
                  <PR pr={pr} />
                ))}
                {!output.toReview.length && <Text size="xl">None</Text>}
              </Stack>
            </Card>
          </Stack.Item>
        </Stack>
      )}
    </Stack>
  );
};

const PR = ({ pr }) => {
  return (
    <Card>
      <Stack direction="row" justify="space-between">
        <>
          <Link size="md" href={pr.url}>
            {pr.title}
          </Link>
          <Text sx={{ maxWidth: 600 }}>{`${pr.body.substring(0, 200)}${
            pr.body.length > 100 ? "..." : ""
          }`}</Text>
          <Stack direction="row" align="center" spacing="sm">
            {pr.avatar && <Image width={16} src={pr.avatar} />}
            <Text size="sm">{pr.author}</Text>
          </Stack>
        </>
        <Text>{`Comments: ${pr.numComments}`}</Text>
      </Stack>
    </Card>
  );
};

export default GitHubPRDashboard;
