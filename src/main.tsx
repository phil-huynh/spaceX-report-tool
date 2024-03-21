import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import SpaceXList from './components/SpaceXList.tsx';
import NewReport from './components/NewReport.tsx';
import ReportsList from './components/ReportsList.tsx';
import ReportDetails from './components/ReportDetails.tsx';
import ContextProvider from './ContextStore.tsx'
import ErrorPage from './components/utilityComponents/ErrorPage.tsx';
import Options from './components/toggleSets/Options.tsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import LaunchDetails from './components/LaunchDetails.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Options/>
      },
      {
        path: '/launch-list',
        element: <SpaceXList/>
      },
      {
        path: '/launch-details',
        element: <LaunchDetails/>
      },
      {
        path: 'new-report',
        element: <NewReport/>
      },
      {
        path: 'reports-list',
        element: <ReportsList/>
      },
      {
        path: 'report-details',
        element: <ReportDetails/>
      }
    ]
  }
])

const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache()
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ContextProvider>
        <RouterProvider router={router}/>
      </ContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
)

// https://github.com/SpaceXLand/api/blob/master/src/utils/filters/order.ts
// https://github.com/SpaceXLand/api/blob/master/src/utils/filters/sort.ts