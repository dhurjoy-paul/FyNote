import GlobalLoader from "@/components/shared/GlobalLoader";
import PageLoaderFallback from "@/components/shared/PageLoaderFallback";
import { Suspense } from 'react';
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="bg-muted">
      <GlobalLoader />
      <Suspense fallback={<PageLoaderFallback />}>
        <Outlet />
      </Suspense>
    </main>
  )
}
export default AuthLayout