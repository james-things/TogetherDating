// Description: A component which displays a collapsible collection of selectable list items
// Currently replaced by PrimerMultiSelect, but retaining as reference code

import React from 'react';

import Select, { components } from 'react-select';
import { optionAllCombined } from '../outdoorInterests.options';

// Handler for collapse on click functionality
const handleHeaderClick = (props) => {
  const node = document.querySelector(`#${props.id}`).parentElement
    .nextElementSibling;
  const classes = node.classList;
  if (classes.contains('collapsed')) {
    node.classList.remove('collapsed');
    console.log(node.toString());
    console.log(node);
  } else {
    node.classList.add('collapsed');
    console.log(node.toString());
    console.log(node);
  }
};

// Handler for onOpen
const handleOnOpen = (props) => {
  const node = document.querySelector(`#${props.id}`).children;
  const classes = node.classList;
  if (classes.contains('collapsed')) {
    node.classList.remove('collapsed');
  } else {
    node.classList.add('collapsed');
  }
};

// Handler for click interactable group heading
const CustomGroupHeading = (props) => (
  <div
    className="group-heading-wrapper"
    onClick={() => handleHeaderClick(props)}
  >
    <components.GroupHeading {...props} className="collapsed" />
  </div>
);

// Default export
export default () => (
  <div className="container">
    <Select
      options={optionAllCombined}
      isMulti
      blurInputOnSelect={false}
      closeMenuOnSelect={false}
      components={{ GroupHeading: CustomGroupHeading }}
      onMenuClose={() => console.log('onClose')}
    />
  </div>
);
