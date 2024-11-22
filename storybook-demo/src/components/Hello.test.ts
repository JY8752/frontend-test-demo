import { composeStories } from "@storybook/vue3";
import * as stories from "../stories/Hello.stories";
import { screen, waitFor } from "@testing-library/vue";
import { handleMe, handlers } from "../__mock__/me/msw";
import { setupMockServer } from "../test/setup";

describe("Default", () => {
  setupMockServer(...handlers);
  test("Default", async () => {
    const { Default } = composeStories(stories);
    await Default.run();
    await waitFor(() => expect(screen.getByText("user")).toBeInTheDocument());
  });
});

describe("Error", () => {
  setupMockServer(handleMe({ status: 500 }));
  test("500", async () => {
    const { Error } = composeStories(stories);
    await Error.run();
    await waitFor(() => expect(screen.getByText("APIエラー: 500")).toBeInTheDocument());
  })
});

describe("Loading", () => {
  setupMockServer(handleMe({ delay: 1000 }));
  test("1000ms", async () => {
    const { Loading } = composeStories(stories);
    await Loading.run();
    await waitFor(() => expect(screen.getByText("Loading...")).toBeInTheDocument());
  });
});
