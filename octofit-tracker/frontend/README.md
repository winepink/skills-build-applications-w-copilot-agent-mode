# OctoFit Tracker presentation tier

The React 19 and Vite frontend runs on port 5173 and requests collection data from
the Express API on port 8000.

## API URL configuration

In Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`
using the Codespace name, for example:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite uses this value to request
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev`. Restart the Vite server
after changing `.env.local`; Vite reads environment variables when it starts.

When `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to
`http://localhost:8000`.
