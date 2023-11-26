import style from './style.module.scss'
import { useFunctions } from 'h'
import { type ImageStrapi } from 't'
import { type ArrowInfo } from 'p'

interface BannerInfo {
  Image: ImageStrapi
  ArroId?: ArrowInfo
}
const Banner = ({ Image, ArroId }: BannerInfo) => {
  const { generateImgSrc } = useFunctions()
  const { url } = Image.data.attributes
  const img = generateImgSrc(url)
  const { idArrow, Arrow } = ArroId
  const { url: arrowUrl, alternativeText } = Arrow.data.attributes
  const arrowImg = generateImgSrc(arrowUrl)

  const scrollToArrow = () => {
    const element = document.getElementById(idArrow)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className={style.bannerContainer}
      style={{ backgroundImage: `url(${img})` }}
    >
      {ArroId && (
        <img
          className={style.arrow}
          src={arrowImg}
          alt={alternativeText}
          onClick={scrollToArrow}
        />
      )}
    </div>
  )
}
export default Banner
