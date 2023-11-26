import { useState } from 'react'
import { type Interior } from 'p'
import style from './style.module.scss'
import { useFunctions } from 'h'
import InteriorCard from './parts/InteriorCard'

interface InteriorsInfo {
  first: Interior
  second: Interior
  third: Interior
}

const Interiors = ({ first, second, third }: InteriorsInfo) => {
  const [firstResize, setFirstResize] = useState(false)
  const [secondResize, setSecondResize] = useState(false)
  const [thirdResize, setThirdResize] = useState(false)
  const { generateImgSrc } = useFunctions()
  const { url } = first.Image.data.attributes
  const { url: secondUrl } = second.Image.data.attributes
  const { url: thirdUrl } = third.Image.data.attributes
  const img = generateImgSrc(url)
  const secondImg = generateImgSrc(secondUrl)
  const thirdImg = generateImgSrc(thirdUrl)

  return (
    <section className={style.interiorContainer}>
      <div className={style.cards}>
        <InteriorCard
          resize={firstResize}
          img={img}
          int={first}
          setResize={setFirstResize}
        />
        <InteriorCard
          resize={secondResize}
          img={secondImg}
          int={second}
          setResize={setSecondResize}
        />
        <InteriorCard
          resize={thirdResize}
          img={thirdImg}
          int={third}
          setResize={setThirdResize}
        />
      </div>
    </section>
  )
}
export default Interiors
