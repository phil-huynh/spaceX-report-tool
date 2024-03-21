import { useState, useEffect } from "react";

function getSavedValue(key: string , initialValue: string | object) {
  const savedValue = JSON.parse(localStorage.getItem(key) || '')
  if (savedValue) {
    return savedValue;
  }
  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
}

export default function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}