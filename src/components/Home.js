import React from "react";
import { AuthContext } from "../App";
import AddProfile from "./Profile";
import Card from "./Card";

export const ProfileContext = React.createContext();
const initialState = {
  profile: [],
  isFetching: false,
  hasError: false,
  isProfileSubmitting: false,
  profileHasError: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PROFILE_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case "FETCH_PROFILE_SUCCESS":
      return {
        ...state,
        isFetching: false,
        profile: action.payload
      };
    case "FETCH_PROFILE_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
      case "ADD_PROFILE_REQUEST":
        return {
          ...state,
          isProfileSubmitting: true,
          profileHasError: false,
        }
      case "ADD_PROFILE_SUCCESS":
        return {
          ...state,
          isProfileSubmitting: false,
          profile: [...state.profile, action.payload]
        }
      case "ADD_PROFILE_FAILURE":
        return {
          ...state,
          isPofileSubmitting: false,
          profileHasError: true,
        }
      default:
        return state;
  }
};
// this my home ////////////////////////////////////////////////////////////////////////////////////////
export const Home = () => {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [isAddProfileModalVisible, setAddProfileModalVisibility] = React.useState(false);

  const toggleAddProfile = () => {
    setAddProfileModalVisibility(!isAddProfileModalVisible);
  }

  React.useEffect(() => {
    dispatch({
      type: "FETCH_PROFILE_REQUEST"
    });
    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        console.log(resJson);
        dispatch({
          type: "FETCH_PROFILE_SUCCESS",
          payload: resJson
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "FETCH_PROFILE_FAILURE"
        });
      });
  }, [authState.token]);

  return (
    <React.Fragment>
    <ProfileContext.Provider value={{
      state,
      dispatch
    }}>
      <button className="toggle-button" onClick={toggleAddProfile}>ADD Profile</button>
      <AddProfile  onClose={toggleAddProfile} show={isAddProfileModalVisible} />
    </ProfileContext.Provider>
    <div className="home">
      {state.isFetching ? (
        <span className="loader">LOADING...</span>
      ) : state.hasError ? (
        <span className="error">AN ERROR HAS OCCURED</span>
      ) : (
        <>
          {state.profile.length > 0 &&
            state.profile.map(profile => (
              <Card key={profile.id.toString()} profile={profile} />
            ))}
        </>
      )}
    </div>
    </React.Fragment>
  );
};

export default Home;