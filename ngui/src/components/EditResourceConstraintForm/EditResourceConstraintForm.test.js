import React from "react";
import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import EditResourceConstraintForm from "./EditResourceConstraintForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <EditResourceConstraintForm
        constraintType="ttl"
        constraintLimit={0}
        constraintId="id"
        onSubmit={jest.fn}
        onSuccess={jest.fn}
        onCancel={jest.fn}
      />
    </TestProvider>
  );
  root.unmount();
});
