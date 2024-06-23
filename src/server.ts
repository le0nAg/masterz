import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT = 8080;

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '/frontend')));

// Serve the backend files if necessary
app.get('/api', (req: Request, res: Response) => {
    res.send('Hello from the backend!');
});

// Serve static index.html for all other routes
/*app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '/frontend', 'index.html'));
});*/

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

//--------------------------------------------
import 'express-openid-connect';
const { auth } = require('express-openid-connect');

require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: 'http://127.0.0.1:8080',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: 'https://dev-rydcu5ktr7kdkapy.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

