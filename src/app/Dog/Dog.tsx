"use client";

import { useQuery } from "@tanstack/react-query";
import { getDog } from "@/queries/dogs";

// props that get passed in to the component on the server
export type ServerProps = {
  dogId: string;
};

// props that we are expecting to be fetched on the server
// and passed in to this client component
export type DataProps = {
  initialDog: Awaited<ReturnType<typeof getDog>>;
};

type DogProps = ServerProps & DataProps;

export default function Dog(props: DogProps) {
  // optionally, we can use something like react-query to hold
  // the data for us and manage the fetching and caching
  const { data: dog } = useQuery({
    queryKey: ["dog", { id: props.dogId }],
    queryFn: () => getDog(props.dogId),
    initialData: props.initialDog,
    refetchOnMount: false,
  });

  // gets rendered on the server with initial data, and reactive on the client
  return <pre className="p-4">{JSON.stringify({ props, dog }, null, 2)}</pre>;
}
