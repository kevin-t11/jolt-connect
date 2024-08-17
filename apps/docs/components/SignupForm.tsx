"use client";

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SignupSchema } from '@jolt-connect/shared';
import { FormField, FormItem, FormControl, FormMessage } from '@jolt-connect/ui/components/ui/form';
import { Input } from '@jolt-connect/ui/components/input';
import { Button } from '@jolt-connect/ui/components/ui/button';
import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle } from "react-icons/fa";


type SignupFormData = z.infer<typeof SignupSchema>;

export default function SignupForm() {
    const methods = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema),
    });

    const onSubmit: SubmitHandler<SignupFormData> = (data) => {
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={methods.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    label="Name"
                                    placeholder="John Doe"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.name?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    label="Email"
                                    placeholder="example@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.email?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="**********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{methods.formState.errors.password?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <div className='pt-3'>
                    <Button variant={"primary"} type="submit" className='w-full'>Create an accout</Button>
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
