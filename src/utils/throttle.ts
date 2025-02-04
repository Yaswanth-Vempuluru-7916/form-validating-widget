// src/utils/throttle.ts
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
    let lastCall = 0;
    let timer: ReturnType<typeof setTimeout>;
  
    return ((...args: any[]) => {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), limit);
      }
    }) as T;
  }
  