"use client";
import { useRouter } from "next/navigation"
import { PrimaryButton } from "@jolt-connect/ui/buttons/PrimaryButton";
import { LinkButton } from "@jolt-connect/ui/buttons/LinkButton";

export const Appbar = () => {
    const router = useRouter();
    return <div className="flex border-b justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            JoltConnect
        </div>
        <div className="flex gap-x-4">
            <div className="">
                <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
            </div>
            <div className="">
                <LinkButton onClick={() => {
                    router.push("/login")
                }}>Login</LinkButton>
            </div>
            <PrimaryButton onClick={() => {
                router.push("/signup")
            }}>
                Signup
            </PrimaryButton>            
        </div>
    </div>
}