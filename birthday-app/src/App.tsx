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

// New styled component for the special message above footer
const SpecialMessage = styled.div`
  text-align: center;
  margin: 32px 16px 12px;
  font-size: 1.15rem;
  font-weight: 600;
  color: ${({ theme }) => (theme as any).colors.primary};
`

// New footer styled component for birthday text at the bottom
const FooterMessage = styled.footer`
  text-align: center;
  padding: 24px 12px;
  background: ${({ theme }) => (theme as any).colors.secondaryLight || '#fff4e6'};
  color: ${({ theme }) => (theme as any).colors.primary};
  font-size: 1.25rem;
  font-weight: 600;
  border-top: 2px solid ${({ theme }) => (theme as any).colors.primary};
  margin-top: 12px;
  box-shadow: 0 -4px 10px rgba(255, 183, 77, 0.3);
  border-radius: 12px 12px 0 0;
`

function App() {
  const [showModal, setShowModal] = useState(true)

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
        <Title>🎂 Happy Birthday, Ada! 🎉</Title>
        <Subtitle>
          Wishing you lots of joy and happiness on your special day.
        </Subtitle>
        <BadgeBar>
          <Badge>Party Time</Badge>
          <Badge>Cake & Confetti</Badge>
          <Badge>Special Memories</Badge>
        </BadgeBar>
      </Hero>

      <Section>
        <Gallery />
      </Section>

      {/* Special message above footer */}
      <SpecialMessage>A Special Message For 9/11</SpecialMessage>

      {/* Footer text area */}
      <FooterMessage>
        Happy Birthday, Ada!
        We’ve only been friends for 7 months, but it already feels like 2–3 years. I know we’ve had our share of fights in the past month, but our friendship has survived—sometimes because of your effort, sometimes because of mine—and that shows how strong it is. Let’s move forward from all that, and please never forget that I respect you a lot.

        I know I’ve sometimes made you feel uncomfortable or kept you waiting too long, and I’m truly sorry for that. Since I’m not there in person, I can’t do as much as I would like on your special day. Still, I wish you a wonderful birthday, filled with happiness and joy. May you live a happy, prosperous life.

        Thank you for always being there, and once again, I’m sorry if I’ve ever disturbed you or made you uncomfortable.
        A very Happy Birthday to you, Kaddu! 🎉
      </FooterMessage>

      <Modal isOpen={showModal} onClose={handleClose}>
        Happy Birthday, Ada! Wishing you lots of joy and happiness! 🎈
      </Modal>
    </div>
  )
}

export default App
