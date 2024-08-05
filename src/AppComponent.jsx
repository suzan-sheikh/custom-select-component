import CustomSelect from "./CustomSelect";

const options = [
  { value: "1", label: "Main Option 1" },
  { value: "2", label: "Main Option 2" },
  { value: "3", label: "Main Option 3" },
];

const groupedOptions = [
  {
    label: "Group 1",
    options: [
      { value: "1", label: "Sub Option 1" },
      { value: "2", label: "Sub Option 2" },
    ],
  },
  {
    label: "Group 2",
    options: [
      { value: "3", label: "Option 3" },
      { value: "4", label: "Option 4" },
    ],
  },
];

const AppComponent = () => {

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };
  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
  };

  
  return (
    <div>
      <h1>Custom Select Component</h1>
      <CustomSelect
        isClearable
        isSearchable
        isDisabled={false}
        options={options}
        value={null}
        placeholder="Select an option"
        isGrouped={false}
        isMulti={true}
        onChangeHandler={handleSelectChange}
        onMenuOpen={() => console.log("Menu opened")}
        onSearchHandler={handleSearch}
      />
      {/* <CustomSelect
        isClearable
        isSearchable
        isDisabled={false}
        options={groupedOptions}
        value={[]}
        placeholder="Select an option"
        isGrouped={true}
        isMulti={true}
        onChangeHandler={handleSelectChange}
        onMenuOpen={() => console.log("Menu opened")}
        onSearchHandler={handleSearch}
      /> */}
    </div>
  );
};

export default AppComponent;