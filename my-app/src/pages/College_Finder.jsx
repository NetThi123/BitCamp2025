import { useState } from 'react';
import '../styles/My_CollegesStyles.css';
import MyCollege_PopUp from './MyCollege_PopUp';
import Select from 'react-select';

const schools = [
  { value: 'arizona-state-university', label: 'Arizona State University' },
  { value: 'boston-college', label: 'Boston College' },
  { value: 'boston-university', label: 'Boston University' },
  { value: 'brigham-young-university', label: 'Brigham Young University' },
  { value: 'brown-university', label: 'Brown University' },
  { value: 'caltech', label: 'California Institute of Technology (Caltech)' },
  { value: 'carnegie-mellon-university', label: 'Carnegie Mellon University' },
  { value: 'clemson-university', label: 'Clemson University' },
  { value: 'columbia-university', label: 'Columbia University' },
  { value: 'cornell-university', label: 'Cornell University' },
  { value: 'dartmouth-college', label: 'Dartmouth College' },
  { value: 'drexel-university', label: 'Drexel University' },
  { value: 'duke-university', label: 'Duke University' },
  { value: 'emory-university', label: 'Emory University' },
  { value: 'fordham-university', label: 'Fordham University' },
  { value: 'george-washington-university', label: 'George Washington University' },
  { value: 'georgetown-university', label: 'Georgetown University' },
  { value: 'georgia-institute-of-technology', label: 'Georgia Institute of Technology' },
  { value: 'harvard-university', label: 'Harvard University' },
  { value: 'hofstra-university', label: 'Hofstra University' },
  { value: 'indiana-university', label: 'Indiana University' },
  { value: 'johns-hopkins-university', label: 'Johns Hopkins University' },
  { value: 'massachusetts-institute-of-technology', label: 'Massachusetts Institute of Technology (MIT)' },
  { value: 'michigan-state-university', label: 'Michigan State University' },
  { value: 'new-york-university', label: 'New York University (NYU)' },
  { value: 'north-carolina-state-university', label: 'North Carolina State University' },
  { value: 'northeastern-university', label: 'Northeastern University' },
  { value: 'northwestern-university', label: 'Northwestern University' },
  { value: 'ohio-state-university', label: 'Ohio State University' },
  { value: 'pennsylvania-state-university', label: 'Pennsylvania State University' },
  { value: 'princeton-university', label: 'Princeton University' },
  { value: 'purdue-university', label: 'Purdue University' },
  { value: 'rice-university', label: 'Rice University' },
  { value: 'rutgers-university', label: 'Rutgers University' },
  { value: 'stanford-university', label: 'Stanford University' },
  { value: 'temple-university', label: 'Temple University' },
  { value: 'texas-a&m-university', label: 'Texas A&M University' },
  { value: 'tufts-university', label: 'Tufts University' },
  { value: 'university-of-california-berkeley', label: 'University of California, Berkeley' },
  { value: 'ucla', label: 'University of California, Los Angeles (UCLA)' },
  { value: 'university-of-chicago', label: 'University of Chicago' },
  { value: 'university-of-colorado-boulder', label: 'University of Colorado Boulder' },
  { value: 'university-of-delaware', label: 'University of Delaware' },
  { value: 'university-of-florida', label: 'University of Florida' },
  { value: 'university-of-georgia', label: 'University of Georgia' },
  { value: 'university-of-illinois-urbana-champaign', label: 'University of Illinois Urbana-Champaign' },
  { value: 'university-of-maryland', label: 'University of Maryland, College Park (UMD)' },
  { value: 'university-of-michigan', label: 'University of Michigan' },
  { value: 'university-of-minnesota', label: 'University of Minnesota' },
  { value: 'university-of-north-carolina', label: 'University of North Carolina at Chapel Hill' },
  { value: 'university-of-pennsylvania', label: 'University of Pennsylvania' },
  { value: 'university-of-southern-california', label: 'University of Southern California (USC)' },
  { value: 'university-of-texas-austin', label: 'University of Texas at Austin' },
  { value: 'university-of-virginia', label: 'University of Virginia' },
  { value: 'university-of-washington', label: 'University of Washington' },
  { value: 'university-of-wisconsin-madison', label: 'University of Wisconsin-Madison' },
  { value: 'usc', label: 'University of Southern California (USC)' },
  { value: 'vanderbilt-university', label: 'Vanderbilt University' },
  { value: 'villanova-university', label: 'Villanova University' },
  { value: 'virginia-tech', label: 'Virginia Tech' },
  { value: 'washington-university-st-louis', label: 'Washington University in St. Louis' },
  { value: 'yale-university', label: 'Yale University' }
];

function CollegeDropdown({ onSelect }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (options) => {
    setSelectedOptions(options);
    console.log(1)
  };

  const handleAddSchools = () => {
    console.log(3)
    if (onSelect && selectedOptions) {
      onSelect(selectedOptions);
      console.log(2)
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      backgroundColor: state.isFocused ? '#0056b3' : 'white',
      color: state.isFocused ? 'white' : '#333',
      cursor: 'pointer',
    }),
    control: (provided) => ({
      ...provided,
      fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      borderRadius: '6px',
      borderColor: '#ccc',
      padding: '2px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#999',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      color: '#000',
    }),
  };

  return (
    <div style={{ marginTop: '0.5rem'}}>
      <Select
        styles={customStyles}
        options={schools}
        onChange={handleChange}
        placeholder="Select schools"
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
  <button
    onClick={handleAddSchools}
    style={{
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      paddingTop: '8px 16px',
      marginTop: '1rem',
      borderRadius: '6px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}
  >
    Confirm Selection
  </button>
</div>
</div>
  );
}

export default CollegeDropdown;
