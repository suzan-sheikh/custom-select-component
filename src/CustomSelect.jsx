import { useState, useEffect, useRef } from "react";
import "./CustomSelect.css";
import { IoSearchOutline } from "react-icons/io5";

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
  const [selectedValue, setSelectedValue] = useState(
    value || (isMulti ? [] : null)
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const menuRef = useRef(null); // Reference to the menu container
  const controlRef = useRef(null); // Reference to the control container

  // Toggle menu open/close
  const handleControlClick = () => {
    if (!isDisabled) {
      setIsMenuOpen((prev) => !prev);
    }
  };

  // Handle option selection
  const handleSelect = (option) => {
    if (isMulti) {
      setSelectedValue((prev) => {
        const newSelection = [...prev, option];
        onChangeHandler(newSelection);
        return newSelection;
      });
    } else {
      setSelectedValue(option);
      onChangeHandler(option);
      setIsMenuOpen(false);
    }
  };

  // Handle clear action
  const handleClear = (item) => {
    if (isMulti) {
      setSelectedValue((prev) => {
        const newSelection = prev.filter((i) => i.value !== item.value);
        onChangeHandler(newSelection);
        return newSelection;
      });
    } else {
      setSelectedValue(null);
      onChangeHandler(null);
    }
    setIsMenuOpen(true);
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (onSearchHandler) onSearchHandler(event.target.value);
  };

  // Filter options based on search term and selected values
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedValue.some((sel) => sel.value === option.value)
  );

  // Render options as list items
  const renderOptions = (options) =>
    options.map((option) => (
      <li
        key={option.value}
        className="kzui-select__option"
        onClick={() => handleSelect(option)}
      >
        {option.label}
      </li>
    ));

  // Render grouped options
  const renderGroupedOptions = () =>
    options.map((group) => (
      <li key={group.label} className="kzui-select__group">
        <div className="kzui-select__group-label">{group.label}</div>
        <ul>{renderOptions(group.options)}</ul>
      </li>
    ));

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        controlRef.current &&
        !controlRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open/close menu and invoke onMenuOpen callback when menu opens/closes
  useEffect(() => {
    if (onMenuOpen && isMenuOpen) onMenuOpen();
  }, [isMenuOpen, onMenuOpen]);

  return (
    <div className={`kzui-select ${isDisabled ? "kzui-select--disabled" : ""}`}>
      <div
        className="kzui-select__control"
        onClick={handleControlClick}
        ref={controlRef}
      >
        {!selectedValue ||
        (Array.isArray(selectedValue) && selectedValue.length === 0) ? (
          <div className="kzui-select__placeholder">{placeholder}</div>
        ) : isMulti ? (
          selectedValue.map((val) => (
            <div key={val.value} className="kzui-select__multi-value-container">
              <span className="kzui-select__multi-value">{val.label}</span>
              {isClearable && (
                <button
                  className="kzui-select__clear-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear(val);
                  }}
                >
                  &times;
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="kzui-select__value">{selectedValue.label}</div>
        )}
        {!isMulti && isClearable && selectedValue && (
          <button
            className="kzui-select__clear-btn"
            onClick={() => handleClear(selectedValue)}
          >
            &times;
          </button>
        )}
      </div>
      {isMenuOpen && (
        <div className="kzui-select__menu" ref={menuRef}>
          {isSearchable && (
            <div className="kzui-select__search_container">
              <IoSearchOutline className="kzui-select__search_icon" />
              <input
                type="text"
                className="kzui-select__search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search..."
                ref={inputRef}
              />
            </div>
          )}
          <ul className="kzui-select__list">
            {isGrouped ? (
              renderGroupedOptions()
            ) : filteredOptions.length ? (
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
