"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 8080;
// Serve static files from the 'frontend' directory
app.use(express_1.default.static(path_1.default.join(__dirname, '/frontend')));
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
