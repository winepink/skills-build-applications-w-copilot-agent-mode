import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const sections = [
  { title: 'Activities', path: '/activities', description: 'Log movement and celebrate your progress.' },
  { title: 'Leaderboard', path: '/leaderboard', description: 'See how your team effort adds up.' },
  { title: 'Teams', path: '/teams', description: 'Find your people and keep each other moving.' },
  { title: 'Users', path: '/users', description: 'Meet the people on your OctoFit team.' },
  { title: 'Workouts', path: '/workouts', description: 'Discover ideas for your next session.' },
]

function Dashboard() {
  return (
    <main className="container py-5">
      <section className="hero-panel rounded-4 p-4 p-md-5">
        <p className="eyebrow mb-2">Your movement, your momentum</p>
        <h1 className="display-5 fw-bold">Build healthy habits, together.</h1>
        <p className="lead col-lg-8">
          Track activities, encourage your team, and make every step count.
        </p>
        <Link className="btn btn-light btn-lg mt-2" to="/activities">
          Explore activities
        </Link>
      </section>

      <section aria-labelledby="features-heading" className="mt-5">
        <h2 id="features-heading" className="h3 fw-bold mb-3">Make your next move</h2>
        <div className="row g-3">
          {sections.map(({ title, path, description }) => (
            <div className="col-sm-6 col-xl-3" key={path}>
              <Link className="feature-card card h-100 text-decoration-none" to={path}>
                <div className="card-body">
                  <h3 className="h5 card-title">{title}</h3>
                  <p className="card-text text-body-secondary">{description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function NotFound() {
  return (
    <main className="container py-5">
      <p className="eyebrow mb-2">OctoFit Tracker</p>
      <h1 className="display-6 fw-bold">Page not found</h1>
      <Link className="btn btn-outline-primary mt-2" to="/">
        Back to dashboard
      </Link>
    </main>
  )
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
            <img src="/octofitapp-small.png" alt="" width="40" height="40" />
            OctoFit Tracker
          </Link>
          <div className="navbar-nav ms-auto flex-row flex-wrap gap-2">
            {sections.map(({ title, path }) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                end
                key={path}
                to={path}
              >
                {title}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
