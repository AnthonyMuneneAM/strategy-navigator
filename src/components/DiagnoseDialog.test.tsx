import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import DiagnoseDialog from "./DiagnoseDialog";
import { mockedEscalation } from "@/data/butlerAI";

describe("DiagnoseDialog", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("routes a hero breadcrumb click into the matching Q2 qualification flow", () => {
    render(
      <DiagnoseDialog
        isOpen={true}
        onClose={() => {}}
        initialProblem="Improve customer experience"
      />
    );

    act(() => {
      vi.runAllTimers();
    });

    expect(
      screen.getByText("Customer experience — great focus. Where are you in that journey right now?")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Exploring / defining the problem" })).toBeInTheDocument();
  });

  it("uses the exact Anthony contact email in the escalation mock", () => {
    expect(mockedEscalation.contact.email).toBe("Anthony.Mwangi@DigitalQatalyst.com");
  });
});
