import { gql } from '@apollo/client'
import { Route } from 'react-router-dom'
import Page from 'p'

export interface Pages {
  id: string
  attributes: {
    title: string
    link: string
  }
}

const pageCreation = (title: string, url: string, id: string) => {
  const page = <Route key={title} path={url} element={<Page iDInfo={id} />} />

  return page
}

const generatePage = (routes: React.ReactElement[], page: Pages) => {
  const { id, attributes } = page
  const { title, link } = attributes

  routes.push(pageCreation(title, link, id))
}

const GET_PAGES_INFO = gql`
  query {
    pages {
      data {
        id
        attributes {
          title
          link
        }
      }
    }
  }
`
const GET_PAGE_INFO = (id: string) => gql`
  query {
    page(id: ${id}) {
      data {
        attributes {
          content {
            ... on ComponentLayoutSlider {
              Content {
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                title
                subtitle
                link
                SecondImage {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
              Btn
            }
            ... on ComponentLayoutRentalState {
              title
              content
              Image1 {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              Link1
              Image2 {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              Link2
              video
              VideoImage {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              textLink1
              textLink2
            }
            ... on ComponentLayoutActivities {
              title
              content
              Activities {
                title
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
            ... on ComponentLayoutLocation {
              title
              content
              TitleLocations
              Locations {
                text
              }
              Btn1 {
                text
                url
              }
              Btn2 {
                text
                url
              }
              Image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLayoutAboutSection {
              title
              content
              Image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentComplementContectSection {
              title
              content
              Images {
                data {
                  attributes {
                    url
                  }
                }
              }
              BtnText
              BtnUrl
            }
            ... on ComponentLayoutFloorPart {
              title
              FirstFloor {
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                title
                size
                bedroom
                bathroom
                BtnText
                BtnLink
              }
              SecondFloor {
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                title
                size
                bedroom
                bathroom
                BtnText
                BtnLink
              }
              ThirdFloor {
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                title
                size
                bedroom
                bathroom
                BtnText
                BtnLink
              }
            }
            ... on ComponentLayoutInteriors {
              first {
                title
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                option {
                  option
                }
              }
              second {
                title
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                option {
                  option
                }
              }
              third {
                title
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                option {
                  option
                }
              }
            }
            ... on ComponentBlendPlan {
              title
              content
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLayoutGallery {
              title
              FirstService
              SecondService
              ThirdService
              Service(pagination: { limit: -1 }) {
                title
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                Images (pagination: { limit: -1 }) {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                Group
              }
            }
            ... on ComponentBlendBgImage {
              Image {
                data {
                  attributes {
                    url 
                  }
                }
              }
              ArroId {
                idArrow 
                Arrow {
                  data {
                    attributes {
                      url 
                      alternativeText
                    }
                  }
                }
              }
            }
            ... on ComponentBlendLocationMaps {
              title 
              content 
              mapsTitle 
              Maps(pagination: {limit: -1}) {
                text 
                GoogleMap 
                WazeMap
              }
              MapVector {
                data {
                  attributes {
                    url 
                    alternativeText
                  }
                }
              }
              MapsImage {
                data {
                  attributes {
                    url 
                    alternativeText
                  }
                }
              }
              TitleModal 
              BtnModal 
              GoogleLogo {
                data {
                  attributes{
                    url 
                    alternativeText
                  }
                }
              }
              WazeLogo {
                data {
                  attributes {
                    url 
                    alternativeText
                  }
                }
              }
              idArrow
            }
            ... on ComponentBlendReachMap {
              title 
              content 
              MapText 
              MapUrl 
              WazeText 
              WazeUrl
              otherTitle 
              otherContent 
              otherMapText 
              otherMapUrl 
              otherWazeText 
              otherWazeUrl
            }
            ... on ComponentComplementContact {
              Image {
                data {
                  attributes {
                    url 
                    alternativeText
                  }
                }
              }
              title 
              ContactInfo {
                mail 
                phone 
                follow
              }
            }
          }
        }
      }
    }
  }
`

const GET_HEADER = gql`
  query {
    header {
      data {
        attributes {
          Logo {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          link {
            text
            link
            externalLink
          }
        }
      }
    }
  }
`
const GET_FOOTER = gql`
  query {
    footer {
      data {
        attributes {
          Logos {
            Logo1 {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            Logo2 {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
          }
          Contact {
            title
            mail
            phone
            follow
          }
          Footext {
            text
          }
        }
      }
    }
  }
`
const GET_FORM = gql`
  query {
    form {
      data {
        attributes {
          SelectInput {
            Legend
            label
            Options {
              option
            }
          }
          Checkbox {
            legend
            label1
            label2
          }
          Textbox {
            type
            label
          }
          Name {
            type
            label
            error
          }
          Mail {
            type
            label
            error
            formatError
          }
          Phone {
            label
            type
          }
          Btn
        }
      }
    }
  }
`

export {
  GET_PAGES_INFO,
  GET_PAGE_INFO,
  generatePage,
  GET_HEADER,
  GET_FOOTER,
  GET_FORM,
}
