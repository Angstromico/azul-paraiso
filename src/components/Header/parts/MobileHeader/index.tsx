import { useState } from 'react'
import style from '../../style.module.scss'
import { type HeaderInfo } from 'src/types'
import { BurgerButton } from './BurgerButton'
import RenderLinks from '../RenderLinks'
import { Link } from 'react-router-dom'

interface MobileHeader {
  links: HeaderInfo[]
  img: string
  alt: string
}

const MobileHeader = ({ links, img, alt }: MobileHeader) => {
  const [hide, setHide] = useState(true)

  const changeBurguer = () => {
    setHide(!hide)
  }

  return (
    <div className={style.mobile}>
      <Link to='/'>
        <img src={img} alt={alt} />
      </Link>
      <BurgerButton onClick={changeBurguer} />
      <div className={hide ? 'hidden' : style.menu}>
        <RenderLinks links={links} />
      </div>
    </div>
  )
}

export default MobileHeader
