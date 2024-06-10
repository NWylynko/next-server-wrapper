import { getDog } from "@/queries/dogs";
import { loader } from "@/lib/loader";
import type { ServerProps, DataProps } from "./Dog";

export const Dog = loader<ServerProps, DataProps>({
  // import in the component we want to use
  component: () => import("./Dog"),

  // fetch the data we need for the component
  // this is type safe, so we get an error if
  // we forget to load in a required prop
  data: async (props) => {
    return {
      initialDog: await getDog(props.dogId),
    };
  },

  // show a spinner, loading text, or skeleton
  // while the data loads, with the real component
  // gets streamed in later
  loading: () => <div className="p-4">Loading Doggo...</div>,
});
