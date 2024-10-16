"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [passwordVisible, setPasswordVisible] = useState(false)
  const router = useRouter();

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("User Data", values);
    setIsLoading(true);
    try {
      //TODO: Sign up using AppWrite and create plaid link token
      // Check if type is sign-in or sign-up

      if (type === "sign-up") {
        const newUser = await signUp(values);
        console.log("Appwrite Brudda", newUser);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: values.email,
          password: values.password,
        });

        console.log("Response", response);

        if (response) router.push("/");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="flex cursor-pointer items-center gap-1">
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="App Logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
          Vaultive
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/*Render PlaidLink   */}</div>
      ) : (
        <>
          {" "}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomFormField
                      control={form.control}
                      label="First Name"
                      name="firstname"
                      placeholder="Enter your first name"
                      type="text"
                    />
                    <CustomFormField
                      control={form.control}
                      label="Last Name"
                      name="lastname"
                      placeholder="Enter your last name"
                      type="text"
                    />
                  </div>
                  <CustomFormField
                    control={form.control}
                    label="Address"
                    name="address1"
                    placeholder="Enter your address"
                    type="text"
                  />
                  <CustomFormField
                    control={form.control}
                    label="City"
                    name="city"
                    placeholder="Enter your city"
                    type="text"
                  />
                  <div className="flex gap-4">
                    <CustomFormField
                      control={form.control}
                      label="State"
                      name="state"
                      placeholder="Example: NY"
                      type="text"
                    />
                    <CustomFormField
                      control={form.control}
                      label="Postal Code"
                      name="postalcode"
                      placeholder="Example: 11011 "
                      type="text"
                    />
                  </div>

                  <div className="flex gap-4">
                    <CustomFormField
                      control={form.control}
                      label="Date Of Birth"
                      name="dateofbirth"
                      placeholder="yyyy-mm-dd"
                      type="text"
                    />
                    <CustomFormField
                      control={form.control}
                      label="SSN"
                      name="ssn"
                      placeholder="Example: 1234"
                      type="text"
                    />
                  </div>
                </>
              )}
              <CustomFormField
                control={form.control}
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
              />
              <CustomFormField
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
              />

              <div className="flex flex-col gap-4">
                <Button disabled={isLoading} type="submit" className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
