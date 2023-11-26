import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { type TextContent, type ImageStrapi } from 't'
import style from './style.module.scss'
import { useFunctions } from 'h'
import { type ActivitieInfo } from 'src/pages/Page'

interface ActivitiesInfo extends TextContent {
  activities: ActivitieInfo[]
}
const Activities = ({ title, content, activities }: ActivitiesInfo) => {
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
    <section className={style.activitiesContainer}>
      <div ref={sliderRef} className={`${style.sliderSection} keen-slider`}>
        {activities.map((activitie: { image: ImageStrapi }, i: number) => {
          const { image } = activitie
          const { url } = image.data.attributes
          const img = generateImgSrc(url)

          return (
            <div
              key={i}
              className={`${style.slide} keen-slider__slide`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          )
        })}
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
            />
          </>
        )}
      </div>
      <div className={style.textSection}>
        <h2>{title}</h2>
        <p>{content}</p>
        <ul>
          {activities.map((activitie: { title: string }, i: number) => {
            return <li key={i}>{activitie.title}</li>
          })}
        </ul>
      </div>
    </section>
  )
}

function Arrow(props: { left?: boolean; onClick: (e) => void }) {
  return (
    <div
      className={`arrow-container more ${
        props.left ? 'arrow--left less' : 'arrow--right'
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

export default Activities
