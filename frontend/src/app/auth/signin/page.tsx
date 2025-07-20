"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { useLogin } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth";

// Validation schema
const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SigninFormData = z.infer<typeof signinSchema>;

function SigninPage() {
  const login = useLogin();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Redirect if already authenticated

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: SigninFormData) => {
    login.mutate(data, {
      onSuccess: () => {
        reset();
        router.push("/dashboard");
      },
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-6 md:mx-0 md:px-0 mt-10 mb-20">
      {/* Sign in section */}
      <div className=" w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl text-black"></div>

        <h3 className="mb-2.5 text-4xl font-bold text-blue-800">Sign In</h3>
        <p className="mb-9 ml-1 text-base text-gray-500">
          Enter your email and password to sign in!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <Input
            label="Email*"
            placeholder="mail@example.com"
            id="email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            maxWidth="full"
            autoComplete="email"
          />

          {/* Password */}
          <div className="relative">
            <PasswordInput
              label="Password*"
              placeholder="Min. 6 characters"
              id="password"
              {...register("password")}
              error={errors.password?.message}
              maxWidth="full"
              autoComplete="current-password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(onSubmit)();
                }
              }}
            />
          </div>

          <button
            type="submit"
            disabled={login.isPending}
            className="w-full rounded-xl bg-blue-600 py-3 text-base font-medium text-white transition duration-200 hover:bg-blue-700 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {login.isPending ? (
              <span className="loading loading-spinner text-accent"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-4">
          <span className="text-sm font-normal text-gray-500">
            Not registered yet?
          </span>
          <Link
            href="/auth/signup"
            className="ml-1 text-sm font-normal text-brand-500 hover:text-brand-600"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
