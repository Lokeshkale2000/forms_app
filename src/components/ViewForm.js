import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem("forms")) || [];
    const currentForm = savedForms[id];
    if (currentForm) {
      setForm({
        ...currentForm,
        inputs: currentForm.inputs.map((input) => ({
          ...input,
          placeholder: input.placeholder || `Enter ${input.type}`,
        })),
      });
    }
  }, [id]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    alert("Form Submitted!");
    console.log("Submitted Data:", formData);
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>Back</button>
      <h1>{form.label}</h1>
      {form.inputs.map((input, index) => (
        <div key={index}>
          <label>{input.label}</label>
          <input
            type={input.type}
            placeholder={input.placeholder}
            onChange={(e) => handleChange(input.label, e.target.value)}
          />
        </div>
      ))}
      <button className="primary" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ViewForm;
