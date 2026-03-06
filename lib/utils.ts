import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function battleUrl(slug1: string, slug2: string): string {
  return `/battle/${slug1}-${slug2}`;
}

export function baseUrl(): string {
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.NEXT_PUBLIC_BASE_URL ?? "https://mrrarena.com";
}
