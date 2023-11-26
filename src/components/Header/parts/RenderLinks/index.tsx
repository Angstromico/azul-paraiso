import { Link } from 'react-router-dom'
import { type HeaderLink } from 't'
import { useLocation } from 'react-router-dom'
import style from '../../style.module.scss'

interface LinkRender {
  links: HeaderLink[]
}

const RenderLinks = ({ links }: LinkRender) => {
  const location = useLocation()
  const currentUrl = location.pathname

  return (
    <nav>
      {links.map((l, i: number) => {
        const { link, text, externalLink } = l

        return (
          <Link
            className={`${currentUrl === link ? style.selected : ''}`}
            key={i}
            to={link}
            target={externalLink ? '_blank' : ''}
          >
            {text}
          </Link>
        )
      })}
    </nav>
  )
}

export default RenderLinks
