import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAboutMe, setAddress, setBirthday } from "../rootSlice";
import "../styles/pages/OnboardingSecond.css";
export const OnboardingSecond = () => {
  const baseUrl = "http://localhost:5000/";

  const [inputAboutMe, setInputAboutMe] = useState("");
  const [inputBirthday, setInputBirthday] = useState("");
  // const [inputAddress, setInputAddress] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [cityAddress, setCityAddress] = useState("");
  const [stateAddress, setStateAddress] = useState("");
  const [zipCodeAddress, setZipCodeAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page2Components = useSelector((state) => state.admin.page2Components);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = {};

    if (page2Components.includes("aboutMe")) {
      fields.aboutMe = inputAboutMe;
      dispatch(setAboutMe(inputAboutMe));
    }
    if (page2Components.includes("address")) {
      fields.address = {
        streetAddress,
        cityAddress,
        stateAddress,
        zipCodeAddress,
      };
      dispatch(setAddress(fields.address));
    }
    if (page2Components.includes("birthday")) {
      fields.inputBirthday = inputBirthday;
      dispatch(setBirthday(inputBirthday));
    }

    sendPostRequest(fields);

    navigate("/onboarding/3");
  };

  async function sendPostRequest(fields) {
    try {
      const res = await fetch(baseUrl + "second-form", {
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
    <div className="second-step">
      <form onSubmit={handleSubmit} className="onboarding-form">
        {page2Components.includes("aboutMe") && (
          <div>
            <h3 htmlFor="about-me-input">About Me </h3>
            <br />
            <textarea
              placeholder="Enter Here"
              value={inputAboutMe}
              onChange={(e) => setInputAboutMe(e.target.value)}
              type="text"
              id="about-me-input"
            />
          </div>
        )}
        {page2Components.includes("address") && (
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
        {page2Components.includes("birthday") && (
          <div>
            <h3 htmlFor="birthday-input">Birthday </h3>
            <br />
            <input
              value={inputBirthday}
              onChange={(e) => setInputBirthday(e.target.value)}
              type="date"
              id="birthday-input"
            />
          </div>
        )}
        <br />
        <button type="submit button" className="btn btn-primary">
          Next Step
        </button>
      </form>
    </div>
  );
};
