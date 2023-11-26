import style from './style.module.scss'
import { useQuery } from '@apollo/client'
import { GET_HEADER } from 'q'
import { type HeaderInfo } from 't'
import { useFunctions } from 'h'
import DesktopHeader from './parts/DesktopHeader'
import MobileHeader from './parts/MobileHeader'
import { useState, useEffect } from 'react'

const Header = () => {
  const { loading, error, data } = useQuery(GET_HEADER)
  const { generateImgSrc } = useFunctions()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight / 6
      setIsScrolled(scrolled)
    }

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (loading) return
  if (error) return

  const headerInfo: HeaderInfo = data.header.data.attributes
  const { Logo, link } = headerInfo
  const { url, alternativeText } = Logo.data.attributes
  const img = generateImgSrc(url)

  const midIndex = Math.ceil(link.length / 2)

  const firstLinks = link.slice(0, midIndex)
  const lastLinks = link.slice(midIndex)

  return (
    <header
      className={`${style.header} ${isScrolled ? style.fixedHeader : ''}`}
    >
      <div className={style.container}>
        <DesktopHeader
          firstLinks={firstLinks}
          img={img}
          alternativeText={alternativeText}
          lastLinks={lastLinks}
        />
        <MobileHeader img={img} alt={alternativeText} links={link} />
      </div>
    </header>
  )
}

export default Header
