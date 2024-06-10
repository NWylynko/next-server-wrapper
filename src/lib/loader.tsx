import lazy, { type Loader } from "next/dynamic";
import { Suspense } from "react";

type LoaderOptions<
  ComponentProps extends object,
  ServerProps extends object = object,
> = {
  component: Loader<ComponentProps & ServerProps>;
  data: (props: ComponentProps) => Promise<ServerProps>;
  loading: () => JSX.Element;
};

export function loader<
  ComponentProps extends object,
  ServerProps extends object = object,
>(options: LoaderOptions<ComponentProps, ServerProps>) {
  // Load in the component
  const ClientComponent = lazy(options.component, {
    ssr: true,
    loading: options.loading,
  });

  // Create a server-side component that fetches the data
  const ServerComponent = async (props: ComponentProps) => {
    const data = await options.data(props);

    // Render the client-side component with the initial data
    return <ClientComponent {...props} {...data} />;
  };

  const LoadingComponent = options.loading;

  // Return a component that wraps the server-side component in a Suspense
  return (props: ComponentProps) => {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <ServerComponent {...props} />
      </Suspense>
    );
  };
}
