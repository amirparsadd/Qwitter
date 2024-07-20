
type Props = {
  link: string,
  text: string
}

function LegalLink({link, text}: Props) {
  return (
    <a className="font-light text-[10pt] px-2 text-blue-300 opacity-75" href={link}>{text}</a>
  )
}

export default LegalLink