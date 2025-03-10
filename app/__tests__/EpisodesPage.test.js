import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import { EpisodesProvider } from "../context/EpisodesContext";
import EpisodesPage from "../episodes/page";
import axios from "axios";

jest.mock("axios");

describe("EpisodesPage", () => {
  it("should render episodes page with list of episodes", async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { id: 1, name: "Pilot", air_date: "December 2, 2013" },
          { id: 2, name: "Lawnmower Dog", air_date: "December 9, 2013" },
          { id: 3, name: "Anatomy Park", air_date: "December 16, 2013" },
        ],
      },
    });

    render(
      <EpisodesProvider>
        <EpisodesPage />
      </EpisodesProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Lista de Episodios/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/Pilot/i)).toBeInTheDocument();
    expect(screen.getByText(/Lawnmower Dog/i)).toBeInTheDocument();
    expect(screen.getByText(/Anatomy Park/i)).toBeInTheDocument();
  });
});
