import { type ContactInfo } from 'p'
import { type ImageStrapi } from 't'
import style from './style.module.scss'
import { useFunctions } from 'h'
import ContactContacts from './parts/ContactContacts'

interface ContactData {
  title: string
  ContactInfo: ContactInfo
  Image: ImageStrapi
}
const Contact = ({ title, ContactInfo, Image }: ContactData) => {
  const { url } = Image.data.attributes
  const { generateImgSrc } = useFunctions()
  const img = generateImgSrc(url)
  const { mail, phone, follow } = ContactInfo

  return (
    <section className={style.contactContainer}>
      <div
        className={style.img}
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <ContactContacts
        title={title}
        mail={mail}
        phone={phone}
        follow={follow}
      />
    </section>
  )
}
export default Contact
