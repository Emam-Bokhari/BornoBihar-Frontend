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
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import loginBanner from "@/assets/reading-books.jpg";
import { loginSchema } from "./login.validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
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

  // function to prefill the form for "User"
  const handleUserButtonClick = () => {
    setValue("email", "user@gmail.com");
    setValue("password", "user123");
  };

  // function to prefill the form for "Admin"
  const handleAdminButtonClick = () => {
    setValue("email", "admin@gmail.com");
    setValue("password", "admin123");
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
              Login to Your Account
              <div className="flex justify-center mt-4 ">
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
                <div className="flex flex-col gap-4 md:flex-row">
                  <Button
                    onClick={handleUserButtonClick}
                    type="submit"
                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white flex-1"
                  >
                    User
                  </Button>
                  <Button
                    onClick={handleAdminButtonClick}
                    type="submit"
                    className="cursor-pointer bg-green-600 hover:bg-green-700 text-white flex-1"
                  >
                    Admin
                  </Button>
                </div>

                <Separator />
                <p className="text-center mt-0 text-[#989BA4]">or Login with</p>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  {isSubmitting ? "Logging..." : "Login"}
                </Button>
              </form>
            </FormProvider>
            <p className="text-center text-sm text-gray-600 mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
}
