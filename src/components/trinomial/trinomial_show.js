import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm, reset } from 'redux-form';
import * as actions from '../../actions';

class TrinomialShow extends Component {
  componentDidMount() {
    this.props.fetchTrinomial(this.props.params.pattern);
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${ touched && error ? 'has-danger' : ''}`;

    return (
      <div className={ className }>
        <label>{ field.label }</label>
        <input
          className="form-control"
          type={ field.type }
          { ...field.input }
        />
        <div className="text-help">
          { touched ? error : "" }
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // to access users id of pattern: values.userIdPattern - how to get this in the validate function...
    delete values.step2;
    const score = ( values.final === this.props.data.trinomial.solution1 || values.final === this.props.data.trinomial.solution2 ? 1 : -1 );
    values["score"] = score;
    values["pattern"] = this.props.data.trinomial.pattern;

    // this works to alert user that they are correct ...
    if (score === -1) {
      alert(`Your solution is incorrect :( \nThe correct expression is ${this.props.data.trinomial.solution1}`);
    }

    this.props.checkTrinomial(values, this.props.params.pattern);
  }

  render() {
    const trinomial = this.props.data.trinomial;
    const superScript2 = "2".sup
    const { handleSubmit } = this.props;

    if ( !trinomial ) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div>
        <div className="problems-correct-tracker">
          <h4>Problems Correct: { this.props.userReport.total_problems_correct }</h4>
        </div>

        <div className="problem">
          <h2 className="trinomial-general-form">{ trinomial.a }x<sup>2</sup> { trinomial.general_form }</h2>
        </div>

        <div className="ans-input-form">
          <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <div>
              <Field
                label="Answer"
                name="final"
                component={ this.renderField }
              />
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const validate = function(values) {
  const errors = {};
  // would be nice to check against a reg-ex for correct form
  if (!values.final) {
    errors.final = "Enter your final expression in the form: =(x+e)(x+f)"
  }
  return errors;
}

const mapStateToProps = function(state) {
  console.log("in map state to props of problem page");
  console.log(state);
  return { data: state.trinomial, userReport: state.user.report};
}

const afterSubmit = function (result, dispatch) {
  dispatch( reset('TrinomialInputForm') );
}

export default reduxForm({
  validate,
  form: 'TrinomialInputForm',
  onSubmitSuccess: afterSubmit
})( connect(mapStateToProps, actions )(TrinomialShow));
