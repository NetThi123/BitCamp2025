import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/MeStyle.css'

function Me() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    educationLevel: '',
    graduationDate: '',
    interests: '',
    major: '',
    careerInterests: '',
    gender: '',
    pronouns: '',
    ethnicity: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Form submitted", formData); 
    setSubmitted(true); // Switch to preview mode
  };

  const handleEdit = () => {
    setSubmitted(false); // Back to edit mode
  };

  return (
    <div className="container">
      <h2 className="myInfoHead">MY INFO:</h2>

      {!submitted ? (
        <form className="user-form" onSubmit={handleSubmit}>
          <label>
            NAME:
            <br />
            <input type="text" className="meInput" name="name" value={formData.name} onChange={handleChange} />
          </label>

          <label>
            AGE:
            <br />
            <input type="number" className="meInput" name="age" value={formData.age} onChange={handleChange} />
          </label>

          <label>
            CURRENT LEVEL OF EDUCATION:
            <br />
            <select name="educationLevel" value={formData.educationLevel} onChange={handleChange}>
              <option value="">Select</option>
              <option value="high school">High School</option>
              <option value="undergrad">Undergraduate</option>
              <option value="grad">Graduate</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            EXPECTED GRADUATION DATE (college):
            <br />
            <input type="month" className="meInput" name="graduationDate" value={formData.graduationDate} onChange={handleChange} />
          </label>

          <label>
            INTERESTS
            <br />
            <textarea name="interests" value={formData.interests} onChange={handleChange} />
          </label>

          <label>
            MAJOR
            <br />
            <input type="text" className="meInput" name="major" value={formData.major} onChange={handleChange} />
          </label>

          <label>
            CAREER INTERESTS
            <br />
            <textarea name="careerInterests" value={formData.careerInterests} onChange={handleChange} />
          </label>

          <label>
            GENDER
            <br />
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="nonbinary">Non-binary</option>
              <option value="other">Other</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
          </label>

          <label>
            PRONOUNS
            <br />
            <input type="text" className="meInput" name="pronouns" value={formData.pronouns} onChange={handleChange} />
          </label>

          <label>
            ETHNICITY
            <br />
            <select name="ethnicity" value={formData.ethnicity} onChange={handleChange}>
              <option value="">Select</option>
              <option value="american">American Indian or Alaska Native</option>
              <option value="white">White</option>
              <option value="black">Black or African American</option>
              <option value="hispanic">Hispanic or Latino</option>
              <option value="middleEastern">Middle Eastern or North African</option>
              <option value="eastAsian">East Asian</option>
              <option value="southAsian">South Asian</option>
              <option value="southEast">Southeast Asian</option>
              <option value="centralAsian">Central Asian</option>
              <option value="native">Native Hawaiian or Pacific Islander</option>
              <option value="mixed">Mixed</option>
              <option value="other">Other</option>
            </select>
          </label>

          <button type="submit" className="me-button">Submit Changes</button>
        </form>
      ) : (
        <div className="preview">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Current Level of Education:</strong> {formData.educationLevel}</p>
          <p><strong>Expected Graduation Date:</strong> {formData.graduationDate}</p>
          <p><strong>Interests:</strong> {formData.interests}</p>
          <p><strong>Major:</strong> {formData.major}</p>
          <p><strong>Career Interests:</strong> {formData.careerInterests}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Pronouns:</strong> {formData.pronouns}</p>
          <p><strong>Ethnicity:</strong> {formData.ethnicity}</p>
          <button className="me-edit-button" onClick={handleEdit}>Edit Info</button>
        </div>
      )}
    </div>
  );
}

export default Me;
