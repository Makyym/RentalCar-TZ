import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react'
import "modern-normalize";
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx'
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ScrollToTop />
        <PersistGate loading={null} persistor={persistor}>
          <Toaster position="top-right"/>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
