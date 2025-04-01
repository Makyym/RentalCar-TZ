import { lazy, Suspense } from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation.jsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: -100 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage.jsx'));
const CarDetailsPage = lazy(() => import('./pages/CarDetailsPage/CarDetailsPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.jsx'));

function App() {
  const location = useLocation();
  return (
    <>
    <Navigation />
    <AnimatePresence mode="wait">
      <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ willChange: "transform, opacity" }}
      key={location.pathname}
      >
        <Suspense>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={< HomePage/>}/>
            <Route path='/catalog' element={< CatalogPage/>}/>
            <Route path='/catalog/:carId' element={< CarDetailsPage/>}/>
            <Route path='*' element={< NotFoundPage/>}/>
          </Routes>
        </Suspense>
        </motion.div>
    </AnimatePresence>
    </>
  )
}

export default App
