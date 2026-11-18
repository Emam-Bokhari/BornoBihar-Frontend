"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addSupportSchema } from "./addSupport.validation";
import { toast } from "sonner";
import { addSupport } from "@/services/Support";
import { HelpCircle, Send, Clock } from "lucide-react";

export default function AddSupportForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      issueType: "",
      issueDescription: "",
    },
    resolver: zodResolver(addSupportSchema),
  });

  const issueTypeOptions = [
    { value: "orderIssue", label: "Order Issue" },
    { value: "shippingIssue", label: "Shipping Issue" },
    { value: "returns", label: "Returns & Refund" },
    { value: "technicalSupports", label: "Technical Support" },
    { value: "other", label: "Other" },
  ];

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await addSupport(data);

      if (response?.success) {
        toast.success(
          "Thank you! Your support message has been sent. We'll get back to you soon."
        );
        form.reset();
      } else {
        toast.error(response?.error?.[0]?.message || "Failed to submit request");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-4 space-y-6 pb-12">
      <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
        {/* Header matching dashboard standard */}
        <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#F65D4E]" />
                Customer Support & Assistance
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Submit your question, order issue, or feedback, and our support team will get back to you shortly.
              </CardDescription>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 flex items-center gap-1.5 self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5 text-[#F65D4E]" />
              Response within 24h
            </span>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-5 sm:p-6">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm font-medium text-foreground">
                        Full Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. John Doe"
                          className="h-10 text-xs sm:text-sm rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus-visible:ring-1 focus-visible:ring-[#F65D4E]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm font-medium text-foreground">
                        Email Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="e.g. name@example.com"
                          className="h-10 text-xs sm:text-sm rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus-visible:ring-1 focus-visible:ring-[#F65D4E]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 2: Phone Number & Issue Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm font-medium text-foreground">
                        Phone Number{" "}
                        <span className="text-xs text-muted-foreground font-normal">
                          (Optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. +880 1XXXXXXXXX"
                          className="h-10 text-xs sm:text-sm rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus-visible:ring-1 focus-visible:ring-[#F65D4E]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issueType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm font-medium text-foreground">
                        Issue Category <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 text-xs sm:text-sm rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-[#F65D4E]">
                            <SelectValue placeholder="Select an issue category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {issueTypeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-xs sm:text-sm"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 3: Issue Description */}
              <FormField
                control={form.control}
                name="issueDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-medium text-foreground">
                      Detailed Description <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Please describe your problem or question in detail..."
                        className="text-xs sm:text-sm rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus-visible:ring-1 focus-visible:ring-[#F65D4E] min-h-[160px] resize-y"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground order-2 sm:order-1">
                  Fields marked with <span className="text-red-500">*</span> are required.
                </p>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-10 px-6 text-xs sm:text-sm font-medium bg-[#F65D4E] hover:bg-[#D84C3F] text-white rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-2 transition-colors order-1 sm:order-2"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Submitting..." : "Submit Support Request"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
