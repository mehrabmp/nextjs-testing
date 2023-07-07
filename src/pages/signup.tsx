import type { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { Loader } from '@/components/ui/loader';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const signupSchema = z.object({
  name: z.string({ required_error: 'Please enter your name' }),
  email: z
    .string({ required_error: 'Please enter email address' })
    .email('Please enter valid email address'),
  password: z
    .string({ required_error: 'Please enter password' })
    .min(6, `Password must be at least 6 characters long`)
    .max(50, `Password can't be more than 50 characters long`),
});

type SignupSchemaType = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupSchemaType> = async values => {
    setIsLoading(true);

    const status = await signIn('sign-up', {
      redirect: false,
      name: values.name,
      email: values.email,
      password: values.password,
    });

    setIsLoading(false);

    if (status?.ok) return router.push('/dashboard');

    toast.error(status?.error);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center p-4">
        <div className="mb-16 mt-32 text-center">
          <h1 className="text-4xl font-medium">Sign up</h1>
        </div>
        <Form {...form}>
          <form
            className="w-full max-w-xs space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      error={!!form.formState.errors.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      error={!!form.formState.errors.email}
                      {...field}
                    />
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
                      placeholder="Enter your password"
                      error={!!form.formState.errors.password}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader size="sm" className="mr-2" />}
              Sign up
            </Button>
            <h2 className="text-center text-sm font-medium">
              You already have an account?{' '}
              <Link href={'/signin'} className="text-blue-500">
                Sign in
              </Link>
            </h2>
          </form>
        </Form>
      </div>
    </>
  );
}
