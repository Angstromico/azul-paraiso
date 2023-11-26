import { type ServiceInfo } from 'p'
import style from './style.module.scss'
import { useState, useMemo, useEffect, useCallback } from 'react'
import TextGallery from './parts/TextGallery'
import { useFunctions } from 'h'
import { ImageSliderModal } from './parts/Modal'

interface OurServices {
  title: string
  FirstService: string
  SecondService: string
  ThirdService: string
  Services: ServiceInfo[]
}
const ServiceComponent = ({
  title,
  FirstService,
  SecondService,
  ThirdService,
  Services,
}: OurServices) => {
  const [groups, setGroups] = useState({
    first: true,
    second: false,
    third: false,
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [showCards, setShowCards] = useState(true)
  const [modalImages, setModalImages] = useState<string[]>([])

  const choseGroup = (g: 'first' | 'second' | 'third') => {
    const myGroup = {
      first: false,
      second: false,
      third: false,
    }
    myGroup[g] = true
    setGroups(myGroup)
  }

  const ourGallery = useMemo(() => {
    let myGallery: ServiceInfo[] = []
    if (groups.first) {
      myGallery = Services.filter((Service) => Service.Group === 'Exteriors')
    }
    if (groups.second) {
      myGallery = Services.filter((Service) => Service.Group === 'Interiors')
    }
    if (groups.third) {
      myGallery = Services.filter((Service) => Service.Group === 'Activities')
    }

    return myGallery
  }, [groups, Services])

  const { generateImgSrc } = useFunctions()
  const openModal = (imgArr: string[]) => {
    setModalImages(imgArr)
    setModalOpen(true)
  }
  const closeModal = () => setModalOpen(false)
  const transitionCars = useCallback(() => {
    setShowCards(false)
    setTimeout(() => setShowCards(true), 10)
  }, [])

  useEffect(() => {
    transitionCars()
  }, [groups, transitionCars])

  return (
    <section className={style.serviceContainer}>
      <h2>{title}</h2>
      <TextGallery
        groups={groups}
        choseGroup={choseGroup}
        FirstService={FirstService}
        SecondService={SecondService}
        ThirdService={ThirdService}
      />
      <div className={style.gallery}>
        {ourGallery.map((Gallery, i) => {
          const { title, Image, Images } = Gallery
          const { url } = Image.data.attributes
          const img = generateImgSrc(url)
          const images = Images.data
          const imgArr = images.map((image) =>
            generateImgSrc(image.attributes.url)
          )

          return (
            <div
              key={i}
              className={style.cardContainer}
              onClick={() => openModal(imgArr)}
            >
              <div
                className={`${style.card} ${showCards ? style.show : ''}`}
                style={{ backgroundImage: `url(${img})` }}
              >
                <h3 className={style.title}>{title}</h3>
              </div>
            </div>
          )
        })}
        {modalOpen && (
          <ImageSliderModal images={modalImages} onClose={closeModal} />
        )}
      </div>
    </section>
  )
}
export default ServiceComponent
