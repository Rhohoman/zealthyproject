import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setPassword } from "../rootSlice";
import "../styles/pages/Home.css";

export const Home = () => {
  const baseUrl = "http://localhost:5000/";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPostRequest(inputEmail, inputPassword);
    dispatch(setEmail(inputEmail));
    dispatch(setPassword(inputPassword));
    navigate("/onboarding/2");
  };

  async function sendPostRequest(email, password) {
    try {
      const res = await fetch(baseUrl + "initial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
    } catch (error) {
      console.error("Request failed...", error);
    }
  }

  return (
    <div className="home-container">
      <form onSubmit={handleSubmit} className="form-group">
        <div id="input-container">
          <h3 htmlFor="email-input">Email</h3>
          <input
            id="email-input"
            name="email-input"
            type="email"
            className="col-sm-2"
            onChange={handleEmailChange}
            placeholder="Enter here"
          />
          <h3 htmlFor="">Password </h3>
          <input
            id="password-input"
            type="password"
            className="col-sm-2"
            onChange={handlePasswordChange}
            placeholder="Enter here"
          />
        </div>
        <button type="submit button" className="btn btn-primary">
          Next Step
        </button>
      </form>
    </div>
  );
};
