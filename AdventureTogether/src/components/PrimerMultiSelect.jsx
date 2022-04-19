// Description: A WIP component which allows a user to select from a range of
// interests with which to update their profile

// todo: fix building of choice array and complete css styling
//  to prevent page expansion and navbar becoming huge

import React, { useState } from 'react';
import {
  Box, Checkbox, CheckboxGroup, FormControl, Text, Button, PageLayout,
  SideNav, Heading, ActionList,
} from '@primer/react';
import useCollapse from 'react-collapsed';

// Main function
export default function PrimerMultiSelect({ dataset }) {
  const [isExpanded, setExpanded] = useState(false);

  const [assignees, setAssignees] = React.useState([]);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  // On-click expansion handler
  // Applies to all children elements, so a filter is applied to determine if the header was clicked
  function handleOnClick(element) {
    // Do more stuff with the click event!
    // Or, set isExpanded conditionally
    console.log(element.target.outerText.toString());
    // this is clunky but I can't get logical or to work so it checks twice
    if (element.target.outerText.toString().includes('(collapse)')) {
      if (!isExpanded) setExpanded(true);
      else setExpanded(false);
    }
    if (element.target.outerText.toString().includes('(expand)')) {
      if (!isExpanded) setExpanded(true);
      else setExpanded(false);
    }
  }

  // Currently problematic array building function
  const toggleAssignee = (assignee) => {
    const assigneeIndex = assignees.findIndex((a) => a === assignee);

    if (assigneeIndex === -1) {
      setAssignees([...assignees, assignee]);
      console.log(assignee);
      console.log(assigneeIndex);
      console.log(assignees);
    } else {
      setAssignees(assignees.filter((_, index) => index !== assigneeIndex));
      console.log(assignee);
      console.log(assigneeIndex);
      console.log(assignees);
    }
  };

  // Component content
  return (
    <>
      <ActionList selectionVariant="multiple" showDividers role="listbox" aria-label="Select assignees">
        <div className="collapsible">
          <div className="header" {...getToggleProps({ onClick: (e) => handleOnClick(e) })}>
            <ActionList.Group sx={{ '> *': { fontSize: 4 } }} title={dataset.name + (isExpanded ? ' (collapse)' : ' (expand)')}>
              <div {...getCollapseProps()}>
                <div className="content">
                  {dataset.options.map((value) => (
                    <ActionList.Item
                      role="option"
                      key={value}
                      selected={Boolean(assignees.find((assignee) => assignee === value))}
                      onSelect={() => toggleAssignee(value)}
                    >
                      {value}
                    </ActionList.Item>
                  ))}
                </div>
              </div>
            </ActionList.Group>
          </div>
        </div>
      </ActionList>
    </>
  );
}
