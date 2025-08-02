import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [intern, setIntern] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/interns/${id}`);
        setIntern(response.data);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) return (
    <div className="dashboard-loading">
      <div className="spinner"></div>
      <p>Loading your dashboard...</p>
    </div>
  );

  if (error) return (
    <div className="dashboard-error">
      <div className="error-icon">⚠️</div>
      <h2>Error Loading Data</h2>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );

  if (!intern) return (
    <div className="dashboard-empty">
      <h2>No Data Found</h2>
      <p>We couldn't find any information for this intern.</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome back, <span className="highlight">{intern.name}</span>!</h1>
        <p className="welcome-message">Here's your current progress and achievements</p>
      </header>

      <div className="dashboard-grid">
        {/* Profile Card */}
        <div className="dashboard-card profile-card">
          <div className="card-header">
            <h2>Your Profile</h2>
          </div>
          <div className="card-content">
            <div className="profile-item">
              <span className="label">Email:</span>
              <span className="value">{intern.email}</span>
            </div>
            <div className="profile-item">
              <span className="label">Member Since:</span>
              <span className="value">June 2023</span>
            </div>
          </div>
        </div>

        {/* Referral Card */}
        <div className="dashboard-card referral-card">
          <div className="card-header">
            <h2>Your Referral Code</h2>
          </div>
          <div className="card-content">
            <div className="referral-code">
              {intern.referralCode}
              <button 
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(intern.referralCode);
                  alert('Copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
            <p className="referral-info">
              Share this code with friends to earn rewards!
            </p>
          </div>
        </div>

        {/* Donations Card */}
        <div className="dashboard-card donations-card">
          <div className="card-header">
            <h2>Donations Raised</h2>
          </div>
          <div className="card-content">
            <div className="donation-amount">
              ${intern.donationsRaised.toLocaleString()}
            </div>
            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{ width: `${Math.min(100, (intern.donationsRaised / 5000) * 100)}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {intern.donationsRaised >= 5000 ? 'Goal achieved! 🎉' : 
               `${5000 - intern.donationsRaised} to next milestone`}
            </p>
          </div>
        </div>

        {/* Rewards Card */}
        <div className="dashboard-card rewards-card">
          <div className="card-header">
            <h2>Your Rewards</h2>
          </div>
          <div className="card-content">
            {intern.rewards?.length > 0 ? (
              <ul className="rewards-list">
                {intern.rewards.map((reward, i) => (
                  <li key={i} className="reward-item">
                    <span className="reward-badge">🎖️</span>
                    {reward}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-rewards">Complete more tasks to unlock rewards!</p>
            )}
          </div>
        </div>

        {/* Stats Card */}
        <div className="dashboard-card stats-card">
          <div className="card-header">
            <h2>Your Stats</h2>
          </div>
          <div className="card-content">
            <div className="stat-item">
              <span className="stat-value">24</span>
              <span className="stat-label">Tasks Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">8</span>
              <span className="stat-label">Referrals</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">3</span>
              <span className="stat-label">Badges Earned</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card actions-card">
          <div className="card-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="card-content">
            <button className="action-button">
              Share Your Profile
            </button>
            <button className="action-button" onClick={() => navigate('/leaderboard')}>
              View Leaderboard
            </button>
            <button className="action-button">
              Invite Friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;