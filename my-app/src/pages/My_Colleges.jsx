import { useState } from 'react';
import '../styles/My_CollegesStyles.css';
import CollegeDropdown from './College_Finder';
import MyCollege_PopUp from './MyCollege_PopUp';

function AddSchool() {
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (school) => {
    if (!selectedSchools.find(s => s.value === school.value)) {
      setSelectedSchools(prev => [...prev, { ...school, file: null }]);
      setIsModalOpen(false); // close modal after selecting
    }
    
  };

  const handleFileUpload = (event, schoolValue) => {
    const file = event.target.files[0];
    console.log(`File uploaded for ${schoolValue}:`, file);
    setSelectedSchools((prev) =>
      prev.map((school) =>
        school.value === schoolValue ? { ...school, file } : school
      )
    );
  };

  return (
    <div style={{ margin: '5rem', width: '100%', alignContent: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>My Schools</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
          }}
        >
          + Add School
        </button>
      </div>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '2rem',
        fontFamily: 'Trebuchet MS, sans-serif',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <thead style={{ backgroundColor: '#009879', color: '#ffffff' }}>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>School</th>
            <th style={{ textAlign: 'left', padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>Upload File</th>
          </tr>
        </thead>
        <tbody>
          {selectedSchools.map((school, index) => (
            <tr key={school.value} style={{ backgroundColor: index % 2 === 0 ? '#f3f3f3' : '#ffffff' }}>
              <td style={{ padding: '12px', border: '1px solid #ccc', color: 'black' }}>{school.label}</td>
              <td style={{ padding: '12px', border: '1px solid #ccc', color: 'black' }}>
              <label className="custom-file-upload">
                Upload File
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, school.value)}
                    style={{ display: 'none' }}
                />    
                </label>
                {school.file && (
                  <span style={{ marginLeft: '10px' }}>✅ {school.file.name}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <MyCollege_PopUp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CollegeDropdown onSelect={handleSelect} />
      </MyCollege_PopUp>
    </div>
  );
}

export default AddSchool;