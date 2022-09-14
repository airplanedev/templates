import { Octokit } from "octokit";

type Params = {
  user: string;
};

// Put the main logic of the task in this function.
export default async function (params: Params) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_API_KEY,
  });

  const createdPullRequests = octokit.request("GET /search/issues", {
    q: `is:open is:pr author:${params.user}`,
  });
  const approvedPullRequests = octokit.request("GET /search/issues", {
    q: `is:open is:pr author:${params.user} review:approved`,
  });
  const reviewPullRequests = octokit.request("GET /search/issues", {
    q: `is:open is:pr review-requested:${params.user}`,
  });

  const [
    createdPullRequestsResponse,
    reviewPullRequstsResponse,
    approvedPullRequestsResponse,
  ] = await Promise.all([
    createdPullRequests,
    reviewPullRequests,
    approvedPullRequests,
  ]);

  if (approvedPullRequestsResponse.status)

  const approved =
    approvedPullRequestsResponse.data.items.map(getPullRequestResult);
  const authored = createdPullRequestsResponse.data.items
    .map(getPullRequestResult)
    .filter(
      (authoredPR) =>
        !approved.some(
          (approvedPR) =>
            approvedPR.pullRequstNumber === authoredPR.pullRequstNumber
        )
    );
  const toReview =
    reviewPullRequstsResponse.data.items.map(getPullRequestResult);

  // Outputs documentation: https://docs.airplane.dev/tasks/outputs
  return { authored, toReview, approved };
}

const getPullRequestResult = (item) => {
  return {
    author: item.user?.login ?? "",
    title: item.title,
    body: item.body ?? "",
    url: item.html_url,
    numComments: item.comments,
    pullRequstNumber: item.number,
    avatar: item.user?.avatar_url ?? "",
  };
};
