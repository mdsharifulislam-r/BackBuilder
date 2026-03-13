import React, { useEffect, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  onChange: (selected: Option[]) => void;
  selectedItems?: Option[]
};

export default function MultiSelect({ options, onChange, selectedItems=[] }: MultiSelectProps) {
  
  const [selected, setSelected] = useState<Option[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setSelected(selectedItems)
  },[selectedItems])
  const toggleOption = (option: Option) => {
    let newSelected;

    const exists = selected.find((item) => item.value === option.value);

    if (exists) {
      newSelected = selected.filter((item) => item.value !== option.value);
    } else {
      newSelected = [...selected, option];
    }

    setSelected(newSelected);
    onChange(newSelected);
  };
  return (
    <div className="relative w-full">
      
      <div
        onClick={() => setOpen(!open)}
        className="border rounded-lg p-2 cursor-pointer bg-white"
      >
        {selected.length === 0 ? (
          <span className="text-gray-400">Select items</span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selected.map((item) => (
              <span
                key={item.value}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
              >
                {item.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="absolute mt-2 w-full border rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = selected.some(
              (item) => item.value === option.value
            );

            return (
              <div
                key={option.value}
                onClick={() => toggleOption(option)}
                className={`p-2 cursor-pointer hover:bg-gray-100 flex justify-between ${
                  isSelected ? "bg-blue-50" : ""
                }`}
              >
                {option.label}

                {isSelected && (
                  <span className="text-blue-500 font-bold">✓</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}