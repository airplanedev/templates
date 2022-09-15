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
} from "@airplane/views";

// Views documentation: https://docs.airplane.dev/views/getting-started
const GitHubPRDashboard = () => {
  const userName = useComponentState();
  const search = useComponentState();

  const output = search.result?.output;
  const error = search.result?.error

  return (
    <Stack spacing="xl">
      <Title>GitHub Pull Request Dashboard</Title>
      <Stack direction="row" align="end">
        <TextInput
          id={userName.id}
          label="Username"
          placeholder="Type a GitHub username"
        />
        <Button
          id={search.id}
          task={{
            slug: "demo_list_github_pull_requests",
            params: { user: userName.value },
          }}
          disabled={!userName.value}
        >
          Search
        </Button>
      </Stack>

      {output && !error && (
        <Stack direction="row" spacing="lg">
          <Stack.Item width={{ xs: "100%", lg: "50%" }}>
            <Card
              radius="xs"
              shadow="xs"
              sx={{ height: 500, overflow: "auto" }}
            >
              <Stack>
                <Title order={3}>‍💻 Open PRs</Title>
                {output.authored.map((pr) => (
                  <PR pr={pr} />
                ))}
                {!output.authored.length && <Text size="xl">None</Text>}
              </Stack>
            </Card>
          </Stack.Item>

          <Stack.Item width={{ xs: "100%", lg: "50%" }}>
            <Card
              radius="xs"
              shadow="xs"
              sx={{ height: 500, overflow: "auto" }}
            >
              <Stack>
                <Title order={3}>✅ Approved PRs</Title>
                {output.approved.map((pr) => (
                  <PR pr={pr} />
                ))}
                {!output.approved.length && <Text size="xl">None</Text>}
              </Stack>
            </Card>
          </Stack.Item>

          <Stack.Item width={{ xs: "100%", lg: "50%" }}>
            <Card
              radius="xs"
              shadow="xs"
              sx={{ height: 500, overflow: "auto" }}
            >
              <Stack>
                <Title order={3}>✏️ To Review</Title>
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
        <Link size="md" href={pr.url}>
          {pr.title}
        </Link>
        <Text color="gray.5">{`Comments: ${pr.numComments}`}</Text>
      </Stack>
      <Text sx={{ maxWidth: 600 }}>{`${pr.body.substring(0, 200)}${
        pr.body.length > 100 ? "..." : ""
      }`}</Text>
      <Stack direction="row" align="center" spacing="sm">
        {pr.avatar && <Image width={16} src={pr.avatar} />}
        <Text size="sm">{pr.author}</Text>
      </Stack>
    </Card>
  );
};

export default GitHubPRDashboard;