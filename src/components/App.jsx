// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Section from './Section';

import HomePage from 'pages/HomePage/HomePage';
import { lazy, Suspense } from 'react';
import { Layout } from './Layout/Layout';
import Spinner from './Spinner/Spinner';
import { PublicRoute } from './AuthRoutes/PublicRoute';
import { PrivateRoute } from './AuthRoutes/PrivateRoute';
import ContactsPage from 'pages/ContactsPage/ContactsPage';


const JoinPage = lazy(() => import('../pages/JoinPage/JoinPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));




export const App = () => {
  return (
    <>
      <BrowserRouter basename='goit-react-hw-08-phonebook'>
        <Layout>
          <Suspense fallback={<Spinner />}>
            
           
            <Routes>
              <Route path='' element={<HomePage />} />

              <Route path='' element={<PublicRoute/>}>
                <Route path='login' element={<Section title="Hello, use your email and password to enter our PhoneBook"><LoginPage/></Section>} />
                <Route path='join' element={<Section title="Create new user"><JoinPage/></Section>} />
              </Route>
              
              <Route path='' element={<PrivateRoute/>}>
                <Route path='contacts' element={<ContactsPage/>} />
              </Route>

              
            </Routes>

          </Suspense>
        </Layout>
      </BrowserRouter>
      

      
    </>
  );
};
