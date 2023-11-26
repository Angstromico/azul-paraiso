import style from '../../style.module.scss'
import { Link } from 'react-router-dom'
import { type TextContent } from 't'
import TitleSection from './parts/TitleSection'

interface TextMaterial extends TextContent {
  Link1: string
  Image1: string
  alt1: string
  textLink1: string
  Link2: string
  Image2: string
  alt2: string
  textLink2: string
}

const TextContent = ({
  title,
  content,
  Link1,
  Image1,
  alt1,
  textLink1,
  Link2,
  Image2,
  alt2,
  textLink2,
}: TextMaterial) => {
  return (
    <div className={style.textSection}>
      <TitleSection title={title} content={content} />
      <div className={style.images}>
        <Link to={Link1} className={style.imageContainer}>
          <img src={Image1} alt={alt1} />
          <p>{textLink1}</p>
        </Link>
        <div className={`${style.images} ${style.second}`}>
          <Link to={Link2} className={style.imageContainer}>
            <img className={style.second} src={Image2} alt={alt2} />
            <p>{textLink2}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default TextContent
