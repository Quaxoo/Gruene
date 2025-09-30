import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"
import Home from "./Home/Home"
import Login from "./Admin/Login/Login"
import Create from "./Admin/Termine/Create"
import NotFound from './NotFound/NotFound.js';
import Termine from "./Termine/Termine"
import Kontakt from './Kontakt/Kontakt.js';
import Edit from './Admin/Termine/Edit.js';
import TerminPage from './Termine/TerminPage.js';
import { AuthProvider } from './Admin/AuthContext.js';
import ProtectedRoute from './ProtectedRoute.js';


import "./styles/fonts.css"
import "./styles/main.css"
import Admin from './Admin/Admin.js';
import Beitraege from './Beitraege/Beitraege.js';
import BeitragPage from './Beitraege/BeitragPage.js';
import ScrollToTop from './ScrollToTop.js';
import CreateBeitrag from './Admin/Beitraege/CreateBeitrag.js';
import EditBeitrag from './Admin/Beitraege/EditBeitrag.js';
import Impressum from './Legal/Impressum.js';
import Datenschutz from './Legal/Datenschutz.js';
import SeoNoIndex from "./SEO/SeoNoIndex.js"


function App() {

  return (
      <Router>
        <AuthProvider>
          <ScrollToTop/>

          <Navbar/>

          <main>
                
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/termine" element={<Termine/>}/>
                  <Route path="/aktuelles" element={<Beitraege/>}/>
                  <Route path="/kontakt" element={<Kontakt/>}/>
                  <Route path="/termin/:id" element={<TerminPage/>} />
                  <Route path="/beitrag/:id" element={<BeitragPage/>} />

                  <Route path="/impressum" element={<Impressum/>}/>
                  <Route path="/datenschutz" element={<Datenschutz/>}/>

                  <Route path="/login" element={<Login/>} />

                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <SeoNoIndex title={"Admin Panel - Gudrun Hackl-Stoll"}/>
                      <Admin/>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/termine/erstellen" element={
                    <ProtectedRoute>
                      <SeoNoIndex title={"Termin erstellen - Gudrun Hackl-Stoll"}/>
                      <Create/>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/termine/bearbeiten/:id" element={
                    <ProtectedRoute>
                      <SeoNoIndex title={"Termin bearbeiten - Gudrun Hackl-Stoll"}/>
                      <Edit/>
                    </ProtectedRoute>
                  } />

                  <Route path="/admin/beitraege/erstellen" element={
                    <ProtectedRoute>
                      <SeoNoIndex title={"Beitrag erstellen - Gudrun Hackl-Stoll"}/>
                      <CreateBeitrag/>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/beitraege/bearbeiten/:id" element={
                    <ProtectedRoute>
                      <SeoNoIndex title={"Beitrag Bearbeiten - Gudrun Hackl-Stoll"}/>
                      <EditBeitrag/>
                    </ProtectedRoute>
                  } />

                  <Route path="*" element={<NotFound/>}/>
                </Routes>

          </main>

          <Footer/>
        </AuthProvider>
      </Router>
  );
}

export default App;
