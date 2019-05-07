import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import OptionPicker from './Components/OptionPicker';
import AgeRange from './AgeRange';
import Gender from './Gender';
import DailyActivityLevel from './DailyActivityLevel';
import { CalcuateRMR } from './RestingMetabolicRateCalculator';

class App extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,

      age: AgeRange.thirtyOneToSixty,
      gender: Gender.male,
      activityLevel: DailyActivityLevel.seatedOrStanding,
      weight: 68.6
    }
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

    // activity level inslt included
    //this.calculateRestingMetabolicRate(this.state.age, this.state.gender, e);
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

  handleSubmit(event) {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    // }

    // TODO validate
    // TODO do we need to handle onChange?
    this.setState({ validated: true });

    this.calculateRestingMetabolicRate(this.state.age, this.state.gender, this.state.weight);
  }

  render() {
    const { validated } = this.state

    return (
      <Container>
        <Row>
          <h1>Resting Metablic Rate Calculator</h1>
        </Row>
        <Row>
            <Form         
              noValidate
              validated={ this.state.validated }
              onSubmit={e => this.handleSubmit(e)}>
              <Form.Group as={Row} controlId="formBasicPassword">
                <Form.Label column sm="4">Age</Form.Label>
                <Col sm="8">
                  <OptionPicker options={AgeRange} defaultOption={this.state.age} onOptionChange={this.handleAgeChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicPassword">
                <Form.Label column sm="4">Gender</Form.Label>
                <Col sm="8">
                  <OptionPicker options={Gender} defaultOption={this.state.gender} onOptionChange={this.handleGenderChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicPassword">
                <Form.Label column sm="4">Daily Activity Level</Form.Label>
                <Col sm="8">
                  <OptionPicker options={DailyActivityLevel} defaultOption={this.state.activityLevel} onOptionChange={this.handleActivityLevelChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicPassword">
                <Form.Label column sm="4">Weight (Kg)</Form.Label>
                <Col sm="8">
                  <Form.Control type="text" value={this.state.weight} onChange={(x) => function(x){ this.setState({weight: x}); } } />
                  {/* <Form.Text className="text-muted">in Kg</Form.Text> */}
                </Col>
              </Form.Group>


              <Button variant="primary" type="submit">
                Calculate!
              </Button>
            </Form>
            
        </Row>
        <Row>
            <Col md={12}>
              {this.state.rmr && 
                <span>Your resting metabolic rate is {this.state.rmr} Kcal</span>
              } 
            </Col>
        </Row>
        
      </Container>
    );
  }
}

export default App;
