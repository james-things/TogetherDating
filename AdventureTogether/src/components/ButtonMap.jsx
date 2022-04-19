// Description: Not in use, but a good example of how to perform a number of basic operations

import React, { Component } from 'react';

const BUTTONS = [
  { id: 0, title: 'button1' },
  { id: 1, title: 'button2' },
  { id: 2, title: 'button3' },
];

class ButtonMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: [],
    };
  }

  handleButton(buttonId) {
    // eslint-disable-next-line prefer-const
    let newSelectedValues;
    // eslint-disable-next-line prefer-const
    ({ selectedValues: newSelectedValues } = this.state);
    newSelectedValues.push(buttonId);
    this.setState({
      selectedValues: newSelectedValues,
    });
    console.log(newSelectedValues);
  }

  render() {
    return (
      <div>
        {BUTTONS.map((bt) => (
          <button
            key={bt.id}
            type="button"
            onClick={() => this.handleButton(bt.id)}
            /* eslint-disable-next-line react/destructuring-assignment */
            className={this.state.selectedValues.includes(bt.id) ? 'buttonPressed' : 'button'}
          >
            {bt.title}
          </button>
        ))}
      </div>
    );
  }
}

export default ButtonMap;
