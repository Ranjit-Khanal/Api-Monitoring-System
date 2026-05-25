# API Monitoring Dashboard

A modern React dashboard for visualizing API monitoring metrics in real-time.

## Features

- 🔐 JWT Authentication
- 📊 Real-time metrics display
- 🔄 Auto-refresh every 30 seconds
- 📈 Stats cards with key metrics
- 📋 Top endpoints list
- 💅 Beautiful, responsive UI
- ⚡ Built with Vite and TanStack Query

## Tech Stack

- **React 18** - UI library
- **TanStack Query** - Data fetching and caching
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Recharts** - Charting library (ready to use)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Access at http://localhost:5173

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
```

## Default Credentials

- **Username**: admin
- **Password**: admin123

(Created by the backend initialization script)

## Project Structure

```
src/
├── api/
│   └── api.js          # API client with interceptors
├── components/
│   ├── Login.jsx       # Login form
│   ├── Login.css
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Dashboard.css
│   ├── StatsGrid.jsx   # Metrics cards
│   ├── StatsGrid.css
│   ├── TopEndpoints.jsx  # Endpoints list
│   └── TopEndpoints.css
├── App.jsx             # Root component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## API Integration

The dashboard communicates with the backend API:

- `POST /api/auth/login` - Authentication
- `GET /api/analytics/dashboard` - Dashboard data

TanStack Query handles:
- Automatic refetching
- Caching
- Loading states
- Error handling

## Features

### Authentication
- JWT token stored in localStorage
- Automatic token injection in requests
- Auto-logout on 401 responses

### Dashboard
- Overall statistics
- Error rates
- Latency metrics
- Top endpoints by hit count
- Auto-refresh every 30 seconds

### Responsive Design
- Mobile-friendly
- Tablet-optimized
- Desktop-enhanced

## Customization

### Change Refresh Interval

In `Dashboard.jsx`:
```javascript
refetchInterval: 30000, // milliseconds
```

### Add New API Calls

In `src/api/api.js`:
```javascript
export const analyticsApi = {
  // Add your new API call
  getCustomData: async () => {
    const response = await api.get('/analytics/custom');
    return response.data;
  },
};
```

### Theme Colors

Edit CSS files to customize colors:
- Primary: `#667eea`
- Error: `#e74c3c`
- Success: `#27ae60`

## License

MIT
