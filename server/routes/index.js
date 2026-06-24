const router = require('express').Router();
const apiRoutes = require('./api');

const keys = require('../config/keys');
// Safe fallback if apiURL evaluates to undefined during initialization
const apiURL = keys.app.apiURL && keys.app.apiURL !== 'undefined' ? keys.app.apiURL : 'api';

const api = `/${apiURL}`;

// 1. Mount all valid API endpoints from your routes/api directory
router.use(api, apiRoutes);

// 2. Catch-all fallback block for bad API requests (Triggers the 404 you see in the browser)
router.use(api, (req, res) => {
  console.log(`[404 Route Error]: The frontend tried to call "${req.method} ${api}${req.url}", but this route doesn't exist on the backend.`);
  return res.status(404).json({ error: 'No API route found' });
});

module.exports = router;