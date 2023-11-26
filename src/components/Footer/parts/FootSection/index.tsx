import style from '../../style.module.scss'

interface FooArr {
  fooText: { text: string }[]
}
const FootSection = ({ fooText }: FooArr) => {
  return (
    <div className={style.footSection}>
      {fooText.map((foo, i) => {
        const { text } = foo

        return <p key={i}>{text}</p>
      })}
    </div>
  )
}
export default FootSection
