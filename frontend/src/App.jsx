import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import AllSpotList from './components/SpotList/SpotList';
import SpotDetail from './components/SpotDetail/SpotDetail';
import NewSpot from './components/NewSpot/NewSpot';
import './index.css'
import ManageSpots from './components/ManageSpots/ManageSpots';
import UpdateSpot from './components/UpdateSpot/UpdateSpot';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      //console.log(`is this called 1`)
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <div className='app-container'>
      {/* always redender the nvaigationBar and pass the isload state to the navigation component */}
      <Navigation isLoaded={isLoaded} />
      {/* if isLoaded is true then render all the children router that matches */}
      {isLoaded && <Outlet />}
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AllSpotList />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetail />
      },
      {
        path: '/spots/newSpot',
        element: <NewSpot />
      },
      {
        path: '/spots/manage',
        element: <ManageSpots />
      },
      {
        path: '/spots/:spotId/Update',
        element: <UpdateSpot />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
