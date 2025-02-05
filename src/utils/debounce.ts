// src/utils/debounce.ts
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timer: ReturnType<typeof setTimeout>; // ✅ Works in both Node.js & browser
    return ((...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    }) as T;
  }