import style from '../../style.module.scss'
import FormAzul from 'c/Form'

interface Contacts {
  title: string
  mail: string
  phone: string
  follow: string
}
const ContactContacts = ({ title, mail, phone, follow }: Contacts) => {
  return (
    <div className={style.formContent}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.paths}>
        <p>{mail}</p>
        <div></div>
        <p>{phone}</p>
        <div></div>
        <p>{follow}</p>
      </div>
      <FormAzul contactPage />
    </div>
  )
}
export default ContactContacts
