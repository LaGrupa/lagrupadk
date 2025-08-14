"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Faq.module.css";

const faqs = [
  {
    question: "¿Qué es La Grupa?",
    answer:
      "La Grupa es una colectiva de mujeres migrantes en Dinamarca que se organiza para crear comunidad, acompañarse mutuamente y compartir recursos, saberes y cuidados.",
  },
  {
    question: "¿Quiénes pueden participar en La Grupa?",
    answer:
      "Cualquier mujer migrante, en todas sus diversidades, que viva en Dinamarca y quiera formar parte de una red de apoyo feminista, horizontal y antirracista.",
  },
  {
    question: "¿Qué tipo de actividades hacen?",
    answer:
      "Organizamos talleres para mujeres (como costura, escritura, autocuidado), encuentros para conversar y compartir experiencias, y también acompañamientos personales o colectivos en situaciones de dificultad.",
  },
  {
    question: "¿Cómo puedo sumarme?",
    answer:
      "Si querés unirte a La Grupa como miembra, escribinos a lagrupa.dk@gmail.com",
  },
];

function Item({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [h, setH] = useState(0);

  // measure content height and keep it updated
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const set = () => setH(el.scrollHeight);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [q, a]);

  return (
    <div className={styles.item}>
      <button
        className={styles.question}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={q}
      >
        {q}
        <span className={styles.icon}>{open ? "−" : "+"}</span>
      </button>

      <div
        id={q}
        className={styles.panel}
        style={{ height: open ? h : 0 }}
        aria-hidden={!open}
      >
        <div ref={innerRef} className={styles.panelInner}>
          <p className={styles.answer}>{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Preguntas Frecuentes</h2>

        <div className={styles.list}>
          {faqs.map((f, i) => (
            <Item
              key={i}
              q={f.question}
              a={f.answer}
              open={openIndex === i}
              onToggle={() =>
                setOpenIndex((prev) => (prev === i ? null : i))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}


