import { Appbar } from "@/components/Appbar";
import SignupForm from "@/components/SignupForm";
import React from 'react';

export default function signup() {
    return (
        <div className="">
            <Appbar />
            <div className="max-w-md mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-5 flex justify-center">Create an account</h1>
                <div className="border border-slate-300 shadow-md rounded-lg p-7 mt-4">
                    <SignupForm />
                </div>
            </div>
        </div>
    )
}


