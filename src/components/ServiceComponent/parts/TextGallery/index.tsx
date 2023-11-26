import style from '../../style.module.scss'

interface Group {
  first: boolean
  second: boolean
  third: boolean
}

interface GalleryText {
  groups: Group
  choseGroup: (g: 'first' | 'second' | 'third') => void
  FirstService: string
  SecondService: string
  ThirdService: string
}
const TextGallery = ({
  groups,
  choseGroup,
  FirstService,
  SecondService,
  ThirdService,
}: GalleryText) => {
  return (
    <div className={style.groups}>
      <h3
        className={`${groups.first ? style.chosen : ''}`}
        onClick={() => choseGroup('first')}
      >
        {FirstService}
      </h3>
      <div className={style.line}></div>
      <h3
        className={`${groups.second ? style.chosen : ''}`}
        onClick={() => choseGroup('second')}
      >
        {SecondService}
      </h3>
      <div className={style.line}></div>
      <h3
        className={`${groups.third ? style.chosen : ''}`}
        onClick={() => choseGroup('third')}
      >
        {ThirdService}
      </h3>
    </div>
  )
}
export default TextGallery
