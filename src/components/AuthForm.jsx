import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

function InputField({ label, type, name, value, onChange, placeholder, optional }) {
  const animateFocus = (e) => {
    gsap.to(e.currentTarget, {
      boxShadow: '0 0 0 3px rgba(221, 0, 0, 0.15)',
      y: -1,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const animateBlur = (e) => {
    gsap.to(e.currentTarget, {
      boxShadow: '0 0 0 0px rgba(221, 0, 0, 0)',
      y: 0,
      duration: 0.2,
      ease: 'power2.in',
    })
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {optional && (
          <span className="text-gray-400 font-normal ml-1">(optional)</span>
        )}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={!optional}
        onFocus={animateFocus}
        onBlur={animateBlur}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#DD0000] transition-colors duration-200 text-gray-800 bg-white placeholder-gray-400"
      />
    </div>
  )
}

export default function AuthForm() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [toggling, setToggling] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const fieldsRef = useRef(null)
  const isFirstRender = useRef(true)

  // Animate new fields in after state flip
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    gsap.fromTo(
      fieldsRef.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => setToggling(false),
      }
    )
  }, [isLogin])

  const handleToggle = () => {
    if (toggling) return
    setToggling(true)
    gsap.to(fieldsRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => setIsLogin((prev) => !prev),
    })
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(isLogin ? 'Login' : 'Register', formData)
    navigate('/main')
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-3xl font-black text-black">
          {isLogin ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="text-gray-500 text-sm mt-1.5">
          {isLogin
            ? 'Sign in to your Deutschkraft account'
            : 'Start your German learning journey today'}
        </p>
      </div>

      {/* Form fields */}
      <form onSubmit={handleSubmit}>
        <div ref={fieldsRef} className="space-y-4">
          {!isLogin && (
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              optional
            />
          )}
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3.5 bg-[#DD0000] text-white font-bold text-lg rounded-xl hover:bg-[#bb0000] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          {isLogin ? 'Login' : 'Create account'}
        </button>
      </form>

      {/* OR divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-4 text-xs text-gray-400 font-semibold tracking-wider uppercase">
          or
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Google sign-in */}
      <button
        type="button"
        className="w-full py-3 border-2 border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 font-semibold text-gray-700 cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
        </svg>
        Continue with Google
      </button>

      {/* Toggle between forms */}
      <p className="text-center text-sm text-gray-500 mt-6">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          type="button"
          onClick={handleToggle}
          className="text-[#DD0000] font-bold hover:underline cursor-pointer"
        >
          {isLogin ? 'Create account' : 'Login'}
        </button>
      </p>
    </div>
  )
}
