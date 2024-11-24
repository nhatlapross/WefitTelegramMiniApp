import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import { google } from 'googleapis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req })
    
    if (!session) {
      console.log('No session found')
      return res.status(401).json({ error: 'Unauthorized: No session found' })
    }

    if (!session.accessToken) {
      console.log('No access token found in session')
      return res.status(401).json({ error: 'Unauthorized: No access token in session' })
    }

    console.log('Session found with access token')

    const oauth2Client = new google.auth.OAuth2()
    oauth2Client.setCredentials({ access_token: session.accessToken as string })

    const fitness = google.fitness({ version: 'v1', auth: oauth2Client })

    const now = new Date();
    const startTime = new Date(now.setHours(0, 0, 0, 0));
    const endTime = new Date(now.setHours(23, 59, 59, 999));

    const response = await (fitness.users.dataset.aggregate as any)({
      userId: 'me',
      requestBody: {
        aggregateBy: [
          {
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
          },
          {
            dataTypeName: 'com.google.distance.delta',
            dataSourceId: 'derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta'
          },
          {
            dataTypeName: 'com.google.calories.expended',
            dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended'
          },
          {
            dataTypeName: 'com.google.active_minutes',
            dataSourceId: 'derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes'
          }
        ],
        bucketByTime: { durationMillis: 86400000 }, // 1 day in milliseconds
        startTimeMillis: startTime.getTime(),
        endTimeMillis: endTime.getTime(),
      },
    });

    const stepData = response.data.bucket[0].dataset[0].point[0]?.value[0]?.intVal || 0;
    const distanceData = response.data.bucket[0].dataset[1].point[0]?.value[0]?.fpVal || 0;
    const caloriesData = response.data.bucket[0].dataset[2].point[0]?.value[0]?.fpVal || 0;
    const durationData = response.data.bucket[0].dataset[3].point[0]?.value[0]?.intVal || 0;
    
    res.status(200).json({
      steps: stepData,
      distance: distanceData, // This will be in meters
      calories: caloriesData,
      activeDuration: durationData // This will be in minutes
    });
  } catch (error: any) {
    console.error('Error in getFitnessData:', error)
    res.status(500).json({ 
      error: 'Failed to fetch fitness data', 
      message: error.message,
      stack: error.stack
    })
  }
}