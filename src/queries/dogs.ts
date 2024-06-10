"use server";

import { wait } from "@/lib/wait";
import { notFound } from "next/navigation";

const dogs = [
  {
    id: "bella",
    name: "Bella",
    breed: "Poodle",
    age: 4,
  },
  {
    id: "charlie",
    name: "Charlie",
    breed: "Labrador",
    age: 2,
  },
  {
    id: "max",
    name: "Max",
    breed: "Pug",
    age: 7,
  },
];

export async function getDogs() {
  console.log("querying dogs");

  await wait(250);

  return dogs.map((dog) => ({
    id: dog.id,
    name: dog.name,
  }));
}

export async function getDog(id: string) {
  await wait(250);

  const dog = dogs.find((dog) => dog.id === id);

  if (!dog) {
    notFound();
  }

  return dog;
}
