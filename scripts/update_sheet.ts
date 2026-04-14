import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function updateSheet() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1CchfCf3TCxiDk8R8WT5ZaKIL1M38iUqyw4HKLlduLIQ';

  console.log('Updating headers...');
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Master!I1:M1',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [['Slug', 'Tagline', 'Description', 'Image URL', 'Features']],
    },
  });

  console.log('Adding sample data for PT48-50...');
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Master!I2:M2',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        'portable-ev-charger-48v-50a',
        'Ultra-portable 48V charging solution for urban micromobility.',
        'The eDrift Elite PT48-50 is a rugged, portable charger designed for light electric vehicles. With a wide input range and high efficiency, it provides reliable power in a compact form factor.',
        'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800',
        'IP67 Waterproof, Over-Voltage Protection, Smart Thermal Management'
      ]],
    },
  });

  console.log('Success!');
}

updateSheet().catch(console.error);
