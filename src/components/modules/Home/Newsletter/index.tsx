"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { toast } from "sonner";
import { addNewsletter } from "@/services/Newsletter";

export default function NewsletterSection() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    try {
      const response = await addNewsletter(data);
      if (response?.success) {
        toast.success(
          "📩 You’re subscribed! Expect great updates in your inbox"
        );
        form.reset();
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section
      className="w-full my-12 px-4 py-10 flex justify-center items-center relative bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dvpqm6zct/image/upload/v1743186743/banner_h4gxhf.jpg")',
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      {/* Overlay */}
      <div className="max-w-2xl w-full text-center relative z-10">
        <h2 className="text-xl font-bold text-white mb-4">
          JOIN OUR NEWSLETTER NOW
        </h2>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-end gap-4 justify-center">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 text-lg font-semibold">
                        Your Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email address"
                          className="text-white placeholder:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="bg-[#F65D4E] hover:bg-[#D84C3F] text-white cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                Subscribe
              </Button>
            </div>
          </form>
        </FormProvider>
        <p className="text-sm text-white font-medium mt-2">
          Stay Updated with Our Latest Books and Offers
        </p>
      </div>
    </section>
  );
}
