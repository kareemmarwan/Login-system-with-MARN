import React from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// create my store with useContext
export const AuthContext = React.createContext();


//inialState place for all my data

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};


// Action for my login 
const reducer = (state, action) => {
  switch (action.type) {

    case "LOGIN":
    case "REGISTER":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};



function App() {
  // my reducer for get my data from the table
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // This fun for chack my token if my token here  you do login  on my web site if not do you stay your place
  React.useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('user') || null)
    const token = JSON.parse(localStorage.getItem("token") || null);

    if (token) {
      dispatch({
        type: "LOGIN",
        payload: {
          token
        }
      });
    }
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Router>
        <Header />
        <Switch>
        </Switch>

        <div className="App">{!state.isAuthenticated ?<Route path="/login" component={Login}/>:<Route path="/home" exact  component={Home}/>}||
        {!state.isAuthenticated ?<Route path="/register" component={Register}/> :<Route path="/home" exact  component={Home}/>}
        </div>

       
       

       
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
