"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado (demo).");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left column: stacked content */}
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <h2 className={styles.title}>Ponete en contacto con nosotras</h2>

            <p className={styles.lead}>
              Envíanos un mensaje con tu consulta o información. Nuestro equipo
              te responderá lo más pronto posible.
            </p>
            <p className={styles.lead}>
              Si querés unirte a La Grupa como miembra, escribinos una solicitud a{" "}
              <a href="mailto:lagrupa.dk@gmail.com">lagrupa.dk@gmail.com</a>
            </p>
            <p className={styles.lead}>
              Estamos abiertas a todas las propuestas constructivas. Si tenés
              ideas que te gustaría compartir, nos encantará leerlas.
            </p>

            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.label} htmlFor="name">
                Nombre <span className={styles.req}>(obligatorio)</span>
              </label>
              <input
                id="name"
                name="name"
                className={styles.input}
                value={form.name}
                onChange={onChange}
                required
              />

              <label className={styles.label} htmlFor="email">
                Email <span className={styles.req}>(obligatorio)</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className={styles.input}
                value={form.email}
                onChange={onChange}
                required
              />

              <label className={styles.label} htmlFor="message">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                rows={6}
                value={form.message}
                onChange={onChange}
                required
              />

              <button type="submit" className={styles.button}>
                Enviar
              </button>
            </form>
          </div>
        </div>

        {/* Right column: image fills height on desktop */}
        <div className={styles.right}>
          <div className={styles.imageWrap}>
            <Image
              src="/contact.jpg"                 
              alt="Copenhague"
              fill
              sizes="(min-width: 900px) 50vw, 100vw"
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
