import style from '../../style.module.scss'
import { type Interior } from 'p'

interface CardInterior {
  resize: boolean
  img: string
  int: Interior
  setResize: (v: boolean) => void
}

const InteriorCard = ({ resize, img, int, setResize }: CardInterior) => {
  return (
    <div
      className={style.card}
      onMouseEnter={() => setResize(true)}
      onMouseLeave={() => setResize(false)}
    >
      <div
        className={`${style.img} ${resize ? style.tiny : ''}`}
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className={`${style.textSection} ${resize ? style.big : ''}`}>
        <h2>{int.title}</h2>
        <ul>
          {int.option.map((op, i) => {
            const { option: o } = op

            return <li key={i}>{o}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
export default InteriorCard
