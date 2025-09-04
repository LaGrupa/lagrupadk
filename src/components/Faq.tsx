"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Faq.module.css";
import { useT } from "@/i18n";

type FaqItem = { q: string; a: string };

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

  // Measure content height and keep it updated
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
        <span className={styles.icon}>{open ? "−" : "+"}</span>
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

export default function Faq() {
  const { t, ts } = useT("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Get items from JSON; fallback to empty array
  const items = t<FaqItem[]>("items") ?? [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{ts("title")}</h2>

        <div className={styles.list}>
          {Array.isArray(items) &&
            items.map((f, i) => (
              <Item
                key={i}
                id={`faq-item-${i}`} // stable, ID-safe
                q={f.q}
                a={f.a}
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




