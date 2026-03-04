"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/components/Faq.module.css";

type FaqItem = { question: string; answer: string };

function Item({
  id,
  q,
  a,
  open,
  onToggle,
}: {
  id: string;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => setH(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [q, a]);

  return (
    <div className={styles.item}>
      <button
        className={styles.question}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
      >
        {q}
        <span className={styles.icon}>{open ? "-" : "+"}</span>
      </button>

      <div
        id={id}
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

export default function FaqClient({
  title,
  items,
}: {
  title: string;
  items: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.list}>
          {items.map((f, i) => (
            <Item
              key={i}
              id={`faq-item-${i}`}
              q={f.question}
              a={f.answer}
              open={openIndex === i}
              onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
