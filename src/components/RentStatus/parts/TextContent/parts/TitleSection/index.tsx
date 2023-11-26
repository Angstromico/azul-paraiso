import { type TextContent } from 't'
import { useFunctions } from 'h'

const TitleSection = ({ title, content }: TextContent) => {
  const { splitIntoParagraphs } = useFunctions()

  return (
    <>
      <h2>{title}</h2>
      <p>{splitIntoParagraphs(content)}</p>
    </>
  )
}
export default TitleSection
