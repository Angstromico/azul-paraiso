import { useQuery } from '@apollo/client'
import { GET_PAGE_INFO } from 'q'
import { type ImageStrapi, TextContent, type ImagesStrapi } from 't'
import Carousel from 'c/Carousel'
import RentStatus from 'c/RentStatus'
import { useFunctions } from 'h'
import Activitie from 'c/Activities'
import Location from 'c/Locations'
import AboutSection from 'c/AboutSection'
import StateSection from 'c/StateSection'
import FloorsSection from 'c/FloorsSection'
import Interiors from 'c/Interiors'
import PlanSection from 'c/PlanSection'
import ServiceComponent from 'c/ServiceComponent'
import Banner from 'c/Banner'
import MapsLocations from 'c/MapsLocation'
import ReachMap from 'c/ReachMap'
import Contact from 'c/Contact'

interface Page {
  iDInfo: string
}

type TypeName =
  | 'ComponentLayoutSlider'
  | 'ComponentLayoutRentalState'
  | 'ComponentLayoutActivities'
  | 'ComponentLayoutLocation'
  | 'ComponentLayoutAboutSection'
  | 'ComponentComplementContectSection'
  | 'ComponentLayoutFloorPart'
  | 'ComponentLayoutInteriors'
  | 'ComponentBlendPlan'
  | 'ComponentLayoutGallery'
  | 'ComponentBlendBgImage'
  | 'ComponentBlendLocationMaps'
  | 'ComponentBlendReachMap'
  | 'ComponentComplementContact'

export interface Slider extends TextContent {
  Image: ImageStrapi
  link: string
  SecondImage: ImageStrapi
}

export interface ActivitieInfo {
  title: string
  image: ImageStrapi
}

export interface BtnLink {
  text: string
  url: string
}

export interface Floor {
  Image: ImageStrapi
  title: string
  size: string
  bedroom: string
  bathroom: string
  BtnText: string
  BtnLink: string
}

export interface Interior {
  title: string
  Image: ImageStrapi
  option: { option: string }[]
}

export interface ServiceInfo {
  title: string
  Image: ImageStrapi
  Images: ImagesStrapi
  Group: 'Exteriors' | 'Interiors' | 'Activities'
}

export interface Map {
  text: string
  GoogleMap: string
  WazeMap: string
}

export interface ArrowInfo {
  idArrow: string
  Arrow: ImageStrapi
}

export interface ContactInfo {
  mail: string
  phone: string
  follow: string
}

