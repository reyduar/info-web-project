import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const Alert = ({ type, message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer); // Cleanup el timeout al desmontar el componente
  }, [duration]);

  if (!visible) return null;

  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  return (
    <div
      className={`border-l-4 p-4 mb-4 rounded ${alertStyles[type]}`}
      role="alert"
    >
      <p className="font-bold">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </p>
      <p>{message}</p>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning"]).isRequired,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number, // Tiempo que se mostrará la alerta (opcional)
};
