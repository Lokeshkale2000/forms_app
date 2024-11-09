import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [label, setLabel] = useState("My Edited Form");
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`https://pepper-cloud-backend-efno.vercel.app/api/forms/${id}`);
        setLabel(response.data.label);
        setInputs(response.data.inputs);
      } catch (error) {
        console.error("Error fetching form", error);
      }
    };
    fetchForm();
  }, [id]);

  const handleInputChange = (index, key, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][key] = value;
    setInputs(updatedInputs);
  };

  
  const addInput = (type) => {
    const defaultInput = {
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: `Enter ${type} here`,
    };
    setInputs([...inputs, defaultInput]);
  };

  const handleSaveForm = async () => {
    if (!label.trim()) {
      alert("Please enter a form title.");
      return;
    }

    if (inputs.length === 0) {
      alert("Please add at least one field to the form.");
      return;
    }

    try {
      const updatedForm = { label, inputs };
      await axios.put(`https://localhost:8080/api/forms/${id}`, updatedForm);
      navigate("/");
    } catch (error) {
      console.error("Error saving form", error);
    }
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>
      <h1>Edit Form</h1>
      <input
        type="text"
        placeholder="Form Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      
      {/* Add buttons to add different types of inputs */}
      <div className="input-buttons" style={{margin:"20px"}}>
        <button onClick={() => addInput("text")} style={{background:'blue' ,color:"white",marginRight:"10px"}}>Add Text Field</button>
        <button onClick={() => addInput("email")} style={{background:'blue' ,color:"white",marginRight:"10px"}}>Add Email Field</button>
        <button onClick={() => addInput("password")} style={{background:'blue' ,color:"white",marginRight:"10px"}}>Add Password Field</button>
        <button onClick={() => addInput("number")} style={{background:'blue' ,color:"white",marginRight:"10px", marginTop:"10px"}}>Add Number Field</button>
        <button onClick={() => addInput("date")} style={{background:'blue' ,color:"white",marginRight:"10px", marginTop:"10px"}}>Add Date Field</button>
      </div>

      {inputs.map((input, index) => (
        <div key={index}>
          <h3 >{input.type.charAt(0).toUpperCase() + input.type.slice(1)}</h3>
          <input
            type="text"
            placeholder="Input Label"
            value={input.label}
            onChange={(e) => handleInputChange(index, "label", e.target.value)}
            style={{padding:'7px'}}
          />
      
          <input
            type="text"
            placeholder={input.placeholder}
            value={input.placeholder}
            onChange={(e) =>
              handleInputChange(index, "placeholder", e.target.value)
            }
            style={{padding:'7px',marginLeft:'10px'}}
          />
        </div>
      ))}

      <button className="primary" onClick={handleSaveForm} style={{marginTop:'20px'}}>
        Save Form
      </button>
    </div>
  );
};

export default EditForm;
