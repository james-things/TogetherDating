// Description: A WIP component which allows a user to select from a range of
// interests with which to update their profile

// todo: complete css styling to prevent page expansion and navbar becoming huge.
//  ideally the final iteration of this will pre-populate from existing selections
//  on load, however the updating function handles any such conflicts currently

import React, { useEffect, useState } from 'react';
import { ActionList } from '@primer/react';
import useCollapse from 'react-collapsed';
import { useUser } from 'reactfire';
import firebaseRemoveInterest from '../methods/firebaseRemoveInterest';
import firebaseAddInterest from '../methods/firebaseAddInterest';

// Main function
export default function PrimerMultiSelect({ dataset }) {
  // Set up necessary states
  const [state, setState] = useState(dataset);
  const [selectedInterestNames, setSelectedInterestNames] = useState([]);
  const [optionList, setOptionList] = useState(dataset.options);
  const [selectionList, setSelectionList] = useState(dataset.selections);
  const [isExpanded, setExpanded] = useState(false);
  const [assignees, setAssignees] = React.useState([]);
  const [userId, setId] = useState('');
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  // Subscribe to user
  const { status, data: user } = useUser();

  // Grab userId as soon as it is available
  useEffect(() => {
    if (user) {
      setId(user?.uid);
    }
  }, [user]);

  // a testing function build list of names from number array
  function getSelectedInterestNames() {
    let count = -1;
    const newSelectionList = [];
    selectionList.forEach((selection) => {
      count += 1;
      if (selection === 1) {
        newSelectionList.push(optionList[count]);
      }
    });
    console.log(newSelectionList);
    setSelectedInterestNames(newSelectionList);
  }

  // a testing function to interact with state
  function toggleState(targetName) {
    const target = targetName;
    const index = optionList.indexOf(target);
    console.log(`target index: ${index}`);
    const tempList = selectionList;
    const targetSelection = tempList[index];
    if (targetSelection === 1) {
      tempList[index] = 0;
      firebaseRemoveInterest(targetName, userId);
    }
    if (targetSelection === 0) {
      tempList[index] = 1;
      firebaseAddInterest(targetName, userId);
    }
    setSelectionList(tempList);

    getSelectedInterestNames();
  }

  // a testing function to get selected state of name from number array
  function getIsSelected(targetName) {
    const target = targetName;
    const indexToCheck = optionList.indexOf(target);
    return selectionList[indexToCheck];
  }

  // On-click expansion handler
  // Applies to all children elements, so a filter is applied to determine if the header was clicked
  function handleOnClick(element) {
    // Do more stuff with the click event!
    // Or, set isExpanded conditionally
    if (element.target.outerText) {
      console.log(element.target.outerText);
      // this is clunky but I can't get logical or to work so it checks twice
      if (element.target.outerText.includes('(collapse)')) {
        if (!isExpanded) setExpanded(true);
        else setExpanded(false);
      }
      if (element.target.outerText.includes('(expand)')) {
        if (!isExpanded) setExpanded(true);
        else setExpanded(false);
      }
    }
  }

  // Component content
  return (
    <>
      <ActionList selectionVariant="multiple" showDividers role="listbox" aria-label="Select assignees">
        <div className="collapsible">
          <div className="header" {...getToggleProps({ onClick: (e) => handleOnClick(e) })}>
            <ActionList.Group sx={{ '> *': { fontSize: 4 } }} title={dataset.name + (isExpanded ? ' (collapse)' : ' (expand)')}>
              <div {...getCollapseProps()}>
                <div className="content">
                  {optionList.map((value) => (
                    <ActionList.Item
                      role="option"
                      key={value}
                      selected={Boolean(getIsSelected(value))}
                      /* eslint-disable-next-line react/no-this-in-sfc,max-len */
                      onSelect={() => toggleState(value)}
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
