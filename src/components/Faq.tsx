"use client";
import { useState } from "react";
import styles from "./Faq.module.css";

const faqs = [
  {
    question: "¿Qué es La Grupa?",
    answer: "La Grupa es una colectiva de mujeres migrantes en Dinamarca que se organiza para crear comunidad, acompañarse mutuamente y compartir recursos, saberes y cuidados."
  },
   {
    question: "¿Quiénes pueden participar en La Grupa?",
    answer: "Cualquier mujer migrante, en todas sus diversidades, que viva en Dinamarca y quiera formar parte de una red de apoyo feminista, horizontal y antirracista."
  },
  {
    question: "¿Qué tipo de actividades hacen?",
    answer: "Organizamos talleres para mujeres (como costura, escritura, autocuidado), encuentros para conversar y compartir experiencias, y también acompañamientos personales o colectivos en situaciones de dificultad."
  },
  {
    question: "¿Cómo puedo sumarme?",
    answer: "Si querés unirte a La Grupa como miembra, escribinos a lagrupa.dk@gmail.com"
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Preguntas Frecuentes</h2>

        {faqs.map((faq, i) => (
          <div key={i} className={styles.item}>
            <button
              className={styles.question}
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
            >
              {faq.question}
              <span className={styles.icon}>
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && <p className={styles.answer}>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
