import React from "react";
import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import MlRunDuration from "./MlRunDuration";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <MlRunDuration durationInSeconds={123} />
    </TestProvider>
  );
  root.unmount();
});
