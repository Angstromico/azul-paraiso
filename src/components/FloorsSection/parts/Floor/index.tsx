import style from '../../style.module.scss'
import { Link } from 'react-router-dom'
import { useBearStore } from 's'

interface FloorInfo {
  img: string
  title: string
  size: string
  bedroom: string
  bathroom: string
  btn: string
  url: string
  op: 'option1' | 'option2' | 'option3'
}
const Floor = ({
  img,
  title,
  size,
  bedroom,
  bathroom,
  btn,
  url,
  op,
}: FloorInfo) => {
  const { formOptions, setOp } = useBearStore()

  function scrollToTopSetOption() {
    const scrollToTop = () => {
      if (window.scrollTo) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } else {
        document.documentElement.scrollTop = 0
      }
    }

    scrollToTop()
    setOp(formOptions[op])
  }

  return (
    <div className={style.card}>
      <div
        className={style.img}
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className={style.textSection}>
        <h3>{title}</h3>
        <p>{size}</p>
        <p>{bedroom}</p>
        <p>{bathroom}</p>
        <Link
          to={url}
          className={style.btnSection}
          onClick={scrollToTopSetOption}
        >
          {btn}
        </Link>
      </div>
    </div>
  )
}
export default Floor
