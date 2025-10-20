import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import SettingsLayout from '@/layouts/SettingsLayout';
import ErrorPage from '@/pages/error/ErrorPage';
import { lazy } from 'react';
import { createBrowserRouter, redirect } from 'react-router';

const Login = lazy(() => import('@/pages/auth/login/Login'));
const ChangePassword = lazy(() => import('@/pages/auth/changePassword/ChangePassword'));

const Statistics = lazy(() => import('@/pages/dashboard/stats/Statistics'));
const ClientDetails = lazy(() => import('@/pages/dashboard/clientDetails/ClientDetails'));
const AddClient = lazy(() => import('@/pages/dashboard/addClient/AddClient'));
const Packages = lazy(() => import('@/pages/dashboard/packages/Packages'));
const GetLocation = lazy(() => import('@/pages/dashboard/getLocation/GetLocation'));
const SettingsHome = lazy(() => import('@/pages/settings/SettingsHome'));

const NewClients = lazy(() => import('@/pages/dashboard/clients/NewClients'));
const OffClients = lazy(() => import('@/pages/dashboard/clients/OffClients'));
const PaidClients = lazy(() => import('@/pages/dashboard/clients/PaidClients'));
const TotalClients = lazy(() => import('@/pages/dashboard/clients/TotalClients'));
const UnpaidClients = lazy(() => import('@/pages/dashboard/clients/UnpaidClients'));

const Account = lazy(() => import('@/pages/dashboard/account/Account'));


const router = createBrowserRouter([
  { path: '/', loader: () => redirect('/dashboard') },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/change-password', element: <ChangePassword /> },
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Statistics /> },
      { path: 'client-details/:id', element: <ClientDetails /> },
      { path: 'add-client', element: <AddClient /> },
      { path: 'packages', element: <Packages /> },
      { path: 'get-location', element: <GetLocation /> },

      { path: 'total-clients', element: <TotalClients /> },
      { path: 'paid-clients', element: <PaidClients /> },
      { path: 'unpaid-clients', element: <UnpaidClients /> },
      { path: 'off-clients', element: <OffClients /> },
      { path: 'new-clients', element: <NewClients /> },

      { path: 'account', element: <Account /> },
      {
        path: 'settings',
        element: <SettingsLayout />,
        children: [
          {
            index: true, element: <SettingsHome />,
            loader: async () => {
              await new Promise(resolve => setTimeout(resolve, 1000));
              return null;
            }
          }
        ],
      },
    ],
  },
  { path: '*', element: <ErrorPage /> }
]);

export default router;