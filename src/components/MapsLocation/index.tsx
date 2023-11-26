import { useState, useCallback, useMemo } from 'react'
import style from './style.module.scss'
import { type TextContent, type ImageStrapi } from 't'
import { type Map } from 'p'
import { useFunctions } from 'h'
import MapsModal from './parts/MapsModal'

interface MapsLocationsModule extends TextContent {
  mapsTitle: string
  Maps: Map[]
  MapVector: ImageStrapi
  MapsImage: ImageStrapi
  TitleModal: string
  BtnModal: string
  GoogleLogo: ImageStrapi
  WazeLogo: ImageStrapi
  idArrow?: string
}
const MapsLocations = ({
  title,
  content,
  mapsTitle,
  Maps,
  MapVector,
  MapsImage,
  TitleModal,
  BtnModal,
  GoogleLogo,
  WazeLogo,
  idArrow,
}: MapsLocationsModule) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalLogos, setModalLogos] = useState({
    google: '',
    waze: '',
  })
  const { splitIntoParagraphs, generateImgSrc } = useFunctions()

  const { url: mainUrl } = MapsImage.data.attributes
  const mainImage = generateImgSrc(mainUrl)
  const { url, alternativeText } = MapVector.data.attributes
  const img = generateImgSrc(url)
  const openModal = useCallback((google: string, waze: string) => {
    setModalLogos({ google, waze })
    setModalOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])
  const renderMaps = useMemo(() => {
    const maps = Maps.map((mapInfo, i) => {
      const { text, GoogleMap, WazeMap } = mapInfo

      const handleClick = () => {
        openModal(GoogleMap, WazeMap)
      }

      return (
        <MapItem
          key={i}
          text={text}
          onClick={handleClick}
          img={img}
          alt={alternativeText}
        />
      )
    })
    return maps
  }, [Maps, alternativeText, openModal, img])

  return (
    <section
      id={idArrow}
      className={style.MapLocations}
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className={style.textSection}>
        <h2>{title}</h2>
        <p>{splitIntoParagraphs(content)}</p>
        <h3>{mapsTitle}</h3>
        <ul>{renderMaps}</ul>
      </div>
      <div
        className={style.imageSection}
        style={{ backgroundImage: `url(${mainImage})` }}
      ></div>
      {modalOpen && (
        <MapsModal
          GoogleMap={modalLogos.google}
          WazeMap={modalLogos.waze}
          TitleModal={TitleModal}
          BtnModal={BtnModal}
          GoogleLogo={GoogleLogo}
          WazeLogo={WazeLogo}
          onClose={closeModal}
          showCard={modalOpen}
        />
      )}
    </section>
  )
}
export default MapsLocations

interface MapItems {
  onClick: () => void
  text: string
  img: string
  alt: string
}

const MapItem = ({ onClick, text, img, alt }: MapItems) => (
  <li onClick={() => onClick()}>
    <img src={img} alt={alt} /> {text}
  </li>
)
