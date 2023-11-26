import { type TextContent, type ImageStrapi } from 't'
import { type BtnLink } from 'src/pages/Page'
import style from './style.module.scss'
import LocationText from './parts/LocationText'
import { useFunctions } from 'h'

interface LocationsInfo extends TextContent {
  TitleLocations: string
  Image: ImageStrapi
  Locations: { text: string }[]
  Btn1: BtnLink
  Btn2: BtnLink
}
const Locations = ({
  title,
  content,
  TitleLocations,
  Image,
  Locations,
  Btn1,
  Btn2,
}: LocationsInfo) => {
  const { generateImgSrc } = useFunctions()
  const { url } = Image.data.attributes
  const img = generateImgSrc(url)

  return (
    <section className={style.locationsContainer}>
      <LocationText
        title={title}
        content={content}
        TitleLocations={TitleLocations}
        Locations={Locations}
        Btn1={Btn1}
        Btn2={Btn2}
      />
      <div
        className={style.imageSection}
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    </section>
  )
}
export default Locations
