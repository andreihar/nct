const fs = require('fs');

// Load environment variables from .env file
require('dotenv').config();

// Load template file
let config = fs.readFileSync('src/environments/environment.ts.template', 'utf8');

// Replace placeholders with environment variables
config = config.replace('${FIREBASE_API_KEY}', process.env.FIREBASE_API_KEY)
	.replace('${FIREBASE_AUTH_DOMAIN}', process.env.FIREBASE_AUTH_DOMAIN)
	.replace('${FIREBASE_PROJECT_ID}', process.env.FIREBASE_PROJECT_ID)
	.replace('${FIREBASE_STORAGE_BUCKET}', process.env.FIREBASE_STORAGE_BUCKET)
	.replace('${FIREBASE_MESSAGING_SENDER_ID}', process.env.FIREBASE_MESSAGING_SENDER_ID)
	.replace('${FIREBASE_APP_ID}', process.env.FIREBASE_APP_ID)
	.replace('${FIREBASE_MEASUREMENT_ID}', process.env.FIREBASE_MEASUREMENT_ID);

// Write to environment.ts
fs.writeFileSync('src/environments/environment.ts', config);