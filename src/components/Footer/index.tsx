import style from './style.module.scss'
import { useQuery } from '@apollo/client'
import { GET_FOOTER } from 'q'
import { type FooterInfo } from 't'
import { useFunctions } from 'h'
import FooterLogos from './parts/LogosFooter'
import FooterContact from './parts/FooterContact'
import FootSection from './parts/FootSection'
import FormAzul from 'c/Form'

const Footer = () => {
  const { loading, error, data } = useQuery(GET_FOOTER)
  const { generateImgSrc } = useFunctions()

  if (loading) return
  if (error) return

  const footerInfo: FooterInfo = data.footer.data.attributes

  const { Logos, Contact, Footext } = footerInfo
  const { Logo1, Logo2 } = Logos
  const { url, alternativeText } = Logo1.data.attributes
  const { url: secondUrl, alternativeText: alternativeText2 } =
    Logo2.data.attributes
  const firstLogo = generateImgSrc(url)
  const secondLogo = generateImgSrc(secondUrl)
  const { title, mail, phone, follow } = Contact

  return (
    <footer className={style.footer}>
      <FooterLogos
        Logo1={firstLogo}
        Logo2={secondLogo}
        alt1={alternativeText}
        alt2={alternativeText2}
      />
      <FooterContact title={title} mail={mail} phone={phone} follow={follow} />
      <FormAzul />
      <FootSection fooText={Footext} />
    </footer>
  )
}

export default Footer
