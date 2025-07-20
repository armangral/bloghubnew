"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { useRegister } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth";

// Validation schema
const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

function SignupPage() {
  const register = useRegister();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: SignupFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data;
    register.mutate(registerData, {
      onSuccess: () => {
        reset();
        router.push("/dashboard");
      },
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-6 md:mx-0 md:px-0 my-10">
      {/* Sign up section */}
      <div className=" w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h3 className="mb-2.5 text-4xl font-bold text-blue-800">Sign Up</h3>
        <p className="mb-9 ml-1 text-base text-gray-500">
          Create your account to get started!
        </p>

        {/* Uncomment if you want Google Sign Up */}
        {/* <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-slate-200 hover:bg-slate-300 hover:cursor-pointer text-black ">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <p className="text-sm font-medium ">Sign Up with Google</p>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-300 " />
          <p className="text-base text-gray-600"> or </p>
          <div className="h-px w-full bg-gray-300 " />
        </div> */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <Input
            label="Full Name*"
            placeholder="Enter your full name"
            id="name"
            type="text"
            {...formRegister("name")}
            error={errors.name?.message}
            maxWidth="full"
            autoComplete="name"
          />

          {/* Email */}
          <Input
            label="Email*"
            placeholder="mail@example.com"
            id="email"
            type="email"
            {...formRegister("email")}
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
              {...formRegister("password")}
              error={errors.password?.message}
              maxWidth="full"
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <PasswordInput
              label="Confirm Password*"
              placeholder="Confirm your password"
              id="confirmPassword"
              {...formRegister("confirmPassword")}
              error={errors.confirmPassword?.message}
              maxWidth="full"
              autoComplete="new-password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(onSubmit)();
                }
              }}
            />
          </div>

          <button
            type="submit"
            disabled={register.isPending}
            className="w-full rounded-xl bg-blue-600 py-3 text-base font-medium text-white transition duration-200 hover:bg-blue-700 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {register.isPending ? (
              <span className="loading loading-spinner text-accent"></span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-4">
          <span className="text-sm font-normal text-gray-500">
            Already have an account?
          </span>
          <Link
            href="/auth/signin"
            className="ml-1 text-sm font-normal text-brand-500 hover:text-brand-600"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
