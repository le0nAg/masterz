"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_openid_connect_1 = require("express-openid-connect");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use((0, express_openid_connect_1.auth)(config));
// Serve static files from the 'frontend' directory
app.use(express_1.default.static(path_1.default.join(__dirname, '/frontend')));
// Endpoint to check authentication status
app.get('/auth-status', (req, res) => {
    console.log('Auth status endpoint hit');
    res.json({ authenticated: req.oidc.isAuthenticated() });
});
// Serve the backend files if necessary
app.get('/api', (req, res) => {
    res.send('Hello from the backend!');
});
// Serve static index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/frontend', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
