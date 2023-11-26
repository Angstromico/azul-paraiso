import RenderLinks from '../RenderLinks'
import { Link } from 'react-router-dom'
import Style from '../../style.module.scss'
import { type HeaderInfo } from 'src/types'

interface DesktopHeader {
  firstLinks: HeaderInfo[]
  img: string
  alternativeText: string
  lastLinks: HeaderInfo[]
}

const DesktopHeader = ({
  firstLinks,
  img,
  alternativeText,
  lastLinks,
}: DesktopHeader) => {
  return (
    <div className={Style.desktop}>
      {' '}
      <RenderLinks links={firstLinks} />
      <Link to={'/'}>
        <img src={img} alt={alternativeText} />
      </Link>
      <RenderLinks links={lastLinks} />
    </div>
  )
}

export default DesktopHeader
