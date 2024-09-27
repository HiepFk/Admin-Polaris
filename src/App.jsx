import React from "react";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { Routes, Route } from "react-router-dom";
import { Dashboard, Product } from "./page";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/product" element={<Product />} />
          </Routes>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
