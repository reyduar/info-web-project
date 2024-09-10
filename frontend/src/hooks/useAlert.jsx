import { useState } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState({ type: "", message: "" });

  const triggerAlert = (type, message, duration) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, duration);
  };

  return [alert, triggerAlert];
};
