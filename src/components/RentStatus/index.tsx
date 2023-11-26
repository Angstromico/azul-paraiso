import { type TextContent } from 'src/types'
import style from './style.module.scss'
import '../../../node_modules/video-react/dist/video-react.css'
import { Player } from 'video-react'
import TextInfo from './parts/TextContent'

interface RentStatusInfo extends TextContent {
  Image1: string
  Link1: string
  alt1: string
  Image2: string
  alt2: string
  Link2: string
  video: string
  videoCover: string
  textLink1: string
  textLink2: string
}
const RentStatus = ({
  title,
  content,
  Image1,
  alt1,
  Link1,
  Image2,
  alt2,
  Link2,
  video,
  videoCover,
  textLink1,
  textLink2,
}: RentStatusInfo) => {
  console.log(video)
  return (
    <section className={style.rentContainer}>
      <div className='w-full h-full'>
        <Player
          aspectRatio='16:9'
          playsInline
          poster={videoCover}
          src={video}
          muted
          autoPlay
        />
      </div>

      <TextInfo
        title={title}
        content={content}
        Link1={Link1}
        Image1={Image1}
        alt1={alt1}
        textLink1={textLink1}
        Link2={Link2}
        Image2={Image2}
        alt2={alt2}
        textLink2={textLink2}
      />
    </section>
  )
}
export default RentStatus
