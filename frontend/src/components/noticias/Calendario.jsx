import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

export const Calendario = ({ control }) => {
  const [startDate, setStartDate] = useState(null);

  return (
    <Controller
      control={control}
      name="publishDate"
      render={({ field }) => (
        <DatePicker
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            field.onChange(date);
          }}
          placeholderText="Selecciona una fecha"
          dateFormat="yyyy/MM/dd"
        />
      )}
    />
  );
};
