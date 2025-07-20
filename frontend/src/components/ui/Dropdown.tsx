"use client";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface DropdownProps {
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
  className?: string;
  maxWidth?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  error,
  className = "",
  maxWidth = "max-w-xs",
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(value || null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`w-full ${maxWidth} ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium">{label}</label>
      )}
      <div className="relative">
        <div
          role="button"
          className={`btn w-full flex justify-between items-center bg-transparent ${
            error ? "border-red-500" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected
            ? options.find((opt) => opt.value === selected)?.label
            : "Select an option"}
          <span
            className={`transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <BiChevronDown className="w-5 h-5" />
          </span>
        </div>
        {isOpen && (
          <ul
            className="absolute left-0 mt-2 w-full dropdown-content menu bg-base-100 rounded-box shadow"
            style={{ zIndex: 10000 }}
          >
            {options.map((option) => (
              <li key={option.value} onClick={() => handleSelect(option.value)}>
                <a>{option.label}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Dropdown;
