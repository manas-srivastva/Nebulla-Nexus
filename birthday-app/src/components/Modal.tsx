import { useEffect } from 'react'
import type { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

// Confetti burst animation for poppers
const popperBurst = keyframes`
  0% {
    opacity: 0;
    transform: scale(0) translate(0, 0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) translate(var(--tx), var(--ty)) rotate(360deg);
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(var(--tx), var(--ty)) rotate(720deg);
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(
      135deg,
      rgba(255, 183, 77, 0.4),
      rgba(255, 87, 34, 0.35),
      rgba(255, 183, 77, 0.4)
    ),
    rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  animation: ${fadeIn} 240ms ease-out;
  z-index: 50;
`

const ModalCard = styled.div`
  width: min(560px, 92%);
  border-radius: 16px;
  background: #fff9f5;
  box-shadow: ${({ theme }) => (theme as any).shadows.medium};
  padding: 28px 24px;
  animation: ${slideUp} 260ms ease-out;
  position: relative;
  text-align: center;
  border: 2px solid #ff7043;
  overflow: visible;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: ${({ theme }) => (theme as any).colors.primary};
  color: ${({ theme }) => (theme as any).colors.textOnPrimary};
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 120ms ease, opacity 120ms ease;
  &:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }
  &:active {
    transform: translateY(0);
    opacity: 1;
  }
`

const Heading = styled.h2`
  font-size: clamp(1.6rem, 3vw + 1rem, 2.4rem);
  color: ${({ theme }) => (theme as any).colors.primary};
  margin-bottom: 10px;
`

const Message = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => (theme as any).colors.text};
`

// Party popper styled element
const PartyPopper = styled.div<{
  tx: string
  ty: string
  color: string
  delay: number
  size?: number
}>`
  --tx: ${({ tx }) => tx};
  --ty: ${({ ty }) => ty};
  position: absolute;
  width: ${({ size }) => (size ? `${size}px` : '16px')};
  height: ${({ size }) => (size ? `${size}px` : '16px')};
  background-color: ${({ color }) => color};
  border-radius: 50% 50% 50% 0;
  transform-origin: 0% 100%;
  top: 50%;
  left: 50%;
  opacity: 0;
  animation: ${popperBurst} 2s ease forwards;
  animation-delay: ${({ delay }) => delay}s;
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.1));
`

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <CloseButton aria-label="Close" onClick={onClose}>
          Close
        </CloseButton>
        <Heading>Happy Birthday GAWAR! 🎉</Heading>
        <Message>{children}</Message>

        {/* Party poppers burst around center */}
        <PartyPopper tx="-40px" ty="-60px" color="#ff7043" delay={0.1} />
        <PartyPopper tx="50px" ty="-50px" color="#ffca28" delay={0.3} size={14} />
        <PartyPopper tx="-55px" ty="40px" color="#f44336" delay={0.5} />
        <PartyPopper tx="60px" ty="55px" color="#8bc34a" delay={0.7} size={18} />
        <PartyPopper tx="0px" ty="75px" color="#03a9f4" delay={0.9} size={12} />
      </ModalCard>
    </Overlay>
  )
}

export default Modal
