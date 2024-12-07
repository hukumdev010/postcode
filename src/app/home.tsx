"use client";
import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import Sidebar from "./sidebar";
import Navigation from "./navigation";
import SelectDropDown from "@/components/selectdropdown/selectdropdown";

const Home = () => {
  const [selectedOption, setSelectedOption] = React.useState({});

  const formSchema = z.object({
    postcode: z.string().min(2),
    state: z.string().min(2),
  });

  console.log("selectedOption", selectedOption);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postcode: "",
      state: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("hello this si thevalues, ", values);
  }

  console.log("errors", form.formState.errors);
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Navigation Bar */}
        <Navigation />

        {/* Main Content */}
        <div className="p-6">
          <div className=" max-w-4xl bg-white rounded-lg shadow-lg p-8">
            {/* Heading */}
            <div className="text-3xl font-bold text-gray-900">
              Validate the Address
            </div>
            <div className="mt-2 text-base text-gray-600">
              Enter the suburb, state, and postcode to validate your address.
            </div>

            {/* Form */}
            <div className="mt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  {/* Suburb Field */}
                  <SelectDropDown
                    onSelectedOption={(data) => setSelectedOption(data)}
                  />

                  {/* Postcode Field */}
                  <FormField
                    control={form.control}
                    name="postcode"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="required text-lg font-medium text-gray-800">
                            Postcode
                          </FormLabel>
                        </div>
                        <FormControl>
                          <input
                            type="text"
                            placeholder="Enter your postcode"
                            className="w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* State Field */}
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="required text-lg font-medium text-gray-800">
                            State
                          </FormLabel>
                        </div>
                        <FormControl>
                          <input
                            type="text"
                            placeholder="Enter your state"
                            className="w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="mt-4 h-12 w-full rounded-md bg-blue-600 text-lg font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-400"
                    disabled={!form.formState.isValid}
                  >
                    Validate
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
