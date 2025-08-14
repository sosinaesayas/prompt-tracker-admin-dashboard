# CircleScope Admin Dashboard

A React-based admin dashboard for managing AI prompt monitoring and policy compliance.

## Features

- **Secure Authentication**: JWT-based login system
- **Client Management**: Multi-tenant client administration
- **Prompt Monitoring**: Real-time view of captured AI prompts
- **Risk Analysis**: Severity-based prompt flagging and categorization
- **Analytics**: Comprehensive reporting and statistics
- **Responsive Design**: Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Backend server running on port 3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3001`

### Default Login Credentials

- **Email**: admin@circlescope.com
- **Password**: admin123

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.tsx       # Authentication page
│   ├── Dashboard.tsx   # Main dashboard layout
│   ├── Clients.tsx     # Client management
│   ├── Prompts.tsx     # Prompt logs viewer
│   └── Analytics.tsx   # Analytics and reporting
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
└── App.tsx            # Main application component
```

## API Endpoints

The dashboard connects to the following backend endpoints:

- `POST /auth/login` - User authentication
- `GET /clients` - Fetch all clients
- `POST /clients` - Create new client
- `GET /prompts` - Fetch prompt logs
- `GET /prompts/stats` - Get analytics data

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Styling

This project uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`.

## Security

- JWT tokens are stored in localStorage
- All API requests include authentication headers
- CORS is configured for local development
- Protected routes require authentication

## Deployment

1. Build the project:
```bash
npm run build
```

2. Serve the `dist` folder with your preferred web server

3. Update the API base URL in the components to point to your production backend
