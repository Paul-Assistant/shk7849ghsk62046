import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const indexPath = path.join(process.cwd(), 'public', 'workspace-index.json');
    
    if (!fs.existsSync(indexPath)) {
      return res.status(404).json({ error: 'workspace-index.json not found' });
    }

    const data = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to load data' });
  }
}
