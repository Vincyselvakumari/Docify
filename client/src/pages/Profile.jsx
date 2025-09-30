import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Pages.css"; 

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); 
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization:` Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load profile");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) return <p className="error-msg">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-full">
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
       
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div></div>
  );
};

export default Profile;