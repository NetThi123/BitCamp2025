import { useState, useEffect} from 'react';
import '../styles/My_CollegesStyles.css';
import CollegeDropdown from './College_Finder';
import MyCollege_PopUp from './MyCollege_PopUp';
import { fileUpload, getColleges, getProtectedResource } from '../util/auth';

function AddSchool() {
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (school) => {
    if (!selectedSchools.find(s => s.value === school.value)) {
      setSelectedSchools(prev => [...prev, { ...school, file: null }]);
      setIsModalOpen(false); // close modal after selecting
    }
    
  };

  // CALL AUTOMATICALLY WHEN PAGE LOADS
   // Auto-call when page loads
   const onLoad = async () => {
    const data = await getColleges();
    // Transform the data to match your expected selectedSchools format
    const formatted = data.colleges.map(name => ({
      label: name,
      value: name.toLowerCase().replace(/\s+/g, '-'),
      file: null
    }));
    setSelectedSchools(formatted);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleFileUpload = (event, schoolValue) => {
    const file = event.target.files[0];
    console.log(`File uploaded for ${schoolValue}:`, file);
    setSelectedSchools((prev) =>
      prev.map((school) =>
        school.value === schoolValue ? { ...school, file } : school
      )
    );
  };

  const handleUpload = async (file, schoolValue) => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    
    const re2s = await getProtectedResource();
    console.log(re2s)

    const formData = new FormData();
    formData.append("file", file);
    formData.append("school", schoolValue);
  
    const res = await fileUpload(file, schoolValue)
    // replace the fetch with the correct link 
    /*const res = await fetch("http://localhost:5000/api/upload_file", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({"a":"a"})
    });*/

    //const res = await getColleges()
  
    //const result = await res.json();
    console.log(res);
  };
  

  return (
    <div style={{ marginTop: '5rem', width: '100%', alignContent: 'center'}}>
      <h2 style={{ textAlign: 'center' }}>My Schools</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid #ccc',
            borderRadius: '8px',
            paddingBottom: '10px 20px',
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
        width: '80%',
        borderCollapse: 'collapse',
        marginTop: '2rem',
        marginLeft: '10%',
        fontFamily: 'Trebuchet MS, sans-serif',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <thead style={{ backgroundColor: '#009879', color: '#ffffff' }}>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>School</th>
            <th style={{ textAlign: 'left', padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>Select File</th>
            <th style={{ textAlign: 'left', padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>Upload File</th>
          </tr>
        </thead>
        <tbody>
          {selectedSchools.map((school, index) => (
            <tr key={school.value} style={{ backgroundColor: index % 2 === 0 ? '#f3f3f3' : '#ffffff' }}>
              <td style={{ padding: '15px', border: '1px solid #ccc', color: 'black' }}>{school.label}</td>
              <td style={{ padding: '15px', border: '1px solid #ccc', color: 'black' }}>
              <label className="custom-file-upload">
                Select File
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
                <td style={{ padding: '10px', border: '1px solid #ccc', color: 'black' }}>
                <button className="custom-file-upload" onClick={() => handleUpload(school.file, school.value)}>Upload File</button>
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