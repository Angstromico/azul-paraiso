import { useRef } from 'react'
import { type ImageStrapi } from 't'
import { useFunctions } from 'h'
import style from '../../style.module.scss'
import { Link } from 'react-router-dom'

interface ModalMaps {
  GoogleMap: string
  WazeMap: string
  TitleModal: string
  BtnModal: string
  GoogleLogo: ImageStrapi
  WazeLogo: ImageStrapi
  onClose: () => void
  showCard: boolean
}
const MapsModal = ({
  GoogleMap,
  WazeMap,
  TitleModal,
  BtnModal,
  GoogleLogo,
  WazeLogo,
  onClose,
  showCard,
}: ModalMaps) => {
  const modalRef = useRef(null)
  const { generateImgSrc } = useFunctions()
  const { url, alternativeText } = GoogleLogo.data.attributes
  const { url: wazeUrl, alternativeText: wazeAlt } = WazeLogo.data.attributes
  const googleImg = generateImgSrc(url)
  const wazeImg = generateImgSrc(wazeUrl)

  const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (!modalRef.current?.contains(event.target)) {
      onClose()
    }
  }

  return (
    <div className={style.modal} onClick={handleClickOutside}>
      <div
        className={`${style.modalCard} ${showCard ? style.top : ''}`}
        ref={modalRef}
      >
        <h2>{TitleModal}</h2>
        <div className={style.logos}>
          <Link to={GoogleMap} target='_blank'>
            <img src={googleImg} alt={alternativeText} />
          </Link>
          <Link to={WazeMap} target='_blank'>
            <img src={wazeImg} alt={wazeAlt} />
          </Link>
        </div>
        <button className={style.btnLink} onClick={() => onClose()}>
          {BtnModal}
        </button>
      </div>
    </div>
  )
}
export default MapsModal
