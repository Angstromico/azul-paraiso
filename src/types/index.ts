export interface HeaderLink {
  text: string
  link: string
  externalLink: boolean
}

interface AttributesStrapi {
  attributes: {
    url: string
    alternativeText?: string
  }
}

export interface ImageStrapi {
  data: AttributesStrapi
}

export interface ImagesStrapi {
  data: AttributesStrapi[]
}
export interface HeaderInfo {
  Logo: ImageStrapi
  link: HeaderLink[]
}

export interface FooterInfo {
  Logos: {
    Logo1: ImageStrapi
    Logo2: ImageStrapi
  }
  Contact: {
    title: string
    mail: string
    phone: string
    follow: string
  }
  Footext: { text: string }[]
}

interface Input {
  type: string
  label: string
  error?: string
  formatError?: string
}

export interface FormInfo {
  SelectInput: {
    Legend: string
    label: string
    Options: { option: string }[]
  }
  Checkbox: {
    Legend: string
    label1: string
    label2: string
  }
  Textbox: Input
  Name: Input
  Mail: Input
  Phone: Input
  Btn: string
}

export interface TextContent {
  title: string
  subtitle?: string
  content?: string
}
