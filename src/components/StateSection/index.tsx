import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import style from './style.module.scss'
import { type TextContent, type ImagesStrapi } from 't'
import { useFunctions } from 'h'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'

interface StateInfo extends TextContent {
  Images: ImagesStrapi
  BtnText: string
  BtnUrl: string
}
const StateSection = ({
  title,
  content,
  Images,
  BtnText,
  BtnUrl,
}: StateInfo) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      renderMode: 'performance',
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      },
    ]
  )

  const { generateImgSrc, splitIntoParagraphs } = useFunctions()

  return (
    <section className={style.stateContainer}>
      <div ref={sliderRef} className={`${style.sliderSection} keen-slider`}>
        {Images.data.map((image, i) => {
          const { url } = image.attributes
          const img = generateImgSrc(url)

          return (
            <div
              key={i}
              className={`${style.slide} keen-slider__slide`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          )
        })}
      </div>
      <div className={style.textSection}>
        <h2>{title}</h2>
        <p>{splitIntoParagraphs(content)}</p>
        <Link className='btn contact' to={BtnUrl}>
          {BtnText} <AiOutlineArrowRight />
        </Link>
      </div>
    </section>
  )
}
export default StateSection
