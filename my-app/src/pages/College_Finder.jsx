import Select from 'react-select';


const schools = [
    { value: 'harvard', label: 'Harvard University' },
    { value: 'stanford', label: 'Stanford University' },
    { value: 'mit', label: 'MIT' },
    { value: 'berkeley', label: 'UC Berkeley' },
    { value: 'princeton', label: 'Princeton University' },
    { value: 'yale', label: 'Yale University' },
    { value: 'columbia', label: 'Columbia University' },
    { value: 'uchicago', label: 'University of Chicago' },
    { value: 'upenn', label: 'University of Pennsylvania' },
    { value: 'caltech', label: 'California Institute of Technology (Caltech)' },
    { value: 'duke', label: 'Duke University' },
    { value: 'ucla', label: 'University of California, Los Angeles (UCLA)' },
    { value: 'umich', label: 'University of Michigan' },
    { value: 'nyu', label: 'New York University (NYU)' },
    { value: 'northwestern', label: 'Northwestern University' },
    { value: 'dartmouth', label: 'Dartmouth College' },
    { value: 'brown', label: 'Brown University' },
    { value: 'unc', label: 'University of North Carolina at Chapel Hill' },
    { value: 'usc', label: 'University of Southern California (USC)' },
    { value: 'georgetown', label: 'Georgetown University' },
    { value: 'cmu', label: 'Carnegie Mellon University' },
    { value: 'purdue', label: 'Purdue University' },
    { value: 'utexas', label: 'University of Texas at Austin' },
    { value: 'uw', label: 'University of Washington' },
   
    // 🎯 Mid-Atlantic / East Coast schools:
    { value: 'umd', label: 'University of Maryland, College Park (UMD)' },
    { value: 'american', label: 'American University' },
    { value: 'gw', label: 'George Washington University' },
    { value: 'gmu', label: 'George Mason University' },
    { value: 'johnshopkins', label: 'Johns Hopkins University' },
    { value: 'rutgers', label: 'Rutgers University' },
    { value: 'pennstate', label: 'Pennsylvania State University' },
    { value: 'villanova', label: 'Villanova University' },
    { value: 'temple', label: 'Temple University' },
    { value: 'drexel', label: 'Drexel University' },
    { value: 'delaware', label: 'University of Delaware' },
    { value: 'fordham', label: 'Fordham University' },
    { value: 'hofstra', label: 'Hofstra University' },
    { value: 'stevens', label: 'Stevens Institute of Technology' },
    { value: 'tufts', label: 'Tufts University' },
    { value: 'other', label: 'Other' }
  ];


function CollegeDropdown() {
  const handleChange = (selectedOption) => {
    console.log('Selected:', selectedOption);
  };


  return (
    <div>
      <h3>My Schools</h3>
      <Select options={schools} onChange={handleChange} />
    </div>
  );
}


export default CollegeDropdown;