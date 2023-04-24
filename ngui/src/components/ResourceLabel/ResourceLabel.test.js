import React from "react";
import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ResourceLabel from "./ResourceLabel";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ResourceLabel cloudResourceIdentifier="cloudResourceIdentifier" />
    </TestProvider>
  );
  root.unmount();
});
