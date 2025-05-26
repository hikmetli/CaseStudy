import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterEmptyValues(values: object) {
  const filteredValues = Object.fromEntries(
    Object.entries(values).filter(([_, value]) => value !== '' && value !== null && value !== undefined && value.length !== 0)
  );
  return filteredValues;
}