import { useTranslation } from 'react-i18next'
import Carousel from './Carousel'

export default function NewWebinars({ items, newWebinars, moreWebinars }) {
  const { t } = useTranslation("app")
  return (
    <Carousel 
      webinar
      name={moreWebinars ? t("morewebinars") : t("newwebinars")}
      items={items}
    />
  )
}