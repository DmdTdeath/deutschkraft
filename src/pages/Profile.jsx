import BottomNav from '../components/BottomNav'

export default function Profile() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-3 pb-20 px-6">
        <span className="text-6xl select-none">👤</span>
        <h1 className="text-2xl font-black text-black">Profil</h1>
        <p className="text-sm text-gray-400 text-center">Diese Seite ist noch in Arbeit.</p>
      </div>
      <BottomNav />
    </div>
  )
}
