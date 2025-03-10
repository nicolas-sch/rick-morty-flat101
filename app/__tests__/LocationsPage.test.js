import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { LocationsProvider } from "../context/LocationsContext";
import LocationsPage from "../locations/page";
import axios from "axios";

jest.mock("axios");

describe("LocationsPage", () => {
  it("should render locations page with list of locations", async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          {
            id: 1,
            name: "Earth",
            type: "Planet",
            dimension: "Dimension C-137",
          },
          {
            id: 2,
            name: "Citadel of Ricks",
            type: "Space Station",
            dimension: "Unknown",
          },
        ],
      },
    });

    render(
      <LocationsProvider>
        <LocationsPage />
      </LocationsProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Lista de Ubicaciones/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/Earth/i)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
  });
});
