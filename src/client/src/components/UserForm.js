import React, { useState, useEffect } from "react";
import $ from "jquery";
import { CForm, CFormInput, CFormLabel, CButton } from "@coreui/react";

const UserForm = ({ selectedUser, onFormSubmit, onReset, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    bod: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.emails,
        age: selectedUser.age,
        bod: selectedUser.bod,
      });
    } else {
      resetForm();
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      bod: formData.bod,
    };

    $.ajax({
      type: "POST",
      url: "/api/users",
      data: JSON.stringify(userData),
      contentType: "application/json",
      success: (data) => {
        console.log(data);
        onFormSubmit(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
    // onFormSubmit(userData);
    // please submit from url backend
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      age: "",
      bod: "",
    });
  };

  const handleReset = () => {
    resetForm();
    onReset();
  };

  return (
    <div className="container mt-5">
      <h2>{selectedUser ? "Edit User" : "Create User"}</h2>
      <CForm onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="name">Name</CFormLabel>
          <CFormInput
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="email">Email</CFormLabel>
          <CFormInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="age">Age</CFormLabel>
          <CFormInput
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="18"
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="bod">Date of Birth</CFormLabel>
          <CFormInput
            type="date"
            id="bod"
            name="bod"
            value={formData.bod}
            onChange={handleChange}
            required
          />
        </div>
        <CButton type="submit" color="primary">
          {selectedUser ? "Update" : "Submit"}
        </CButton>
        <CButton type="button" color="secondary" onClick={handleReset}>
          Reset
        </CButton>
      </CForm>
    </div>
  );
};

export default UserForm;
