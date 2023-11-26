interface SliderImage {
  img: string
  otherImg: string
  alternativeText: string
  otherAlt: string
}

const SlideImage = ({
  img,
  otherImg,
  alternativeText,
  otherAlt,
}: SliderImage) => {
  return (
    <div className='keen-slider__slide'>
      <img
        src={otherImg}
        alt={otherAlt}
        className='block md:hidden w-full h-full'
      />
      <img
        className='hidden md:block w-full h-full'
        src={img}
        alt={alternativeText}
      />
    </div>
  )
}

export default SlideImage
