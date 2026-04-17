import { forwardRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, GraduationCap, Trophy, Settings } from 'lucide-react'
import gsap from 'gsap'

const NAV_ITEMS = [
  { to: '/main',          label: 'Höhepunkte',    Icon: Home          },
  { to: '/unterricht',    label: 'Unterricht',    Icon: GraduationCap },
  { to: '/rang',          label: 'Der Rang',      Icon: Trophy        },
  { to: '/einstellungen', label: 'Einstellungen', Icon: Settings      },
]

const BottomNav = forwardRef(function BottomNav(_, ref) {
  const onTap = (e) => {
    const icon = e.currentTarget.querySelector('.nav-icon')
    if (!icon) return
    gsap.timeline()
      .to(icon, { y: -5, duration: 0.12, ease: 'power2.out' })
      .to(icon, { y: 0,  duration: 0.45, ease: 'bounce.out' })
  }

  return (
    <nav
      ref={ref}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100"
      style={{ boxShadow: '0 -2px 14px rgba(0,0,0,0.07)' }}
    >
      <div className="flex items-center">
        {NAV_ITEMS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={onTap}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors duration-200 ${
                isActive ? 'text-[#FFCE00]' : 'text-black'
              }`
            }
          >
            <Icon className="nav-icon w-6 h-6" />
            <span className="text-[10px] font-bold">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
})

export default BottomNav
