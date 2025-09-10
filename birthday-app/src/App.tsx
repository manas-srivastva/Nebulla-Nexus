import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Gallery from './components/Gallery'
import Modal from './components/Modal'

// The main hero header with festive style.
const Hero = styled.header`
  text-align: center;
  padding: 48px 0 16px;
`

const Title = styled.h1`
  font-size: clamp(2rem, 4vw + 1rem, 3.4rem);
  color: ${({ theme }) => (theme as any).colors.primary};
  text-shadow: 0 10px 20px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06);
`

const Subtitle = styled.p`
  margin-top: 8px;
  font-size: 1rem;
  color: ${({ theme }) => (theme as any).colors.text};
`

const BadgeBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
`

const Badge = styled.span`
  background: ${({ theme }) => (theme as any).colors.secondary};
  color: #7a4b00;
  border-radius: 999px;
  padding: 6px 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
`

const Section = styled.section`
  margin-top: 20px;
  padding-bottom: 60px;
`

function App() {
  const [showModal, setShowModal] = useState(true)

  // Ensure modal shows on first visit only per session (optional logic)
  useEffect(() => {
    const SEEN = sessionStorage.getItem('bday_modal_seen')
    if (SEEN) setShowModal(false)
  }, [])

  const handleClose = () => {
    setShowModal(false)
    sessionStorage.setItem('bday_modal_seen', '1')
  }

  return (
    <div className="container">
      <Hero>
        <Title>🎂 Happy Birthday, Friend! 🎉</Title>
        <Subtitle>
          Wishing you lots of joy and happiness on your special day.
        </Subtitle>
        <BadgeBar>
          <Badge>Party Time</Badge>
          <Badge>Cake & Confetti</Badge>
          <Badge>Memories</Badge>
        </BadgeBar>
      </Hero>

      <Section>
        <Gallery />
      </Section>

      <Modal isOpen={showModal} onClose={handleClose}>
        Happy Birthday, [Friend's Name(s)]! Wishing you lots of joy and happiness!
      </Modal>
    </div>
  )
}

export default App
