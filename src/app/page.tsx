import { Dog } from "./Dog";
import { Dogs } from "./Dogs";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl p-4 text-center">Doggo Land</h1>
      <Dogs />

      {/* use the component in a server component, only pass in identifiers */}
      <Dog dogId="bella" />
    </main>
  );
}

export const dynamic = "force-dynamic";
