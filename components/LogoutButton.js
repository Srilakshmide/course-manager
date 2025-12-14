'use client'

export default function LogoutButton() {
  function handleLogout() {
    document.cookie = 'token=; Max-Age=0; path=/'
    window.location.href = '/login'
  }

  return (
    <button
      onClick={handleLogout}
      className="text-white"
    >
      Logout
    </button>
  )
}
