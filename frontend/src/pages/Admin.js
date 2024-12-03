import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage2Components, setPage3Components } from "../adminSlice";
import { useState, useEffect } from "react";
import "../styles/pages/Admin.css";

export const Admin = () => {
  const dispatch = useDispatch();
  const page2Components = useSelector((state) => state.admin.page2Components);
  const page3Components = useSelector((state) => state.admin.page3Components);
  const componentArr = ["address", "birthday", "aboutMe"];

  const [localPage2Components, setLocalPage2Components] =
    useState(page2Components);
  const [localPage3Components, setLocalPage3Components] =
    useState(page3Components);

  useEffect(() => {
    setLocalPage2Components(page2Components);
    setLocalPage3Components(page3Components);
  }, [page2Components, page3Components]);

  const handleCheckboxChange = (page, component) => {
    if (page === "page2") {
      const newSelection = localPage2Components.includes(component)
        ? localPage2Components.filter((comp) => comp !== component) // Remove it
        : [...localPage2Components, component]; // Add it
      setLocalPage2Components(newSelection);
      dispatch(setPage2Components(newSelection));
    } else if (page === "page3") {
      const newSelection = localPage3Components.includes(component)
        ? localPage3Components.filter((comp) => comp !== component) // Remove it
        : [...localPage3Components, component]; // Add it
      setLocalPage3Components(newSelection);
      dispatch(setPage3Components(newSelection));
    }
  };

  const handleSaveConfiguration = () => {
    dispatch(setPage2Components(localPage2Components));
    dispatch(setPage3Components(localPage3Components));

    if (localPage2Components.length === 0) {
      alert("Onboarding pages cannot be empty!");
      return;
    }

    if (localPage3Components.length === 0) {
      alert("Onboarding pages cannot be empty!");
      return;
    }
    alert("Configuration saved!");
  };

  const isCheckboxDisabled = (page, component) => {
    if (page === "page2") {
      return localPage3Components.includes(component);
    } else if (page === "page3") {
      return localPage2Components.includes(component);
    }
    return false;
  };

  return (
    <div className="admin-container">
      <h3>Admin Configuration</h3>
      <div className="checkbox-container">
        <h4>Onboarding Page 2</h4>
        <div className="checkboxes">
          {componentArr.map((component) => (
            <label key={`page2-${component}`}>
              <input
                id={`page-2-${component}`}
                type="checkbox"
                checked={localPage2Components.includes(component)}
                onChange={() => handleCheckboxChange("page2", component)}
                disabled={isCheckboxDisabled("page2", component)}
              />
              {component.charAt(0).toUpperCase() + component.slice(1)}
            </label>
          ))}
        </div>
        <h4>Onboarding Page 3</h4>
        <div className="checkboxes">
          {componentArr.map((component) => (
            <label key={`page3-${component}`}>
              <input
                id={`page-3-${component}`}
                type="checkbox"
                checked={localPage3Components.includes(component)}
                onChange={() => handleCheckboxChange("page3", component)}
                disabled={isCheckboxDisabled("page3", component)}
              />
              {component.charAt(0).toUpperCase() + component.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={handleSaveConfiguration}
        type="submit button"
        className="btn btn-primary"
      >
        Save Configuration
      </button>
    </div>
  );
};
