import React, { Component } from 'react';
import { Grid, Row, Col, InputGroup, FormControl, FormGroup } from 'react-bootstrap'
import OptionPicker from './Components/OptionPicker';
import AgeRange from './AgeRange';
import Gender from './Gender';
import DailyActivityLevel from './DailyActivityLevel';
import { CalcuateRMR } from './RestingMetabolicRateCalculator';

class App extends Component {

  state = {
    age: AgeRange.nineteenToThirty,
    gender: Gender.male,
    activityLevel: DailyActivityLevel.seatedOrStanding,
    weight: 0
  }

  componentWillMount() {
    document.title = 'Virtually Healthy'
  }

  handleAgeChange = (age) => {
    this.setState({
      age: age
    });

    this.calculateRestingMetabolicRate(age, this.state.gender, this.state.weight);
  }

  handleGenderChange = (gender) => {

    this.setState({
      gender: gender
    });

    this.calculateRestingMetabolicRate(this.state.age, gender, this.state.weight);
  }

  handleActivityLevelChange = (e) => {
    this.setState({
      activityLevel: e
    });

    // this.calculateRestingMetabolicRate();
  }

  updateInputValue = (e) => {
    let weight = e.target.value;

    if (isNaN(weight)){
      weight = 0;
    }

    this.setState({
      weight: weight
    });

    this.calculateRestingMetabolicRate(this.state.age, this.state.gender, weight);
  }

  calculateRestingMetabolicRate(age, gender, weight) {
    let rmr = CalcuateRMR(age, gender, weight);
    this.setState({
      rmr: rmr
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <h1>Resting Metablic Rate Calculator</h1>
        </Row>
          <Row>
            <Col md={12}>
            <OptionPicker options={AgeRange} defaultOption={this.state.age} onOptionChange={this.handleAgeChange} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <OptionPicker options={Gender} defaultOption={this.state.gender} onOptionChange={this.handleGenderChange} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <input type="text" onChange={evt => this.updateInputValue(evt)} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {this.state.rmr && 
                <span>Your resting metabolic rate is {this.state.rmr} Kcal</span>
              } 
            </Col>
          </Row>
          {/* <Row>
            <Col md={12}>
              <OptionPicker options={DailyActivityLevel} defaultOption={this.state.activityLevel} onOptionChange={this.handleActivityLevelChange} />
            </Col>
          </Row> */}
      </Grid>
    );
  }
}

export default App;
