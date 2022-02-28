import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { IS_PRODUCTION } from "@config";
import { useMemo } from "react";

import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: IS_PRODUCTION,
            refetchOnReconnect: IS_PRODUCTION,
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
