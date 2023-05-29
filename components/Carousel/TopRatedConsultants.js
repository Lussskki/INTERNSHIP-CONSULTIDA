import Carousel from './Carousel'
import { useTranslation } from 'react-i18next'

export default function TopRatedConsultants({ items }) {
  const { t } = useTranslation("app")

  return (
    <Carousel 
      name={t("topratedconsultants")}
      items={items}
    />
  )
}