"use client";

import { useState } from "react";
import styles from "../styles/Form.module.css";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      name,
      email,
      comment,
    };

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar el comentario");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setComment("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Deja tu comentario</h2>

      {success && (
        <p className={styles.successMessage}>¡Comentario enviado con éxito!</p>
      )}
      {error && <p className={styles.errorMessage}>Error: {error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={styles.label}>
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className={styles.label}>
            Correo electrónico:
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="comment" className={styles.label}>
            Comentario:
          </label>
          <textarea
            id="comment"
            className={styles.textarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            maxLength={500}
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Enviando..." : "Enviar comentario"}
        </button>
      </form>
    </div>
  );
}
