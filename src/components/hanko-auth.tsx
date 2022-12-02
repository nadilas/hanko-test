import { register } from "@teamhanko/hanko-elements/hanko-auth";
import { useCallback, useEffect } from "react";
import { env } from "../env/client.mjs";
import { useRouter } from "next/router.js";

const api = env.NEXT_PUBLIC_HANKO_API;
const lang = env.NEXT_PUBLIC_HANKO_LANG;

export default function HankoAuth() {
    const router = useRouter();

    const redirectAfterLogin = useCallback(() => {
      // successfully logged in, redirect to a page in your application
      router.replace("...");
    }, [router]);
  
    useEffect(() => {
      document.addEventListener("hankoAuthSuccess", redirectAfterLogin);
      return () =>
        document.removeEventListener("hankoAuthSuccess", redirectAfterLogin);
    }, [redirectAfterLogin]);
  
  useEffect(() => {
    // register the component
    // see: https://github.com/teamhanko/hanko/blob/main/frontend/elements/README.md#script
    register({ shadow: true })
      .catch((error) => {
        console.error('hanko error', error)
        // handle error
      });
  }, []);

  return (
    <hanko-auth api={api} lang={lang} />
  );
}
