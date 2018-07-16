import React, { Component } from 'react';

class OptionPicker extends Component {
    
    handleOptionChange = (event) => {
        let selectedOption = event.target.value;
        this.props.onOptionChange(selectedOption);
      }
    
  render() {
    return (
      <select defaultValue={this.props.defaultOption}
              onChange={this.handleOptionChange}>
        {Object.keys(this.props.options).map((key, i) => (
              <option key={key} value={this.props.options[key]} >
                {this.props.options[key]}
              </option>
       ))}
      </select>
    );
  }
}

export default OptionPicker;
