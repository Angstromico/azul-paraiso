import style from './style.module.scss'
import { type TextContent, type ImageStrapi } from 't'
import { useFunctions } from 'h'

interface About extends TextContent {
  Image: ImageStrapi
}
const AboutSection = ({ title, content, Image }: About) => {
  const { generateImgSrc } = useFunctions()
  const { url } = Image.data.attributes
  const img = generateImgSrc(url)

  return (
    <section className={style.aboutSection}>
      <div className={style.textSection}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <div
        className={style.imageSection}
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    </section>
  )
}
export default AboutSection
