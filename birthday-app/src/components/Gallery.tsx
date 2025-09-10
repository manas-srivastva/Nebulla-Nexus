import { useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { birthdayImages } from '../data/images'

type GalleryProps = {
  images?: string[]
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

const confettiShadow = `
  0 4px 8px rgba(255, 134, 77, 0.3),
  0 8px 16px rgba(255, 195, 113, 0.25)
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-top: 20px;
  padding: 24px 12px;
  background: radial-gradient(circle at top left, #fff3e0 0%, #ffebee 70%),
              repeating-radial-gradient(circle at bottom right, #ffe0b2 0, #ffe0b2 10px, #ffccbc 10px, #ffccbc 20px);
  border-radius: 24px;
  box-shadow: 0 8px 20px rgba(255, 183, 77, 0.25);

  @media (min-width: ${({ theme }) => (theme as any).breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    padding: 32px 20px;
  }

  @media (min-width: ${({ theme }) => (theme as any).breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
    padding: 40px 32px;
  }
`

const Card = styled.figure`
  position: relative;
  margin: 0;
  border-radius: 18px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  box-shadow: ${confettiShadow};
  animation: ${fadeIn} 420ms ease both;
  background: linear-gradient(135deg, #fff7f1, #ffe4d6);
  border: 2px solid #ff7a45;

  transition: box-shadow 300ms ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(255, 122, 69, 0.6), 0 0 12px rgba(255, 122, 69, 0.4);
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 240ms ease;
  border-radius: 16px;
  ${Card}:hover & {
    transform: scale(1.08);
  }
`

const Caption = styled.figcaption`
  position: absolute;
  inset: auto 0 0 0;
  padding: 10px 12px;
  font-size: 0.9rem;
  font-weight: 600;
  background: linear-gradient(180deg, transparent, rgba(255, 122, 69, 0.85));
  color: #fff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.65);
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
`

export const Gallery = ({ images }: GalleryProps) => {
  const imageList = useMemo(() => images ?? birthdayImages, [images])

  return (
    <Grid>
      {imageList.map((image) => (
        <Card key={image.id} style={{ animationDelay: `${image.id * 40}ms` }}>
          <Img src={image.src} alt={image.alt} loading="lazy" />
          <Caption>{image.caption}</Caption>
        </Card>
      ))}
    </Grid>
  )
}

export default Gallery
