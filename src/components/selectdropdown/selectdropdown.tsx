"use client";

import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FETCH_LOCATIONS } from "@/app/graphql";
import { Label } from "@/components/ui/label"; // Import the Shadcn Label component
import { AusLocation } from "@/app/interface";
import toast from "react-hot-toast";

interface ISelectOption {
  onSelectedOption: (data: AusLocation) => void;
}

export default function Autocomplete({ onSelectedOption }: ISelectOption) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<AusLocation[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fetchLocations] = useLazyQuery(FETCH_LOCATIONS, {
    onCompleted: (data) => {
      setOptions(data.fetchLocations);
      setLoading(false);
      setOpenDropdown(data.fetchLocations.length > 0);
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const handleInputChange = async (value: string) => {
    setInputValue(value);
    setOptions([]);
    setOpenDropdown(false);

    if (value.length > 2) {
      setLoading(true);
      fetchLocations({ variables: { q: value } });
    }
  };

  return (
    <div className={`relative mt-3 w-full ${openDropdown ? "pb-16" : ""}`}>
      <Label htmlFor="location-input" className="block text-lg font-medium">
        Location
      </Label>
      <input
        id="location-input"
        type="text"
        value={inputValue}
        placeholder="Search your address"
        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {loading && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-300 bg-white p-4 text-center shadow-lg">
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      )}
      {!loading && options.length === 0 && inputValue.length > 2 && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-300 bg-white p-4 text-center shadow-lg">
          <p className="text-sm text-gray-500">No matches found</p>
        </div>
      )}
      {options.length > 0 && openDropdown && (
        <div className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {options.map((option) => (
            <div
              className="cursor-pointer px-4 py-2 hover:bg-blue-100"
              key={option.id}
              onClick={() => {
                setInputValue(option.location);
                setOpenDropdown(false);
                onSelectedOption(option);
              }}
            >
              <p className="text-sm text-gray-700">{option.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
