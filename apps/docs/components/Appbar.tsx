"use client";
import { useRouter } from "next/navigation"
import { Button } from "@jolt-connect/ui/components/ui/button";
import { PrimaryButton } from "@jolt-connect/ui/buttons/PrimaryButton";

export const Appbar = () => {
    const router = useRouter();
    return <div className="flex border-b justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            Zapier
        </div>
        <div className="flex">
            <div className="pr-4">
                <Button onClick={() => {}}>Contact Sales</Button>
            </div>
            <div className="pr-4">
                <Button onClick={() => {
                    router.push("/login")
                }}>Login</Button>
            </div>
            <PrimaryButton onClick={() => {
                router.push("/signup")
            }}>
                Signup
            </PrimaryButton>            
        </div>
    </div>
}