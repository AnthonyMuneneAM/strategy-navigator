import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("does not show the TMaaS AI Demo link", () => {
    render(<Navbar />);

    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.queryByText("TMaaS AI Demo")).not.toBeInTheDocument();
  });
});
