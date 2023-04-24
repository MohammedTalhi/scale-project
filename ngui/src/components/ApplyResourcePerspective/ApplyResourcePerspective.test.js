import React from "react";
import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ApplyResourcePerspective from "./ApplyResourcePerspective";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ApplyResourcePerspective perspectives={[]} onApply={jest.fn} onCancel={jest.fn} />
    </TestProvider>
  );
  root.unmount();
});
