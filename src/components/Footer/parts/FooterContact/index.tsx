import style from '../../style.module.scss'

interface ContactFooter {
  title: string
  mail: string
  phone: string
  follow: string
}
const FooterContact = ({ title, mail, phone, follow }: ContactFooter) => {
  return (
    <div className={style.contact}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.paths}>
        <p>{mail}</p>
        <div></div>
        <p>{phone}</p>
        <div></div>
        <p>{follow}</p>
      </div>
    </div>
  )
}
export default FooterContact
