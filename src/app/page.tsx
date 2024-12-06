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

const Home = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formSchema = z.object({
    suburb: z.string().min(2),
    postcode: z.string().min(2),
    state: z.string().min(2),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      suburb: "",
      postcode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Navigation Bar */}
        <Navigation />

        {/*Main Content */}
        <div className="p-6">
          <div className="max-w-[460px]">
            <div className="text-2rem font-semibold">Validate your address</div>
            <div className="mt-4 font-medium text-neutral-500">
              Enter your suburb address, state and postcode to validate the
              address
            </div>
            <div className="mt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col text-base"
                >
                  <FormField
                    control={form.control}
                    name="suburb"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="required">
                          suburb Address
                        </FormLabel>
                        <FormControl>
                          <input
                            className="mt-3 w-full rounded-sm border border-[#4B5565] px-4 py-3"
                            placeholder="Enter your suburb address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postcode"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel className="required font-medium">
                          postcode
                        </FormLabel>
                        <FormControl>
                          <input
                            type="postcode"
                            className="mt-3 w-full rounded-sm border border-[#4B5565] px-4 py-3"
                            placeholder="Enter your postcode"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel className="required font-medium">
                          state
                        </FormLabel>
                        <FormControl>
                          <input
                            type="state"
                            className="mt-3 w-full rounded-sm border border-[#4B5565] px-4 py-3"
                            placeholder="Enter your state"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="mt-6 h-12 text-base font-medium"
                    type="submit"
                    disabled={!form.formState.isValid}
                  >
                    Validate
                    {isSubmitting && <p>Loading...</p>}
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
