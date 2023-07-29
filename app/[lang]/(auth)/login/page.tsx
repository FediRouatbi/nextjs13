"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { RefObject, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { data } from "autoprefixer";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

export const revalidate = 1;
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type Schema = z.infer<typeof loginSchema>;

function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<Schema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const signin = async (data: Schema) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          password: data.password,
          email: data.email,
        }),
      });
      router.push("/main");
    } catch (err) {}

    setLoading(false);
  };
  console.log(methods.formState);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(signin)}
        className="container max-w-md mt-10"
      >
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={loading} size="fullWidth" type="submit">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}

export default Page;
