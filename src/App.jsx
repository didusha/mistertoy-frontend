import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import './assets/style/main.css'
import { store } from "./store/store"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./cmps/HomePage.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"

export default function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs/>} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<Dashboard />} path="/dashboard" />
              {/* <Route element={<UserDetails />} path="/user/:userId" /> */}
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}


