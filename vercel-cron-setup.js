// Vercel Cron Jobs Configuration
// Add this to your vercel.json file

{
  "crons": [
    {
      "path": "/api/airbnb/refresh",
      "schedule": "0 */6 * * *" // Every 6 hours
    },
    {
      "path": "/api/pickup-slots/generate",
      "schedule": "5 0 * * *" // Daily at 00:05
    },
    {
      "path": "/api/seasonal-tasks/generate",
      "schedule": "0 9 * * 1" // Weekly on Monday at 9:00
    },
    {
      "path": "/api/market-events/reminders",
      "schedule": "0 10 * * *" // Daily at 10:00
    }
  ]
}

// Manual trigger URLs (for testing):
// - Airbnb refresh: https://your-domain.com/api/airbnb/refresh
// - Slot generation: https://your-domain.com/api/pickup-slots/generate
// - Seasonal tasks: https://your-domain.com/api/seasonal-tasks/generate
// - Market reminders: https://your-domain.com/api/market-events/reminders
