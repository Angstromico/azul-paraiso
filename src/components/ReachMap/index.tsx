import DynamicMap from 'c/DynamicMap'
import { type TextContent } from 't'
import style from './style.module.scss'
import TextZone from './parts/TextZone'

interface ReachInfo extends TextContent {
  MapText: string
  MapUrl: string
  WazeText: string
  WazeUrl: string
  otherTitle: string
  otherContent: string
  otherMapText: string
  otherMapUrl: string
  otherWazeText: string
  otherWazeUrl: string
}
const ReachMap = ({
  title,
  content,
  MapText,
  MapUrl,
  WazeText,
  WazeUrl,
  otherTitle,
  otherContent,
  otherMapText,
  otherMapUrl,
  otherWazeText,
  otherWazeUrl,
}: ReachInfo) => {
  return (
    <section className={style.ReachContainer}>
      <div className={style.map}>
        <DynamicMap />
      </div>
      <div className={style.textContent}>
        <TextZone
          title={title}
          content={content}
          MapText={MapText}
          MapUrl={MapUrl}
          WazeText={WazeText}
          WazeUrl={WazeUrl}
        />
        <TextZone
          title={otherTitle}
          content={otherContent}
          MapText={otherMapText}
          MapUrl={otherMapUrl}
          WazeText={otherWazeText}
          WazeUrl={otherWazeUrl}
        />
      </div>
    </section>
  )
}
export default ReachMap
