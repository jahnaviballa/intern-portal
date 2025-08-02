// client/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would authenticate here
    navigate('/dashboard/1'); // Redirect to dashboard with user ID 1
  };

  return (
    <div className="login-container">
      <h1>Intern Portal</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login / Sign Up</button>
      </form>
    </div>
  );
}

export default Login;