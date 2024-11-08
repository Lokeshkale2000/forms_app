import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormList = () => {
  const navigate = useNavigate();
  const [forms, setForms] = React.useState(JSON.parse(localStorage.getItem("forms")) || []);

  const handleDeleteForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
    localStorage.setItem("forms", JSON.stringify(updatedForms));
  };

  return (
    <div className="container form-list">
      <h1>Form List</h1>
      <button className="primary" onClick={() => navigate("/form/create")}>Create New Form</button>
      {forms.length === 0 ? (
        <p>No forms available. Please create a new form.</p>
      ) : (
      <ul>
        {forms.map((form, index) => (
          <li key={index}>
            <span>{form.title || `Form ${index + 1}`}</span>
            <button className="edit" onClick={() => navigate(`/form/${index}/edit`)}>Edit</button>
            <button className="primary" onClick={() => navigate(`/form/${index}`)}>View</button>
            <button className="delete" onClick={() => handleDeleteForm(index)}>Delete</button>
          </li>
        ))}
      </ul>)}
    </div>
  );
};

export default FormList;
