import React, { useState } from "react";

interface ReasonInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const ReasonInput: React.FC<ReasonInputProps> = ({
  placeholder = "Writer summary of reason for shock/surprise/annoyance goes here",
  value,
  onChange,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-gray-200 rounded-3xl border border-gray-300 p-6">
        <div className="bg-white rounded-3xl p-6 ">
          <textarea
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full h-10 resize-none border-none
             outline-none text-gray-700 placeholder-gray-500 
             text-sm leading-relaxed bg-transparent"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};
