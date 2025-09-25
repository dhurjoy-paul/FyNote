import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import SettingsLayout from '@/layouts/SettingsLayout';
import ChangePassword from '@/pages/auth/changePassword/ChangePassword';
import Login from '@/pages/auth/login/Login';
import AddClient from '@/pages/dashboard/addClient/AddClient';
import AddPackage from '@/pages/dashboard/addPackage/AddPackage';
import ClientDetails from '@/pages/dashboard/clientDetails/ClientDetails';
import NewClients from '@/pages/dashboard/clients/NewClients';
import OffClients from '@/pages/dashboard/clients/OffClients';
import PaidClients from '@/pages/dashboard/clients/PaidClients';
import TotalClients from '@/pages/dashboard/clients/TotalClients';
import UnpaidClients from '@/pages/dashboard/clients/UnpaidClients';
import GetLocation from '@/pages/dashboard/getLocation/GetLocation';
import Statistics from '@/pages/dashboard/stats/Statistics';
import ErrorPage from '@/pages/error/ErrorPage';
import SettingsHome from '@/pages/settings/SettingsHome';
import { createBrowserRouter, redirect } from 'react-router';

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
      { path: 'add-package', element: <AddPackage /> },
      { path: 'get-location', element: <GetLocation /> },

      { path: 'total-clients', element: <TotalClients /> },
      { path: 'paid-clients', element: <PaidClients /> },
      { path: 'unpaid-clients', element: <UnpaidClients /> },
      { path: 'off-clients', element: <OffClients /> },
      { path: 'new-clients', element: <NewClients /> },
      {
        path: 'settings',
        element: <SettingsLayout />,
        children: [
          { index: true, element: <SettingsHome /> }
        ],
      },
    ],
  },
  { path: '*', element: <ErrorPage /> }
]);

export default router;