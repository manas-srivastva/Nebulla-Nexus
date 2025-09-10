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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  place-items: center;
  animation: ${fadeIn} 240ms ease-out;
  z-index: 50;
`

const ModalCard = styled.div`
  width: min(560px, 92%);
  border-radius: 16px;
  background: #ffffff;
  box-shadow: ${({ theme }) => (theme as any).shadows.medium};
  padding: 28px 24px;
  animation: ${slideUp} 260ms ease-out;
  position: relative;
  text-align: center;
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
  &:hover { transform: translateY(-1px); opacity: 0.95; }
  &:active { transform: translateY(0); opacity: 1; }
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
        <CloseButton aria-label="Close" onClick={onClose}>Close</CloseButton>
        <Heading>Happy Birthday! 🎉</Heading>
        <Message>{children}</Message>
      </ModalCard>
    </Overlay>
  )
}

export default Modal

