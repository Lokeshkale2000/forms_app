// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormList from './components/FormList';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import ViewForm from './components/ViewForm';
import "./App.css"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FormList />} />
          <Route path="/form/create" element={<CreateForm />} />
          <Route path="/form/:id/edit" element={<EditForm />} />
          <Route path="/form/:id" element={<ViewForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
