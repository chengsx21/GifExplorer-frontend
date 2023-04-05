import { useEffect, useState } from "react";

// Hook for using local storage
// Ref: https://upmostly.com/next-js/using-localstorage-in-next-js
export function useLocalStorage<T>(key: string, fallbackValue: T) {
    const [value, setValue] = useState(fallbackValue);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        setValue(stored ? JSON.parse(stored) : fallbackValue);
    }, [fallbackValue, key]);

    useEffect(() => {
        if (value === undefined) { // If value is set to undefined, remove it from localStorage
            localStorage.removeItem(key);
        } else { // Or update the localStorage value
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue] as const;
}