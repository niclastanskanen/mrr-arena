export async function triggerConfetti(opts?: {
  particleCount?: number;
  spread?: number;
}) {
  const { default: confetti } = await import("canvas-confetti");
  confetti({
    particleCount: opts?.particleCount ?? 100,
    spread: opts?.spread ?? 70,
    origin: { y: 0.6 },
  });
}
