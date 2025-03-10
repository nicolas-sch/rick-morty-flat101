import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../components/Form";

global.fetch = jest.fn();

describe("Form Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should render the form with all fields", () => {
    render(<Form />);

    expect(screen.getByLabelText(/Nombre:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comentario:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Enviar comentario/i })
    ).toBeInTheDocument();
  });

  it("should update input values when typing", () => {
    render(<Form />);

    const nameInput = screen.getByLabelText(/Nombre:/i);
    const emailInput = screen.getByLabelText(/Correo electrónico:/i);
    const commentInput = screen.getByLabelText(/Comentario:/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.change(commentInput, {
      target: { value: "Este es un comentario de prueba." },
    });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("johndoe@example.com");
    expect(commentInput.value).toBe("Este es un comentario de prueba.");
  });

  it("should show success message when form is submitted successfully", async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    render(<Form />);

    fireEvent.change(screen.getByLabelText(/Nombre:/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico:/i), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Comentario:/i), {
      target: { value: "Este es un comentario de prueba." },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar comentario/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/¡Comentario enviado con éxito!/i)
      ).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Nombre:/i).value).toBe("");
    expect(screen.getByLabelText(/Correo electrónico:/i).value).toBe("");
    expect(screen.getByLabelText(/Comentario:/i).value).toBe("");
  });

  it("should show error message when form submission fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    render(<Form />);

    fireEvent.change(screen.getByLabelText(/Nombre:/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico:/i), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Comentario:/i), {
      target: { value: "Este es un comentario de prueba." },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar comentario/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });

  it("should disable button and show loading text while submitting", async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    render(<Form />);

    fireEvent.change(screen.getByLabelText(/Nombre:/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico:/i), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Comentario:/i), {
      target: { value: "Este es un comentario de prueba." },
    });

    const submitButton = screen.getByRole("button", {
      name: /Enviar comentario/i,
    });

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/Enviando.../i);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent(/Enviar comentario/i);
    });
  });
});
