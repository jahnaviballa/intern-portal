// client/src/pages/Leaderboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Leaderboard() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await axios.get('/api/interns');
        setInterns(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  const getMedal = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return index + 1;
    }
  };

  if (loading) return (
    <div className="leaderboard-loading">
      <div className="spinner"></div>
      <p>Loading leaderboard...</p>
    </div>
  );

  if (error) return (
    <div className="leaderboard-error">
      <div className="error-icon">⚠️</div>
      <h2>Error Loading Leaderboard</h2>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1>Top Interns Leaderboard</h1>
        <p>See how you compare with other interns</p>
      </header>

      <div className="leaderboard-content">
        <div className="leaderboard-controls">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="leaderboard-table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Intern</th>
                <th>Donations Raised</th>
                <th>Referral Code</th>
              </tr>
            </thead>
            <tbody>
              {interns
                .sort((a, b) => b.donationsRaised - a.donationsRaised)
                .map((intern, index) => (
                  <tr 
                    key={intern.id} 
                    className={index < 3 ? `top-${index + 1}` : ''}
                    onClick={() => navigate(`/dashboard/${intern.id}`)}
                  >
                    <td className="rank-cell">
                      <span className="rank-number">{getMedal(index)}</span>
                    </td>
                    <td className="intern-cell">
                      <div className="intern-info">
                        <span className="intern-name">{intern.name}</span>
                        <span className="intern-email">{intern.email}</span>
                      </div>
                    </td>
                    <td className="donation-cell">
                      <span className="donation-amount">${intern.donationsRaised.toLocaleString()}</span>
                      <div className="progress-container">
                        <div 
                          className="progress-bar"
                          style={{ width: `${Math.min(100, (intern.donationsRaised / 5000) * 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="referral-cell">
                      <span className="referral-code">{intern.referralCode}</span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="leaderboard-footer">
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;