interface PageContent extends TextContent {
  __typename: TypeName
  Content: Slider[]
  Btn: string
  Image: ImageStrapi
  Image1: ImageStrapi
  Link1: string
  Image2: ImageStrapi
  Link2: string
  video: string
  VideoImage: ImageStrapi
  textLink1: string
  textLink2: string
  Activities: ActivitieInfo[]
  TitleLocations: string
  Locations: { text: string }[]
  Btn1: BtnLink
  Btn2: BtnLink
  Images: ImagesStrapi
  BtnText: string
  BtnUrl: string
  FirstFloor: Floor
  SecondFloor: Floor
  ThirdFloor: Floor
  first: Interior
  second: Interior
  third: Interior
  image: ImageStrapi
  FirstService: string
  SecondService: string
  ThirdService: string
  Service: ServiceInfo[]
  mapsTitle: string
  Maps: Map[]
  MapVector: ImageStrapi
  MapsImage: ImageStrapi
  TitleModal: string
  BtnModal: string
  GoogleLogo: ImageStrapi
  WazeLogo: ImageStrapi
  ArroId: ArrowInfo
  idArrow: string
  MapText: string
  MapUrl: string
  WazeText: string
  WazeUrl: string
  otherTitle: string
  otherContent: string
  otherMapText: string
  otherMapUrl: string
  otherWazeText: string
  otherWazeUrl: string
  ContactInfo: ContactInfo
}
const Page = ({ iDInfo }: Page) => {
  const { loading, error, data } = useQuery(GET_PAGE_INFO(iDInfo))
  const elements: React.ReactElement[] = []
  const { generateImgSrc } = useFunctions()

  if (loading) return
  if (error) return

  const pageInfo: PageContent[] = data.page.data.attributes.content

  pageInfo.forEach((component, i) => {
    if (component.__typename === 'ComponentLayoutSlider') {
      const content = component.Content
      const btn = component.Btn
      const element = <Carousel key={i} sliderInfo={content} Btn={btn} />
      elements.push(element)
    }
    if (component.__typename === 'ComponentLayoutRentalState') {
      const {
        title,
        content,
        Image1,
        Image2,
        video,
        VideoImage,
        Link1,
        Link2,
        textLink1,
        textLink2,
      } = component
      const { url, alternativeText } = Image1.data.attributes
      const img1 = generateImgSrc(url)
      const { url: secondUrl, alternativeText: secondAlt } =
        Image2.data.attributes
      const img2 = generateImgSrc(secondUrl)
      const { url: thirdUrl } = VideoImage.data.attributes
      const videoCover = generateImgSrc(thirdUrl)
      const element = (
        <RentStatus
          key={i}
          title={title}
          content={content}
          Image1={img1}
          al1={alternativeText}
          Link1={Link1}
          Link2={Link2}
          video={video}
          Image2={img2}
          alt2={secondAlt}
          videoCover={videoCover}
          textLink1={textLink1}
          textLink2={textLink2}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentLayoutActivities') {
      const { title, content, Activities } = component
      const element = (
        <Activitie
          key={i}
          title={title}
          content={content}
          activities={Activities}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentLayoutLocation') {
      const { title, content, Image, TitleLocations, Btn1, Btn2, Locations } =
        component
      const element = (
        <Location
          key={i}
          title={title}
          content={content}
          TitleLocations={TitleLocations}
          Image={Image}
          Btn1={Btn1}
          Btn2={Btn2}
          Locations={Locations}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentLayoutAboutSection') {
      const { title, content, Image } = component
      const element = (
        <AboutSection key={i} title={title} content={content} Image={Image} />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentComplementContectSection') {
      const { title, content, Images, BtnText, BtnUrl } = component
      const element = (
        <StateSection
          key={i}
          title={title}
          content={content}
          Images={Images}
          BtnText={BtnText}
          BtnUrl={BtnUrl}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentLayoutFloorPart') {
      const { title, FirstFloor, SecondFloor, ThirdFloor } = component
      const element = (
        <FloorsSection
          key={i}
          title={title}
          FirstFloor={FirstFloor}
          SecondFloor={SecondFloor}
          ThirdFloor={ThirdFloor}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentLayoutInteriors') {
      const { first, second, third } = component
      const element = (
        <Interiors key={i} first={first} second={second} third={third} />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentBlendPlan') {
      const { title, content, image } = component
      const element = (
        <PlanSection key={i} title={title} content={content} image={image} />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentLayoutGallery') {
      const { title, FirstService, SecondService, ThirdService, Service } =
        component
      const element = (
        <ServiceComponent
          key={i}
          title={title}
          FirstService={FirstService}
          SecondService={SecondService}
          ThirdService={ThirdService}
          Services={Service}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentBlendBgImage') {
      const { Image, ArroId } = component
      const element = <Banner key={i} Image={Image} ArroId={ArroId} />
      elements.push(element)
    }
    if (component.__typename === 'ComponentBlendLocationMaps') {
      const {
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
      } = component
      const element = (
        <MapsLocations
          key={i}
          title={title}
          content={content}
          mapsTitle={mapsTitle}
          Maps={Maps}
          MapVector={MapVector}
          MapsImage={MapsImage}
          TitleModal={TitleModal}
          BtnModal={BtnModal}
          GoogleLogo={GoogleLogo}
          WazeLogo={WazeLogo}
          idArrow={idArrow}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentBlendReachMap') {
      const {
        title,
        content,
        MapText,
        MapUrl,
        WazeText,
        WazeUrl,
        otherTitle,
        otherContent,
        otherMapText,
        otherMapUrl,
        otherWazeText,
        otherWazeUrl,
      } = component
      const element = (
        <ReachMap
          key={i}
          title={title}
          content={content}
          MapText={MapText}
          MapUrl={MapUrl}
          WazeText={WazeText}
          WazeUrl={WazeUrl}
          otherTitle={otherTitle}
          otherContent={otherContent}
          otherMapText={otherMapText}
          otherWazeUrl={otherWazeUrl}
          otherMapUrl={otherMapUrl}
          otherWazeText={otherWazeText}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentComplementContact') {
      const { Image, title, ContactInfo } = component
      const element = (
        <Contact
          key={i}
          title={title}
          Image={Image}
          ContactInfo={ContactInfo}
        />
      )
      elements.push(element)
    }
  })

  return <>{elements}</>
}

export default Page
