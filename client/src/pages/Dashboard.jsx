

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Pages.css";
import SearchBox from "../Components/SearchBox"; 

const Dashboard = () => {
  const [docs, setDocs] = useState([]);
  const [profile, setProfile] = useState(null);
  const location = useLocation();

  // Fetch documents
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/docs", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setDocs(res.data);
      } catch (err) {
        console.error("Error fetching docs:", err);
      }
    };
    fetchDocs();
  }, [location.key]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization:`Bearer ${localStorage.getItem("token")}`},
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/docs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")} `},
      });
      setDocs(docs.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error("Error deleting doc:", err.response?.data || err.message);
    }
  };

  const handleSearchResults = (results) => {
    setDocs(results);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">

        <div className="dashboard-header">
          {profile && (
            <div className="profile-box">
              
              <p><strong>Logged in as</strong> {profile.name}</p>

              <Link to="/profile">
                <button className="btn-view-profile">View Full Profile</button>
              </Link>
            </div>
          )}

          
          <h1 className="dashboard-title">Your Documents</h1>

       
        </div>
        

        <div className="dashboard-content">

         

          {/* Main Documents Section */}
          <div className="documents-section">
            <SearchBox onResults={handleSearchResults} />
             {/* Profile Sidebar */}
          
            <Link to="/add-doc" className="btn-add">
              <span> + Add Document</span>
            </Link>

            <div className="document-grid">
              {docs.length === 0 ? (
                <p className="no-docs">No documents yet. Add one!</p>
              ) : (
                docs.map((doc) => (
                  <div key={doc._id} className="document-card">
                    <h3 className="document-title">{doc.title}</h3>

                    {doc.summary && (
                      <p className="document-summary">
                        <strong>Summary:</strong> {doc.summary}
                      </p>
                    )}

                    {doc.content && (
                      <p className="document-content">
                        <strong>Content:</strong> {doc.content}
                      </p>
                    )}

                    <p className="document-author">
                      <strong>Author:</strong> {doc.createdBy?.name || "Unknown"}
                    </p>

                    <div className="document-actions">
                      <Link to={`/edit/${doc._id}`} className="btn btn-edit">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="btn btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          

        </div>
      </div>
    </div>
  );
};

export default Dashboard;