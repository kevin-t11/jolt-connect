import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@jolt-connect/ui/components/HeroVideo";
// import { getServerSession } from "next-auth";
// import { authConfigs } from "@/lib/auth";

export default async function Home() {
  // const session = await getServerSession(authConfigs);
  return (
    <div className="pb-48">
      <Appbar />
      <Hero />
      <div className="pt-8">
        <HeroVideo />
      </div>
      {/* {JSON.stringify(session)} */}
    </div>
  );
}