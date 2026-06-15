import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

{/* a few header colours so everyones banner isnt the same */}
const headerColors = ['#ef4444', '#ff7a00', '#7c3aed', '#22c55e', '#0ea5e9', '#ec4899', '#8a6e6e']

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  {/* make a new account and log them straight in */}
  const signUp = (name, email, password) => {
    const account = {
      name,
      email,
      password,
      skateLevel: 'Beginner',
      age: '',
      avatarUri: null,
      headerColor: headerColors[Math.floor(Math.random() * headerColors.length)], /* random header colour per account */
    }
    setAccounts([...accounts, account])
    setUser(account)
  }

  {/* find an account that matches the email + password, log them in if it exists */}
  const logIn = (email, password) => {
    const account = accounts.find(a => a.email === email && a.password === password)
    if (account) {
      setUser(account)
      return true
    }
    return false
  }

  {/* logging out is just forgetting who's logged in */}
  const logOut = () => setUser(null)

  {/* save changes to the logged in user and keep the accounts list in sync */}
  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    setAccounts(accounts.map(a => a.email === user.email ? updated : a))
  }

  {/* only change the password if they typed their current one right */}
  const changePassword = (current, next) => {
    if (!user || user.password !== current) return false
    updateUser({ password: next })
    return true
  }

  {/* flip dark mode on/off */}
  const toggleDarkMode = () => setDarkMode(prev => !prev)

  return (
    <UserContext.Provider value={{ user, signUp, logIn, logOut, updateUser, changePassword, darkMode, toggleDarkMode }}>
      {children}
    </UserContext.Provider>
  )
}

{/* little shortcut so screens can just do useUser() instead of useContext */}
export const useUser  = () => useContext(UserContext)

{/* all my colours in one place - returns the dark or light set depending on the toggle */}
export const useTheme = () => {
  const { darkMode } = useUser()
  return {
    bg: darkMode ? '#111' : '#fff',
    text: darkMode ? '#fff' : '#000',
    mutedText: darkMode ? '#aaa' : '#888',
    inputBg: darkMode ? '#222' : '#f5f5f5',
    card: darkMode ? '#1e1e1e' : '#f9f9f9',
  }
}