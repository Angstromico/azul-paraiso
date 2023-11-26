import { type Floor } from 'p'
import style from './style.module.scss'
import { useFunctions } from 'h'
import FloorComponent from './parts/Floor'

interface FloorSection {
  title: string
  FirstFloor: Floor
  SecondFloor: Floor
  ThirdFloor: Floor
}
const FloorsSection = ({
  title,
  FirstFloor,
  SecondFloor,
  ThirdFloor,
}: FloorSection) => {
  const {
    title: secondTitle,
    Image,
    size,
    bedroom,
    bathroom,
    BtnText,
    BtnLink,
  } = FirstFloor
  const {
    title: thirdTitle,
    Image: secondImage,
    size: secondSize,
    bedroom: secondBedroom,
    bathroom: secondBathroom,
    BtnText: secondBtnText,
    BtnLink: secondBtnLink,
  } = SecondFloor
  const {
    title: fourthTitle,
    Image: thirdImage,
    size: thirdSize,
    bedroom: thirdBedroom,
    bathroom: thirdBathroom,
    BtnText: thirdBtnText,
    BtnLink: thirdBtnLink,
  } = ThirdFloor
  const { url } = Image.data.attributes
  const { url: secondUrl } = secondImage.data.attributes
  const { url: thirdUrl } = thirdImage.data.attributes
  const { generateImgSrc } = useFunctions()
  const firstImg = generateImgSrc(url)
  const secondImg = generateImgSrc(secondUrl)
  const thirdImg = generateImgSrc(thirdUrl)

  return (
    <section className={style.floorSection}>
      <h2>{title}</h2>
      <div className={style.floors}>
        <FloorComponent
          title={secondTitle}
          img={firstImg}
          size={size}
          bedroom={bedroom}
          bathroom={bathroom}
          btn={BtnText}
          url={BtnLink}
          op='option1'
        />
        <FloorComponent
          title={thirdTitle}
          img={secondImg}
          size={secondSize}
          bedroom={secondBedroom}
          bathroom={secondBathroom}
          btn={secondBtnText}
          url={secondBtnLink}
          op='option2'
        />
        <FloorComponent
          title={fourthTitle}
          img={thirdImg}
          size={thirdSize}
          bedroom={thirdBedroom}
          bathroom={thirdBathroom}
          btn={thirdBtnText}
          url={thirdBtnLink}
          op='option3'
        />
      </div>
    </section>
  )
}
export default FloorsSection
