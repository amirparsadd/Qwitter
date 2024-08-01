import prettyMilliseconds from "pretty-ms"

type Props = {
  uploadDate: number,
  creator: string
  content: string
}

function Qweet({ uploadDate, creator, content }: Props) {
  return (
    <div className='bg-[#3b3b3b] w-[45dvw] rounded-md p-4 m-2'>
      <div className="flex justify-between">
        <span className="font-bold">
          {creator}
        </span>
        <span className="opacity-80 font-light text-sm">
          {prettyMilliseconds(Date.now() - uploadDate, { compact: true })} ago
        </span>
      </div>

      <p className="text-[11pt]">
        {content}  
      </p>
    </div>
  )
}

export default Qweet