import React from "react";
import logo from "../logo.svg";
import { AuthContext } from "../App";
export const Register = () => {

  // my all store
  const { dispatch } = React.useContext(AuthContext);

  // for data name
  const initialState = {
    name: "",
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  //data for ipdata and get 
  const [data, setData] = React.useState(initialState);


  // function for change data
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };



// function for  handleFormSubmit
  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    fetch("http://localhost:5000/api/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
        dispatch({
          type: "REGISTER",
          payload: resJson
        });
      })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
  };
  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <h1>Register</h1>

            <label htmlFor="name">
              name
              <input
                type="text"
                value={data.name}
                onChange={handleInputChange}
                name="name"
                id="name"
              />
            </label>

            <label htmlFor="email">
              Email Address
              <input
                type="text"
                value={data.email}
                onChange={handleInputChange}
                name="email"
                id="email"
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>

            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? (
                <img className="spinner" src={logo} alt="loading icon" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
