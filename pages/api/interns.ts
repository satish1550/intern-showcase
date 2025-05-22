import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { data } = await axios.get(process.env.GOOGLE_SCRIPT_URL)
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch data')
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching intern data:', error)
    return res.status(500).json({ message: 'Failed to fetch intern data' })
  }
} 