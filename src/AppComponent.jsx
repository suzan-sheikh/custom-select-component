import CustomSelect from "./CustomSelect";

const options = [
  { value: "1", label: "JavaScript" },
  { value: "2", label: "Java" },
  { value: "3", label: "Go (Golang)" },
  { value: "4", label: "Python" },
  { value: "5", label: "PHP" },
  { value: "6", label: "C++" },
  { value: "7", label: "Rust" },
  { value: "8", label: "Swift" },
  { value: "9", label: "Kotlin" },
  { value: "10", label: "Ruby" }
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
        <div className="container"></div>
      </div>
      <CustomSelect
        isClearable
        isSearchable
        isDisabled={false}
        options={options}
        value={null}
        placeholder="Select an Language"
        isGrouped={false}
        isMulti={true}
        onChangeHandler={handleSelectChange}
        onMenuOpen={() => console.log("Menu opened")}
        onSearchHandler={handleSearch}
      />
    </div>
  );
};

export default AppComponent;
