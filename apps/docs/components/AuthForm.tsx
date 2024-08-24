"use client";

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SignupSchema, SigninSchema } from '@jolt-connect/shared';
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@jolt-connect/ui/components/ui/form';
import { Button } from '@jolt-connect/ui/components/ui/button';
import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle } from "react-icons/fa";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Input } from '@jolt-connect/ui/components/ui/input';

type FormProps = {
  formType: 'signin' | 'signup';
};

type SigninFormFields = z.infer<typeof SigninSchema>;
type SignupFormFields = z.infer<typeof SignupSchema>;

export default function AuthForm({ formType }: FormProps) {

  const router = useRouter();
  const schema = formType === 'signup' ? SignupSchema : SigninSchema;

  const methods = useForm<SigninFormFields | SignupFormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SigninFormFields | SignupFormFields> = async (data) => {
    try {
      if (formType === 'signin') {
        const result = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (result?.error) {
          console.error("Sign-in error:", result.error);
        } else {
          console.log("Sign-in successful!");
          router.push('/welcome');
        }
      } else {
        // Handle sign-up logic, make an API call to your custom sign-up endpoint
        const response = await axios.post('http://localhost:8000/api/v1/auth/signup', {
          name: (data as SignupFormFields).name,
          email: data.email,
          password: data.password,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });


        if (!response) {
          console.error("Sign-up failed.");
        } else {
          console.log("Sign-up successful!");
          // automatically sign in the user after sign-up
          const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
          });

          if (result?.error) {
            console.error("Automatic sign-in after sign-up failed:", result.error);
          } else {
            console.log("Automatic sign-in successful!");
            // redirect the user after successful sign-up
            router.push('/welcome')
          }
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const errors = methods.formState.errors;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-2">
        {formType === 'signup' && (
          <FormField
            control={methods.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    id='name'
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {(errors as any).name?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id='email'

                  placeholder="example@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage> {(errors as any).email?.message}</FormMessage>
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
                <Input
                  id="password"
                  type="password"
                  placeholder="**********"
                  {...field}
                />
              </FormControl>
              <FormMessage> {(errors as any).password?.message}</FormMessage>
            </FormItem>
          )}
        />

        <div className='pt-3'>
          <Button variant={"default"} type="submit" className='w-full'>
            {formType === 'signup' ? 'Create an account' : 'Sign In'}
          </Button>
        </div>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className='flex gap-4 mt-5'>
          <Button variant={'outline'}
            type="button"
            className="w-full"
            onClick={() => signIn('google')}
          >
            <span className='px-1 flex justify-center items-center'><FaGoogle /> </span>
            Google
          </Button>
          <Button
            variant={'outline'}
            type="button"
            className="w-full"
            onClick={() => signIn('github')}
          >
            <span className='px-1 flex justify-center items-center'><FaGithub /> </span>
            GitHub
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
