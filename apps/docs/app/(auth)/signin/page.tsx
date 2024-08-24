'use client';

import { Appbar } from "@/components/Appbar";
import React from 'react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function signIn() {
    // const session = getServerSession();
    // if (!session) {
    //     redirect("/");
    // }
    return (
        <div className="">
            <Appbar />
            <div className="max-w-md mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-5 flex justify-center">Sign in to your account</h1>
                <div className="border border-slate-300 shadow-md rounded-lg p-7 mt-4">
                    <AuthForm formType="signin" />
                </div>
            </div>
        </div>
    )
}
    

