"use client";
import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado (demo).");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contáctanos</h2>
        <p className={styles.info}>
          Escribinos para sumarte a nuestras actividades o hacer cualquier consulta.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Nombre</label>
            <input
              id="name"
              className={styles.input}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              className={styles.input}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              className={styles.textarea}
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button className={styles.button} type="submit">Enviar</button>
        </form>

        <div className={styles.details}>
          <p><strong>Email:</strong> lagrupa.dk@gmail.com</p>
          <p><strong>Redes sociales:</strong> (agregar enlaces)</p>
        </div>
      </div>
    </section>
  );
}
