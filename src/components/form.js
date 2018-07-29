import React, { Component } from 'react';
import Dashboard from './dashboard';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    },
      items: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.change = this.change.bind(this);
  }

  change(e) {
      let value = Object.assign({}, this.state.values);    //creating copy of object
      console.log(e.target);
      if(e.target.name === "firstname"){
        value.firstname = e.target.value;
    } else if(e.target.name === "lastname") {
        value.lastname = e.target.value;
    } else if(e.target.name === "username") {
        value.username = e.target.value;
    } else if(e.target.name === "email") {
        value.email = e.target.value;
    } else if(e.target.name === "password") {
        value.password = e.target.value;
    }
    // this.setState({
    //    [e.target.name]: e.target.value.target.name]: e.target.value 
    // });

    this.setState({values: value});
    this.showInputError(e.target.name);
  }

  onSubmit(e) {
    e.preventDefault();     // not to reload page
    if (!this.validate()) {
      alert('Form Details not Valid!');
    } else {
      this.setState({
        items: [...this.state.items, this.state.values]});  //spread operator
        document.getElementById("myForm").reset();
    }
  }
  
  validate() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;

    inputs.forEach(input => {
      const isInputValid = this.showInputError(input.name);
      if (!isInputValid) {
        isFormValid = false;
      }
    });
    return isFormValid;
  }

  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isPassword = refName.indexOf('password') !== -1;
    const isFirstName = refName.indexOf('firstname') !== -1;
    const isLastName = refName.indexOf('lastname') !== -1;
    const isUserName = refName.indexOf('username') !== -1;

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`;
      } else if (isPassword && validity.patternMismatch) {
        error.textContent = `${label} should be of length 5-15.`;
      } else if (isFirstName && validity.patternMismatch) {
        error.textContent = `${label} should be only characters with length 1-20.`; 
      } else if (isLastName && validity.patternMismatch) {
        error.textContent = `${label} should be only characters with length 1-20.`; 
      } else if (isUserName && validity.patternMismatch) {
        error.textContent = `${label} should be only characters or numbers with length 1-15.`; 
      }
      else if (validity.typeMismatch) {
        error.textContent = `${label} is not a valid email address`;
      }
      return false;
    }
    error.textContent = '';
    return true;
  }

  render() {
   
    return (
        <div className="wrapper">
        <h2>User Registration</h2>
          <form id="myForm">
            <div className="group">
              <input
                type="text"
                name="firstname"
                ref="firstname"
                pattern="[a-zA-Z]{1,20}"
                value={this.state.firstname}
                onChange={e => this.change(e)}
                // onChange={this.change.bind(this)}
                required="required"
              />
              <span className="bar" />
              <label id="firstnameLabel"> First Name</label>
              <div className="error" id="firstnameError" />
            </div>
            <div className="group">
              <input
                type="text"
                name="lastname"
                ref="lastname"
                pattern="[a-zA-Z]{1,20}"
                value={this.state.lastname}
                onChange={e => this.change(e)}
                // onChange={this.change.bind(this)}
                required="required"
              />
              <span className="bar" />
              <label id="lastnameLabel">Last Name</label>
              <div className="error" id="lastnameError" />
            </div>
            <div className="group">
              <input
                type="text"
                name="username"
                ref="username"
                pattern="[a-z0-9]{1,15}"
                value={this.state.username}
                onChange={e => this.change(e)}
                required="required"
              />
              <span className="bar" />
              <label id="usernameLabel">Username</label>
              <div className="error" id="usernameError" />
            </div>
            <div className="group">
              <input
                type="email"
                name="email"
                ref="email"
                value={this.state.email}
                onChange={e => this.change(e)}
                // onChange={this.change.bind(this)}
                required="required"
              />
              <span className="bar" />
              <label id="emailLabel">Email</label>
              <div className="error" id="emailError" />
            </div>
            <div className="group">
              <input
                type="password"
                name="password"
                ref="password"
                pattern=".{5,15}"
                value={this.state.password}
                onChange={e => this.change(e)}
                required="required"
              />
              <span className="bar" />
              <label id="passwordLabel">Password</label>
              <div className="error" id="passwordError" />
            </div>
            <div className="btn-box">
              <button className="button btn-submit" onClick={e => this.onSubmit(e)} type="submit">Submit</button>
              </div>
          </form>
         
          <Dashboard items= {this.state.items} />
          
        </div>
      );
  }
}

export default Form;
