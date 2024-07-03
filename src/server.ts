import express, { Request, Response } from 'express';
import path from 'path';
import { auth } from 'express-openid-connect';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8080;

// Auth configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: 'http://127.0.0.1:8080',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: 'https://dev-rydcu5ktr7kdkapy.us.auth0.com'
};

// Auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '/frontend')));

// Endpoint to check authentication status
app.get('/auth-status', (req: Request, res: Response) => {
    console.log('Auth status endpoint hit');
    res.json({ authenticated: req.oidc.isAuthenticated() });
});


// Serve the backend files if necessary
app.get('/api', (req: Request, res: Response) => {
    res.send('Hello from the backend!');
});

// Serve static index.html for all other routes
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '/frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

