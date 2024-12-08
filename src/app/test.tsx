"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";

interface Option {
  id: string;
  location: string;
  //   label: string;
}

interface FormValues {
  search: string;
  selectedOption: string;
}

const SearchableSelectInput: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");

  const form = useForm<FormValues>({
    defaultValues: {
      search: "",
      selectedOption: "",
    },
  });

  const FETCH_LOCATIONS = gql`
    query FetchLocations($q: String!) {
      fetchLocations(q: $q) {
        id
        location
        postcode
        state
      }
    }
  `;

  const [fetchLocations] = useLazyQuery(FETCH_LOCATIONS, {
    onCompleted: (data) => {
      setOptions(data.fetchLocations);
    },
  });

  // Fetch dynamic options after 3+ characters are typed
  useEffect(() => {
    if (inputValue.length > 3) {
      fetchLocations({ variables: { q: inputValue } });
    } else {
      setOptions([]); // Clear options if less than 4 characters
    }
  }, [fetchLocations, inputValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    form.setValue("search", e.target.value);
  };

  const handleSelect = (value: string) => {
    form.setValue("selectedOption", value);
  };

  const onSubmit = (values: FormValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Search Input with Dropdown */}
        <FormField
          name="search"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Search & Select Option</FormLabel>
              <FormControl>
                <input
                  type="text"
                  placeholder="Start typing..."
                  value={inputValue}
                  onChange={handleSearchChange}
                  className="w-full p-2 border rounded"
                />
              </FormControl>
              <div className="relative">
                <Select onValueChange={handleSelect}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </Form>
  );
};

export default SearchableSelectInput;
