import { Link } from 'react-router-dom'
import style from '../../style.module.scss'
import { type TextContent } from 't'
import { AiOutlineArrowRight } from 'react-icons/ai'

interface TextReachMap extends TextContent {
  MapUrl: string
  MapText: string
  WazeUrl: string
  WazeText: string
}
const TextZone = ({
  title,
  content,
  MapUrl,
  MapText,
  WazeUrl,
  WazeText,
}: TextReachMap) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{content}</p>
      <div className={style.buttons}>
        <Link to={MapUrl} target='_blank'>
          {MapText} <AiOutlineArrowRight />
        </Link>
        <Link to={WazeUrl} target='_blank'>
          {WazeText} <AiOutlineArrowRight />
        </Link>
      </div>
    </>
  )
}
export default TextZone
