import { Appbar } from "@/components/Appbar";
import { getSession } from "next-auth/react";

export default async function welcome() {
    const session = await getSession();
    return (
        <div>
            <Appbar />
        </div>
    )
}