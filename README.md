# Custom Select Component

## Overview

The `CustomSelect` component is a versatile and customizable select dropdown that supports single and multiple selections, searchable options, and grouped options. It follows the BEM (Block Element Modifier) naming convention and does not rely on any external CSS libraries or state management libraries.

## Props

### `isClearable`
- **Type:** `boolean`
- **Description:** When `true`, allows clearing of the selected value(s). For single select, it clears the selected value. For multiple select, it allows clearing individual selected values.

### `isSearchable`
- **Type:** `boolean`
- **Description:** When `true`, enables a search input within the select dropdown. For multi-select, the search indicator appears after selecting at least one item. For single select, it appears after clearing the selection.

### `isDisabled`
- **Type:** `boolean`
- **Description:** When `true`, disables the select component, making it unselectable and non-interactive.

### `options`
- **Type:** `Array<{ value: string | number, label: string } | { label: string, options: Array<{ value: string | number, label: string }> }>`
- **Description:** The list of options to be displayed in the dropdown. This can be a simple array of option objects or a nested array for grouped options.

### `value`
- **Type:** `null | { value: string | number, label: string } | Array<{ value: string | number, label: string }>`
- **Description:** The currently selected value(s). Can be `null` for no selection, a single object for single selection, or an array of objects for multiple selections.

### `placeholder`
- **Type:** `string`
- **Description:** Text to be displayed when no value is selected.

### `isGrouped`
- **Type:** `boolean`
- **Description:** When `true`, displays options in groups. Each group should have a label and an array of options.

### `isMulti`
- **Type:** `boolean`
- **Description:** When `true`, allows multiple selections. When `false`, only a single selection is allowed.

### `onChangeHandler`
- **Type:** `(selectedOption: null | { value: string | number, label: string } | Array<{ value: string | number, label: string }>) => void`
- **Description:** Callback function that is called when the selection changes. It receives the updated selection as an argument.

### `onMenuOpen`
- **Type:** `() => void`
- **Description:** Callback function that is called when the dropdown menu is opened.

### `onSearchHandler`
- **Type:** `(searchTerm: string) => void`
- **Description:** Callback function that is called when the search input changes. It receives the search term as an argument.

## Installation

You can include the `CustomSelect` component in your project by copying the component code into your project and importing it into your application.

## Usage

Here's a basic example of how to use the `CustomSelect` component:

```jsx
import React, { useState } from 'react';
import CustomSelect from './CustomSelect';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { label: 'Group 1', options: [
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' }
  ]}
];

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleMenuOpen = () => {
    console.log('Menu opened');
  };

  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);
  };

  return (
    <CustomSelect
      isClearable={true}
      isSearchable={true}
      isDisabled={false}
      options={options}
      value={selectedValue}
      placeholder="Select an option"
      isGrouped={true}
      isMulti={true}
      onChangeHandler={handleChange}
      onMenuOpen={handleMenuOpen}
      onSearchHandler={handleSearch}
    />
  );
};

export default App;
