import { useState } from 'react'
import { HeroTyping } from './components/HeroTyping'
import { HomePage } from './components/HomePage'
import { HERO_MODE } from './heroMode'

export default function App() {
  const [brandReveal, setBrandReveal] = useState(false)
  const [contentReveal, setContentReveal] = useState(false)
  const [introActive, setIntroActive] = useState(HERO_MODE === 'typing')

  if (HERO_MODE !== 'typing') {
    return <HomePage variant="cinematic" />
  }

  return (
    <>
      <HomePage variant="typing" brandReveal={brandReveal} contentReveal={contentReveal} />
      {introActive && (
        <HeroTyping
          onTransferStart={() => setBrandReveal(true)}
          onContentReveal={() => setContentReveal(true)}
          onIntroComplete={() => setIntroActive(false)}
        />
      )}
    </>
  )
}
