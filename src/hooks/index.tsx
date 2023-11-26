export const useFunctions = () => {
  const generateImgSrc = (url: string) =>
    import.meta.env.VITE_APP_BACKEND_IMAGES + url

  const splitIntoParagraphs = (text: string) => {
    const paragraphs = text.split(/\s{2,}/g)

    return paragraphs.map((paragraph, index) => (
      <span className='block my-4' key={index}>
        {paragraph}
      </span>
    ))
  }

  return { generateImgSrc, splitIntoParagraphs }
}
