import style from '../../style.module.scss'

interface Logos {
  Logo1: string
  alt1: string
  Logo2: string
  alt2: string
}
const FooterLogos = ({ Logo1, alt1, Logo2, alt2 }: Logos) => {
  return (
    <div className={style.logos}>
      <img src={Logo1} alt={alt1} />
      <div></div>
      <img src={Logo2} alt={alt2} />
    </div>
  )
}

export default FooterLogos
