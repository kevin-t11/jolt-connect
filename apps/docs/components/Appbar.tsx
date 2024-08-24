"use client";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { PrimaryButton } from "@jolt-connect/ui/buttons/PrimaryButton";
import { LinkButton } from "@jolt-connect/ui/buttons/LinkButton";
import { Avatar } from "@jolt-connect/ui/components/ui/avatar";
import { Button } from "@jolt-connect/ui/components/ui/button";

export const Appbar = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div className="flex border-b justify-between p-4">Loading...</div>;
    }

    return (
        <div className="flex border-b justify-between p-4">
            <div onClick={() => router.push("/")} className="cursor-pointer flex flex-col justify-center text-2xl font-extrabold">
                JoltConnect
            </div>
            <div className="flex gap-x-4 items-center">
                <div>
                    <LinkButton onClick={() => { }}>Contact Sales</LinkButton>
                </div>
                {session ? (
                    <>
                        {/* Adjust the Avatar component props based on the documentation */}
                        <Avatar
                            //@ts-ignore
                            src={session.user?.image || "/public/default-avatar.jpg"}
                            alt={session.user?.name || "User"}
                            className="w-8 h-8 rounded-full"
                        />
                        <PrimaryButton onClick={() => signOut()}>Logout</PrimaryButton>
                    </>
                ) : (
                    <>
                        <div>
                            <LinkButton onClick={() => router.push("/signin")}>Login</LinkButton>
                        </div>
                        <div>
                            <PrimaryButton onClick={() => router.push("/signup")}>Signup</PrimaryButton>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};
