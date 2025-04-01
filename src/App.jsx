import { lazy, Suspense } from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation.jsx';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage.jsx'));
const CarDetailsPage = lazy(() => import('./pages/CarDetailsPage/CarDetailsPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.jsx'));

function App() {
  return (
    <>
      <Navigation />
      <Suspense>
        <Routes>
          <Route path='/' element={< HomePage/>}/>
          <Route path='/catalog' element={< CatalogPage/>}/>
          <Route path='/catalog/:carId' element={< CarDetailsPage/>}/>
          <Route path='*' element={< NotFoundPage/>}/>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
