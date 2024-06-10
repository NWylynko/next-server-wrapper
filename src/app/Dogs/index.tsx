import { getDogs } from "@/queries/dogs";
import { loader } from "@/lib/loader";

export const Dogs = loader({
  component: () => import("./Dogs"),
  data: async () => {
    return {
      initialDogs: await getDogs(),
    };
  },
  loading: () => <div className="p-4">Loading Doggos...</div>,
});
