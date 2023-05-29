import Image from 'next/image'
import { useRouter } from 'next/router'
import { getLocaleKeyFromObj } from '../../helpers/locale'

export default function Card({ item }) {
  const { query } = useRouter()
  const locale = query.lang
  return (
    <div key={item.id} className="card shadow-lg">
      <figure className="h-48 relative w-full">
        <Image
          layout="fill"
          className="w-full"
          alt={item.name}
          src={item.image.includes("http") ? item.image : "/defaultImage.jpeg"}
          objectFit="cover"
        />
      </figure> 
      <div className="card-body">
        <h2 className="card-title text-menuItem">{query.params === "geo" ? item.name_ka: item.name}</h2> 
        <div className="innerHtmlText text-menuItem" dangerouslySetInnerHTML={{__html: getLocaleKeyFromObj(item,"short_text",locale)}}/>
      </div>
    </div>
  )
}