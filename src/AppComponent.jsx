import CustomSelect from "./CustomSelect";

const options = [
  { value: "1", label: "Main Option 1" },
  { value: "2", label: "Main Option 2" },
  { value: "3", label: "Main Option 3" },
  { value: "4", label: "Main Option 4" },
  { value: "5", label: "Main Option 5" },
  { value: "6", label: "Main Option 6" },
  { value: "7", label: "Main Option 7" },
  { value: "8", label: "Main Option 8" },
  { value: "9", label: "Main Option 9" },
  { value: "10", label: "Main Option 10" },
  { value: "11", label: "Main Option 11" },
  { value: "12", label: "Main Option 12" },
  { value: "13", label: "Main Option 13" },
  { value: "14", label: "Main Option 14" },
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
      <div className="kzui-heading">
        <h1>Custom Select Component</h1>
      </div>
      <CustomSelect
        isClearable
        isSearchable
        isDisabled={false}
        options={options}
        value={null}
        placeholder="Select an option ↓"
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