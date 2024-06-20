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
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '/frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
