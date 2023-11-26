import { useState, useEffect, useRef } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import ArrowModal from './ArrowModal'

interface Props {
  images: string[]
  onClose: () => void
}

export const ImageSliderModal = ({ images, onClose }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [bgArrow, setBGArrow] = useState({
    prev: false,
    next: false,
  })
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    renderMode: 'performance',
    animationEnded() {
      setBGArrow({
        prev: false,
        next: false,
      })
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
  const [arrowSize, setArrowSize] = useState('15px')

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      const newArrowSize = screenWidth < 760 ? '15px' : '30px'
      setArrowSize(newArrowSize)
    }

    handleResize() // Initial call to set the arrow size based on the window width

    window.addEventListener('resize', handleResize) // Update the arrow size on window resize

    return () => {
      window.removeEventListener('resize', handleResize) // Cleanup the event listener on component unmount
    }
  }, [])
  const modalRef = useRef(null)

  const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (!modalRef.current?.contains(event.target)) {
      onClose()
    }
  }

  const changeSlideAction = (type: 'prev' | 'next') => {
    const actions = {
      prev: () => {
        setBGArrow({ prev: true, next: false })
        instanceRef.current?.prev()
      },
      next: () => {
        setBGArrow({ prev: false, next: true })
        instanceRef.current?.next()
      },
    }
    actions[type]()
  }

  return (
    <div
      className='fixed inset-0 bg-[black] bg-opacity-75 z-[100] flex items-center justify-center'
      onClick={handleClickOutside}
    >
      <div
        className='relative bg-white rounded w-[90%] lg:w-3/5 xl:w-[75%] h-[40%] sm:h-[50%] lg:h-[70%] xl:h-[80%]'
        ref={modalRef}
      >
        <div ref={sliderRef} className='keen-slider w-full h-full'>
          {images.map((img) => (
            <div className='keen-slider__slide w-full h-full'>
              <img src={img} className='w-full h-full' />
            </div>
          ))}
        </div>

        {loaded && (
          <>
            {}
            <button
              className={`absolute top-1/2 left-3 rounded-full p-2 md:p-3 backdrop-blur-md arrow ${
                bgArrow.prev ? 'bg-[black]' : ''
              }`}
              onClick={() => changeSlideAction('prev')}
            >
              <ArrowModal arrowSize={arrowSize} rotate={'rotate(180)'} />
            </button>
            <button
              className={`absolute top-1/2 right-3 rounded-full p-2 md:p-3 backdrop-blur-md arrow ${
                bgArrow.next ? 'bg-[black]' : ''
              }`}
              onClick={() => changeSlideAction('next')}
            >
              <ArrowModal arrowSize={arrowSize} rotate={'rotate(0)'} />
            </button>{' '}
          </>
        )}

        <button
          className='absolute text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl top-[-5rem] right-0 p-4 font-Lato text-white font-bold'
          onClick={() => onClose()}
        >
          Close X
        </button>
      </div>
    </div>
  )
}
