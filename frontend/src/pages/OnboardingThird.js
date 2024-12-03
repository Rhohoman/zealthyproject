import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddress, setBirthday, setAboutMe } from "../rootSlice";
import { useSelector } from "react-redux";
import "../styles/pages/OnboardingThird.css";

export const OnboardingThird = () => {
  const baseUrl = "http://localhost:5000/";

  const [streetAddress, setStreetAddress] = useState("");
  const [cityAddress, setCityAddress] = useState("");
  const [stateAddress, setStateAddress] = useState("");
  const [zipCodeAddress, setZipCodeAddress] = useState("");

  const [birthday, setLocalBirthday] = useState("");
  const [aboutMe, setAboutMeInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page3Components = useSelector((state) => state.admin.page3Components);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = {};

    if (page3Components.includes("aboutMe")) {
      dispatch(setAboutMe(aboutMe));
      fields.aboutMe = aboutMe;
    }
    if (page3Components.includes("address")) {
      fields.address = {
        streetAddress,
        cityAddress,
        stateAddress,
        zipCodeAddress,
      };
      dispatch(setAddress(fields.address));
    }
    if (page3Components.includes("birthday")) {
      dispatch(setBirthday(birthday));
      fields.birthday = birthday;
    }

    sendPostRequest(fields);

    navigate("/data");
  };

  async function sendPostRequest(fields) {
    try {
      const res = await fetch(baseUrl + "third-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
        credentials: "include",
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Error: ${res.statusText}, ${errorMessage}`);
      }

      const data = await res.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Request failed...", error);
    }
  }

  return (
    <form id="third-step" onSubmit={handleSubmit} className="third-form">
      {page3Components.includes("address") && (
        <div className="address-form">
          <h3>Address Information</h3>
          <label htmlFor="streetAddress">Street Address</label>
          <input
            placeholder="Enter Here"
            type="text"
            id="street-address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
          <label htmlFor="cityAddress">City</label>
          <input
            placeholder="Enter Here"
            type="text"
            id="city"
            value={cityAddress}
            onChange={(e) => setCityAddress(e.target.value)}
          />
          <label htmlFor="stateAddress">State</label>
          <input
            placeholder="Enter Here"
            type="text"
            id="state"
            value={stateAddress}
            onChange={(e) => setStateAddress(e.target.value)}
          />
          <label htmlFor="zipCodeAddress">Zip Code</label>
          <input
            placeholder="Enter Here"
            type="text"
            id="zip-code"
            value={zipCodeAddress}
            onChange={(e) => setZipCodeAddress(e.target.value)}
          />
        </div>
      )}

      {page3Components.includes("birthday") && (
        <div className="birthday-form">
          <h3>Birthday</h3>
          <label htmlFor="birthday-input">Enter Your Birthday</label>
          <input
            type="date"
            id="birthday-input"
            value={birthday}
            onChange={(e) => setLocalBirthday(e.target.value)}
          />
        </div>
      )}

      {page3Components.includes("aboutMe") && (
        <div className="aboutme-form">
          <h3>About Me</h3>
          <label htmlFor="about-me-input">Tell Us About Yourself</label>
          <textarea
            placeholder="Enter Here"
            id="about-me-input"
            value={aboutMe}
            onChange={(e) => setAboutMeInput(e.target.value)}
          />
        </div>
      )}

      <button
        id="submit-button"
        type="submit button"
        className="btn btn-primary"
      >
        Complete
      </button>
    </form>
  );
};
