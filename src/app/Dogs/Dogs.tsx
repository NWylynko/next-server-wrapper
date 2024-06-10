"use client";

import { useQuery } from "@tanstack/react-query";
import { getDogs } from "@/queries/dogs";

type DogsProps = {
  initialDogs: Awaited<ReturnType<typeof getDogs>>;
};

export default function Dogs(props: DogsProps) {
  const { data: dogs } = useQuery({
    queryKey: ["dogs"],
    queryFn: () => getDogs(),
    initialData: props.initialDogs,
  });

  return <pre className="p-4">{JSON.stringify(dogs, null, 2)}</pre>;
}
