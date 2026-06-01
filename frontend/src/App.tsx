import { Link, NavLink, Route, Routes } from 'react-router-dom'
import AnalyzePage from './pages/AnalyzePage'
import ResultsPage from './pages/ResultsPage'
import DashboardPage from './pages/DashboardPage'
import KnowledgeBasePage from './pages/KnowledgeBasePage'

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? 'bg-slate-900 text-white'
            : 'text-slate-600 hover:bg-slate-200'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            to="/"
            className="font-bold text-lg text-slate-900 hover:text-slate-600 transition-colors"
          >
            CV Gap Detector
          </Link>
          <nav className="flex gap-1 ml-auto">
            <NavItem to="/" label="Analiza" />
            <NavItem to="/dashboard" label="Istorija" />
            <NavItem to="/knowledge-base" label="Baza znanja" />
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<AnalyzePage />} />
          <Route path="/results/:id" element={<ResultsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
        </Routes>
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-6 text-xs text-slate-400">
        Spring Boot + Drools backend mora biti pokrenut na http://localhost:8080
        (mvn spring-boot:run iz service/).
      </footer>
    </div>
  )
}
