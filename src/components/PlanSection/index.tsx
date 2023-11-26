import style from './style.module.scss'
import { type ImageStrapi, type TextContent } from 't'
import { useFunctions } from 'h'

interface MasterPlan extends TextContent {
  image: ImageStrapi
}
const Plansection = ({ title, content, image }: MasterPlan) => {
  const { url } = image.data.attributes
  const { generateImgSrc } = useFunctions()
  const img = generateImgSrc(url)

  return (
    <section className={style.planContainer}>
      <div className={style.textSection}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <div
        className={style.img}
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    </section>
  )
}
export default Plansection
