// client/src/pages/Leaderboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/interns');
        setInterns(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div className="leaderboard">
      <h1>Top Interns</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Donations Raised</th>
          </tr>
        </thead>
        <tbody>
          {interns
            .sort((a, b) => b.donationsRaised - a.donationsRaised)
            .map((intern, index) => (
              <tr key={intern.id}>
                <td>{index + 1}</td>
                <td>{intern.name}</td>
                <td>${intern.donationsRaised}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;