import style from '../../style.module.scss'
import { Link } from 'react-router-dom'
import { type TextContent } from 't'
import { type BtnLink } from 'src/pages/Page'
import { AiOutlineArrowRight } from 'react-icons/ai'

interface TextInfo extends TextContent {
  TitleLocations: string
  Locations: { text: string }[]
  Btn1: BtnLink
  Btn2: BtnLink
}
const LocationText = ({
  title,
  content,
  TitleLocations,
  Locations,
  Btn1,
  Btn2,
}: TextInfo) => {
  return (
    <div className={style.textSection}>
      <h2>{title}</h2>
      <p>{content}</p>
      <h3>{TitleLocations}</h3>
      <ul>
        {Locations.map((place, i) => {
          return <li key={i}>{place.text}</li>
        })}
      </ul>
      <Link to={Btn1.url} className={style.btn1} target='_blank'>
        {Btn1.text} <AiOutlineArrowRight />
      </Link>
      <Link to={Btn2.url} className={style.btn2} target='_blank'>
        {Btn2.text} <AiOutlineArrowRight />
      </Link>
    </div>
  )
}
export default LocationText
