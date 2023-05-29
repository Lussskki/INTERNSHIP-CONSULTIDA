import Carousel from './Carousel'
import { useTranslation } from 'react-i18next'

export default function NewConsultants({ items }) {
  const { t } = useTranslation("app")

  return (
    <Carousel 
      name={t("newconsultants")}
      items={items}
    />
  )
}