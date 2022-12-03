
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Auth = dynamic(
  // replace with path to your component using the <hanko-auth> element
  () => import('../components/hanko-auth'),
  { ssr: false },
)

const Login = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Suspense fallback={"Loading ..."}>
            <Auth />
          </Suspense>
        </div>
    )
}

export default Login