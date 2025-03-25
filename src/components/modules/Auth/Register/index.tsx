"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Fragment } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import loginBanner from "@/assets/reading-books.jpg";

export default function RegisterForm() {
  const form = useForm({
    // resolver: zodResolver(loginValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Fragment>
      <div
        className="flex min-h-screen items-center justify-center bg-cover bg-center p-4"
        style={{ backgroundImage: `url(${loginBanner.src})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60" /> {/* Overlay */}
        <Card className="relative w-full max-w-md md:p-6 shadow-xl z-10">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl font-bold text-center text-[#100E18]">
              Register for an Account
              <div className="flex justify-center mt-4">
                <Link href="/" className="block">
                  <Image src={logo} alt="logo" width={100} height={100} />
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full mt-4 bg-[#F65D4E] hover:bg-[#D84C3F] text-white text-lg cursor-pointer"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </form>
            </FormProvider>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
}
