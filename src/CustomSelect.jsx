import { useState, useEffect, useRef } from 'react';
import './CustomSelect.css';

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options,
  value,
  placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || (isMulti ? [] : null));
  const [availableOptions, setAvailableOptions] = useState(options);
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Open menu by default
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (onMenuOpen) {
      onMenuOpen();
    }
  }, [isMenuOpen, onMenuOpen]);

  useEffect(() => {
    // Update available options when selected items change
    setAvailableOptions(
      options.filter((opt) => !selectedValue.some((sel) => sel.value === opt.value))
    );
  }, [selectedValue, options]);

  const handleSelect = (option) => {
    if (isMulti) {
      const newSelected = [...selectedValue, option];
      setSelectedValue(newSelected);
      setAvailableOptions(availableOptions.filter((opt) => opt.value !== option.value));
      onChangeHandler(newSelected);
    } else {
      setSelectedValue(option);
      setAvailableOptions(availableOptions.filter((opt) => opt.value !== option.value));
      onChangeHandler(option);
      setIsMenuOpen(false);
    }
  };

  const handleClear = (item) => {
    if (isMulti) {
      const newSelected = selectedValue.filter((i) => i.value !== item.value);
      setSelectedValue(newSelected);
      setAvailableOptions([...availableOptions, item]);
      onChangeHandler(newSelected);
    } else {
      setSelectedValue(null);
      setAvailableOptions([...availableOptions, item]);
      onChangeHandler(null);
    }
    setIsMenuOpen(true); // Reopen the menu when an item is cleared
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (onSearchHandler) {
      onSearchHandler(event.target.value);
    }
  };

  const filteredOptions = availableOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFocus = () => {
    if (!isDisabled) {
      setIsMenuOpen(true);
    }
  };

  const handleBlur = () => {
    if (!isDisabled && !isMulti) {
      setIsMenuOpen(false);
    }
  };

  const renderOptions = (options) => {
    return options.map((option) => (
      <li
        key={option.value}
        className="kzui-select__option"
        onClick={() => handleSelect(option)}
      >
        {option.label}
      </li>
    ));
  };

  return (
    <div className={`kzui-select ${isDisabled ? 'kzui-select--disabled' : ''}`}>
      <div
        className="kzui-select__control"
        onClick={() => !isDisabled && setIsMenuOpen(true)}
      >
        {selectedValue ? (
          isMulti ? (
            selectedValue.map((val) => (
              <ul key={val.value} className="kzui-select__multi-value-container">
                <li className="kzui-select__multi-value">
                  {val.label}
                </li>
                {isClearable && (
                  <button
                    className="kzui-select__clear-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click event from triggering the control click
                      handleClear(val);
                    }}
                  >
                    &times;
                  </button>
                )}
              </ul>
            ))
          ) : (
            <div className="kzui-select__value">{selectedValue.label}</div>
          )
        ) : (
          <div className="kzui-select__placeholder">{placeholder}</div>
        )}
        {isClearable && !isMulti && selectedValue && (
          <button className="kzui-select__clear-btn" onClick={() => handleClear(selectedValue)}>
            &times;
          </button>
        )}
      </div>
      {isMenuOpen && (
        <div className="kzui-select__menu">
          {isSearchable && (
            <input
              type="text"
              className="kzui-select__search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
            />
          )}
          <ul className="kzui-select__list">
            {filteredOptions.length ? (
              renderOptions(filteredOptions)
            ) : (
              <li className="kzui-select__no-options">No options available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
