
import { ClockIcon } from '@heroicons/react/solid'
import { CurrencyContext } from '../../context'
import { useContext } from 'react'
import { useTranslation } from 'next-i18next';

export default function ConsultationsPrice({ consultations, onFetchAvailableDates }) {
  const { currency } = useContext(CurrencyContext);
  const { t } = useTranslation("app")

  function renderPriceList() {
    return consultations.map(item => (
      <li key={item.id} onClick={() => onFetchAvailableDates(item)}>
        <a className="text-xl">
          <ClockIcon className="text-primary h-8 w-8 mr-2"/>
          {item.duration} {t("minutes")} - {item.prices[currency].amount} {currency}
        </a>
      </li> 
    ))
  }
  return (
    <ul className="menu p-4 shadow-lgrounded-box">
      <li className="text-primary">
        <span className=" text-blue-300">
          Choose an option
        </span>
      </li> 
      {renderPriceList()}
    </ul>
  )
}