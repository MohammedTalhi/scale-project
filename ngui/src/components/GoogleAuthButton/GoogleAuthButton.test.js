import React from "react";
import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import GoogleAuthButton from "./GoogleAuthButton";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <GoogleAuthButton messageId="hystax" />
    </TestProvider>
  );
  root.unmount();
});
