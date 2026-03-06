import { motion, AnimatePresence } from "motion/react";

interface CommentaryProps {
  text: string;
  className?: string;
}

export function Commentary({ text, className }: CommentaryProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        <div className="relative rounded-xl border border-yellow-500/30 bg-black/60 px-4 py-3">
          <div className="absolute -top-2 left-6 h-0 w-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-yellow-500/30" />
          <p className="text-center text-sm text-yellow-100">{text}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
