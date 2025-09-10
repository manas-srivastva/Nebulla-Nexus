import { useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

type GalleryProps = {
  images?: string[]
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 18px;

  @media (min-width: ${({ theme }) => (theme as any).breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (min-width: ${({ theme }) => (theme as any).breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Card = styled.figure`
  position: relative;
  margin: 0;
  border-radius: 14px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  box-shadow: ${({ theme }) => (theme as any).shadows.soft};
  animation: ${fadeIn} 420ms ease both;
  background: #fff;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 240ms ease;
  ${Card}:hover & { transform: scale(1.04); }
`

const Caption = styled.figcaption`
  position: absolute;
  inset: auto 0 0 0;
  padding: 8px 10px;
  font-size: 0.85rem;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,0.55));
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.4);
`

export const Gallery = ({ images }: GalleryProps) => {
  // Provide default placeholder images if none are passed.
  const imageList = useMemo(() => {
    if (images && images.length > 0) return images
    // Local placeholders photo1.jpg, photo2.jpg, ... or use picsum as fallback
    const local = Array.from({ length: 12 }, (_, i) => `/photo${i + 1}.jpg`)
    return local.map((url, i) =>
      (i % 2 === 0)
        ? url
        : `https://picsum.photos/seed/bday-${i}/600/600`
    )
  }, [images])

  return (
    <Grid>
      {imageList.map((src, idx) => (
        <Card key={idx} style={{ animationDelay: `${idx * 40}ms` }}>
          <Img src={src} alt={`Birthday photo ${idx + 1}`} loading="lazy" />
          <Caption>Photo {idx + 1}</Caption>
        </Card>
      ))}
    </Grid>
  )
}

export default Gallery

