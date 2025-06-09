import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/svelte";
import Page from "./+page.svelte";

describe("/+page.svelte", () => {
  test("should render nav", () => {
    render(Page);
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });
  test("should render main", () => {
    render(Page);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  });
});
