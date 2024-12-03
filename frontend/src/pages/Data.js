import { useEffect, useState } from "react";
import "../styles/pages/Data.css";
export const Data = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user-data", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          const formattedData = data.userData.map((user) => ({
            ...user,
            birthday: formatDate(user.birthday),
          }));

          setUserData(formattedData);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("An error occurred while fetching user data.");
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}`;
  };
  return (
    <div className="table-container">
      <h3>User Data</h3>
      {userData.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>EMAIL</th>
              <th>About Me</th>
              <th>Birthday</th>
              <th>Street Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id ? user.id : "N/A"}</td>
                <td>{user.email ? user.email : "N/A"}</td>
                <td>{user.about_me ? user.about_me : "N/A"}</td>
                <td>{user.birthday ? user.birthday : "N/A"}</td>
                <td>{user.street_address ? user.street_address : "N/A"}</td>
                <td>{user.city_address ? user.city_address : "N/A"}</td>
                <td>{user.state_address ? user.state_address : "N/A"}</td>
                <td>{user.zip_code_address ? user.zip_code_address : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};
