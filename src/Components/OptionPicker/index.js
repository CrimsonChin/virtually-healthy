import React, { Component } from 'react';
import { Form } from 'react-bootstrap'

class OptionPicker extends Component {
    
    handleOptionChange = (event) => {
        let selectedOption = event.target.value;
        this.props.onOptionChange(selectedOption);
      }
    
  render() {
    return (
      <Form.Control as="select" value={this.props.defaultOption} onChange={x => this.handleOptionChange(x)}>
        {Object.keys(this.props.options).map((key, i) => (
          <option key={key} value={this.props.options[key]} >
            {this.props.options[key]}
          </option>
        ))}
      </Form.Control>
    );
  }
}

export default OptionPicker;
