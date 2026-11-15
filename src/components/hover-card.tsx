"use client";

import { motion } from "motion/react";

export function HoverCard({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-foreground/70">{body}</p>
    </motion.div>
  );
}
