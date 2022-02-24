import React from "react";
import "./style.css";
import * as Validator from "validatorjs";

const Input = ({ label, type, name, onChange }) => {
  return (
    <div>
      <label>{label} :</label>
      <br />
      <input
        type={type}
        name={name}
        onChange={(e) => onChange(e.target.value)}
      />
      <br />
    </div>
  );
};

const ShowErrors = ({ error }) => {
  return (
    <ul style={{ color: "red", marginLeft: "-20px" }}>
      {error.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  );
};

class Validation extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: [],
  };

  handleSumit = (event) => {
    event.preventDefault();

    const { name, email, password } = this.state;

    let data = {
      name,
      email,
      password,
    };

    let rules = {
      name: "required|string",
      email: "required|email",
      password: "required|min:8",
    };

    let validation = new Validator(data, rules);

    validation.passes();
    if (validation.fails()) {
      this.setState({
        error: [
          ...validation.errors.get("name"),
          ...validation.errors.get("email"),
          ...validation.errors.get("password"),
        ],
      });
    } else {
      alert(`
        Name : ${this.state.name}
        Email : ${this.state.email}
        Password : ${this.state.password}
    `);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSumit}>
          {this.state.error && <ShowErrors error={this.state.error} />}
          <h2>Register Page</h2>
          <Input
            label="Name"
            type="name"
            name="name"
            onChange={(value) => this.setState({ name: value })}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={(value) => this.setState({ email: value })}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            onChange={(value) => this.setState({ password: value })}
          />
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Validation;
