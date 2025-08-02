import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const { id } = useParams();
  const [intern, setIntern] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/interns/${id}`);
        console.log('API Response:', response.data); // Verify this in console
        setIntern(response.data); // Fix: Remove extra .data
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) return <div style={{padding: '20px'}}>Loading dashboard...</div>;
  if (error) return <div style={{padding: '20px', color: 'red'}}>Error: {error}</div>;
  if (!intern) return <div style={{padding: '20px'}}>No intern data found</div>;

  return (
    <div style={{padding: '20px'}}>
      <h1>Welcome, {intern.name}!</h1>
      <h2>Referral Code: {intern?.referralCode}</h2>
      <h3>Donations Raised: ${intern.donationsRaised}</h3>
      <h4>Rewards:</h4>
      <ul>
        {intern.rewards?.map((reward, i) => (
          <li key={i}>{reward}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;