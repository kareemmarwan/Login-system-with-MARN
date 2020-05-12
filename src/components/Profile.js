import React from "react";
import { ProfileContext } from "./Home";
import { AuthContext } from "../App";

const AddProfile = (props) => {
  const { state, dispatch } = React.useContext(ProfileContext);
  const { state: authState } = React.useContext(AuthContext);

  const [name, setname] = React.useState("");
  const [skills, setskills] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const onClose = e => {
    props.onClose && props.onClose(e);
  };

  const isButtonDisabled = name === "" || skills === "" || imageUrl === "" || state.isSongSubmitting;

  const onSubmit = () => {
      dispatch({
          type: "ADD_SONG_REQUEST"
      })
      const Profile = {
        "name": name,
        "imageUrl": imageUrl,
        "skills": skills
      };
    fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.token}`,
          "Content-Type": `application/json`
        },
        body: JSON.stringify(Profile),
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw res;
          }
        })
        .then(data => {
            console.log(data);
            setskills("");
            setname("");
            setImageUrl("");
            dispatch({
                type: "ADD_Profile_SUCCESS",
                payload: data
            })
            onClose();
        }).catch(error => {
            dispatch({
                type: "ADD_Profile_FAILURE"
            })
        })
  }
    if (!props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
       <div className="modal-table-container">
        <div className="modal-table-cell">
         <div className="modal-overlay small">
              <div className="modal-header">
                <h1 className="modal-name">
                  ADD NEW Profile
                </h1>
              </div>
              <form className="modal-form">
                <div className="modal-form-inputs">

                <label htmlFor="name">name</label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={e => setname(e.target.value)}
                    className="text-input"
                    />

                <label htmlFor="skills">skills</label>
                    <input
                    id="skills"
                    name="skills"
                    type="text"
                    value={skills}
                    onChange={e => setskills(e.target.value)}
                    className="text-input"
                    />

                <label htmlFor="imageUrl">Image URL</label>
                    <input
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    className="text-input"
                    />
                </div>


                
                <div className="form-error">
                      <p>
                        {state.ProfileHasError && "Error Creating Profile!"}
                      </p>
                </div>
                <div className="form-action clearfix">
                    <button
                      type="button"
                      id="overlay-confirm-button"
                      className="button button-primary"
                      onClick={onSubmit}
                      disabled={isButtonDisabled}
                    >
                      {state.isProfileSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      id="overlay-cancel-button"
                      className="button button-default small close-overlay pull-right"
                      onClick={onClose}
                    >
                          Cancel
                    </button>
                </div>
              </form>
        </div>
        </div>
       </div>
      </div>
    );
};

export default AddProfile;