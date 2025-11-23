import React from 'react'
import Signature from './components/Signature.jsx'

const App = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800">SignCraft</h1>
          <p className="text-slate-500 mt-1">Simple. Fast. Attractive. Sign and export in seconds.</p>
        </header>

        <Signature />
      </div>
    </main>

  )
}

export default App
