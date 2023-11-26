import { useState } from 'react'
import { type Slider } from 'p'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useFunctions } from 'h'
/* import { AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom' */
import SlideImage from './parts/SlideImage'

interface SliderInfo {
  sliderInfo: Slider[]
  Btn: string
}

const Carousel = ({ sliderInfo, Btn }: SliderInfo) => {
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

  const { generateImgSrc } = useFunctions()

  return (
    <section className='navigation-wrapper'>
      <div ref={sliderRef} className='keen-slider w-full h-full'>
        {sliderInfo.map((slider, i) => {
          const { Image, SecondImage } = slider
          const { url, alternativeText } = Image.data.attributes
          const { url: otherUrl, alternativeText: otherAlt } =
            SecondImage.data.attributes
          const img = generateImgSrc(url)
          const otherImg = generateImgSrc(otherUrl)

          return (
            <SlideImage
              key={i}
              img={img}
              alternativeText={alternativeText}
              otherImg={otherImg}
              otherAlt={otherAlt}
            />
          )
        })}
      </div>
      <div className='message-slider'>
        <h2>{sliderInfo[currentSlide].title}</h2>
        <p>{sliderInfo[currentSlide].subtitle}</p>
      </div>
      {/* <Link
        to={sliderInfo[currentSlide].link}
        className='btn absolute bottom-6 md:bottom-12 left-8 md:left-16'
      >
        {Btn} <AiOutlineArrowRight />
      </Link> */}

      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
          />

          <Arrow
            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
          />
        </>
      )}
    </section>
  )
}

function Arrow(props: { left?: boolean; onClick: (e) => void }) {
  return (
    <div
      className={`arrow-container ${
        props.left ? 'arrow--left' : 'arrow--right'
      }`}
    >
      <svg
        onClick={props.onClick}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='#fff'
      >
        {props.left && (
          <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
        )}
        {!props.left && (
          <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
        )}
      </svg>
    </div>
  )
}

export default Carousel
