import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth          from './pages/Auth'
import Main          from './pages/Main'
import MeineLektion  from './pages/MeineLektion'
import Bucher        from './pages/Bucher'
import Podcast       from './pages/Podcast'
import Wortschatz    from './pages/Wortschatz'
import Videos        from './pages/Videos'
import Notifications from './pages/Notifications'
import Chat          from './pages/Chat'
import Profile       from './pages/Profile'
import Rang          from './pages/Rang'
import Einstellungen from './pages/Einstellungen'
import Unterricht    from './pages/Unterricht'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth"               element={<Auth />}          />
        <Route path="/main"               element={<Main />}          />
        <Route path="/lektion/1"          element={<MeineLektion />}  />
        <Route path="/bucher"             element={<Bucher />}        />
        <Route path="/podcast"            element={<Podcast />}       />
        <Route path="/wortschatz"         element={<Wortschatz />}    />
        <Route path="/videos"             element={<Videos />}        />
        <Route path="/benachrichtigungen" element={<Notifications />} />
        <Route path="/chat"               element={<Chat />}          />
        <Route path="/profil"             element={<Profile />}       />
        <Route path="/rang"               element={<Rang />}          />
        <Route path="/einstellungen"      element={<Einstellungen />} />
        <Route path="/unterricht"         element={<Unterricht />}    />
        <Route path="*"                   element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
