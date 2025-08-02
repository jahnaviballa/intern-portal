const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
const interns = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    referralCode: "JOHNDOE2025",
    donationsRaised: 1250,
    rewards: ["Bronze Badge", "Early Access"]
  },
  {
    id: 2, 
    name: "Jane Smith",
    email: "jane@example.com",
    referralCode: "JANESMITH2025",
    donationsRaised: 2500,
    rewards: ["Silver Badge", "Exclusive Content"]
  }
];

// ===== ROUTES ===== //

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'API is working',
    message: 'Welcome to Intern Portal API',
    endpoints: [
      { method: 'GET', path: '/api/interns', description: 'Get all interns' },
      { method: 'GET', path: '/api/interns/:id', description: 'Get single intern' }
    ]
  });
});

// Get all interns
app.get('/api/interns', (req, res) => {
  res.json(interns);
});

// Get single intern
app.get('/api/interns/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const intern = interns.find(i => i.id === id);
  
  if (!intern) {
    return res.status(404).json({
      error: 'Intern not found'
    });
  }
  
  res.json(intern);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Try these endpoints:');
  console.log(`- http://localhost:${PORT}/`);
  console.log(`- http://localhost:${PORT}/api/interns`);
  console.log(`- http://localhost:${PORT}/api/interns/1`);  // Fixed this line (changed Port to PORT)
});