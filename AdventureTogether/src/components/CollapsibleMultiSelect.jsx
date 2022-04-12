import React from 'react';

import Select, { components } from 'react-select';
import { optionAllCombined } from '../outdoorInterests.options';

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

const handleOnOpen = (props) => {
  const node = document.querySelector(`#${props.id}`).children;
  const classes = node.classList;
  if (classes.contains('collapsed')) {
    node.classList.remove('collapsed');
  } else {
    node.classList.add('collapsed');
  }
};

const CustomGroupHeading = (props) => (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div
    className="group-heading-wrapper"
    onClick={() => handleHeaderClick(props)}
  >
    <components.GroupHeading {...props} className="collapsed" />
  </div>
);

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
