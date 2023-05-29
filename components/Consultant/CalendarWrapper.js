import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useContext, useEffect, useMemo } from 'react'
import Dropdown from '../DataSearch/Dropdown';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PaymentChoose } from '../PaymentChoose';
import { CurrencyContext, UserContext } from '../../context'
import useSWR from 'swr'
import fetch from '../../helpers/fetch'
import { useTranslation } from 'react-i18next';
import { zonedTimeToUtc } from 'date-fns-tz'
import { format } from 'date-fns'

const ErrorMessage = function ({ message }) {
  return <div className="alert alert-error w-full mt-2">
    <div className="flex-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">    
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
      </svg> 
      <label>{message}</label>
    </div>
  </div>
}

const PaymentSchema = Yup.object().shape({
  selectedTime: Yup.string().required("Time is required").nullable(),
  payment_gateway: Yup.string().required("Payment method is required"),
});


const URL_SUPPORTED_CURRENCIES = process.env.SERVICE_URL + "/supported-currencies"

const monthDayEqualityCheck = (date1,date2) => date1.toDateString() === date2.toDateString()

export default function CalendarWrapper({ availableDates, currentConsultation, consultantName}) {
  const { currency } = useContext(CurrencyContext);
  const { data: { data: supportedCurrencies}, error } = useSWR(URL_SUPPORTED_CURRENCIES, fetch, {fallbackData: {data: []}})
  const { t } = useTranslation("app")
  const { user } = useContext(UserContext)
  const [activeDate, setActiveDate] = useState( new Date(format(
    zonedTimeToUtc(new Date(Date.now()),user.timezone.name), 
    "yyyy-MM-dd HH:mm:ss"
  )
  ));
  

  let currentConsultationDateValues = availableDates.filter(item => (
    monthDayEqualityCheck(item, activeDate)
  )) || []


  useEffect(() => {
    if (!availableDates.find(item => (
      monthDayEqualityCheck(item, activeDate)
    ))) {
      setActiveDate(availableDates[0])
    }
  },[availableDates,activeDate, user])

  const formik = useFormik({
    validationSchema: PaymentSchema,
    initialValues: {
      payment_gateway: 'paypal',
      selectedTime: null,
    },
    validate: values => {

      const errors = {};

      // const isSupported = supportedCurrencies.find(
      //   item => item.currency_name === currency && values.payment_gateway === item.payment_gateway
      // )

      // if (supportedCurrencies.length && !isSupported) {
      //   errors.currency = 'Current payment method & currency is not supported';
      // }
      
      return errors
    },
    validateOnBlur: false,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: async values => {
    },
  }); 

  const currentSupportedCurrencies = supportedCurrencies.filter(item => item.currency_name === currency)

  const getCurrentSupportedCurrencyForMethod = (method) => {
    return currentSupportedCurrencies.find(item => item.payment_gateway === method)
  }

  if (error) return <div>Error fetching currency data, try again later</div>
  
  const obj = currentConsultation.prices[currency]
  const price = obj.amount
  const fee = obj.fee_amount
  const total = obj.total
  const timezone = user ? user.timezone : ''
  const hasStartDate = currentConsultationDateValues[0]
  console.log(formik.errors)
  return (
    <>
      <h2 className="card-title px-5 pt-4">{t("bookingonlinesessionwith")} {consultantName}</h2> 
      <div className="p-3 flex flex-shrink-0 lg-max:flex-col">
        <Calendar 
          minDate={new Date(Date.now())}
          onChange={setActiveDate}
          value={activeDate}
          tileClassName={({ date }) => {
            if(availableDates.find(item => monthDayEqualityCheck(item,date))){
              return  'date-available-highlight'
            }
          }}
          tileDisabled={({ date, view }) => {
            if (view === 'year') {
              return false
            }
            const item = availableDates.find(item => monthDayEqualityCheck(item,date ))
            return Boolean(!item)
          }}
        />
        <div className="card shadow-lg ml-5 w-full lg-max:ml-0 lg-max:mt-5">
          <div className="card-body p-5 pt-2">
            <p>{t("duration")}: {currentConsultation.duration} {t("minutes")}</p>
            <p>{t("price")}: <span className=" text-green-500">{price} {currency}</span></p>
            <p>{t("fee")}: <span className=" text-green-500">{fee} {currency}</span></p>
            <p>{t("total")}: <span className=" text-green-500">{total} {currency}</span></p>
            <p>{t("date")}: {new Date(activeDate).toDateString()} {timezone.name}</p>
            <form onSubmit={formik.handleSubmit} className="flex items-start flex-col">
              <Dropdown 
                placeholder={"Select time"}
                onSelect={(value) => formik.setFieldValue("selectedTime", value)}
                selected={formik.values.selectedTime} 
                loading={false} 
                options={currentConsultationDateValues.map(item => format(item,"HH:mm"))}
              />
              {/* {formik.errors.selectedTime && <ErrorMessage message={formik.errors.selectedTime}/>} */}
              {currentSupportedCurrencies && hasStartDate && <PaymentChoose
                amount={total}
                name={consultantName}
                startDate={format(hasStartDate,"yyyy-MM-dd") + " " + formik.values.selectedTime}
                serviceId={currentConsultation.id}
                disabled={formik.errors.selectedTime || formik.errors.currency}
                values={formik.values}
                getCurrentSupportedCurrencyForMethod={getCurrentSupportedCurrencyForMethod}
                onSelect={(value) => formik.setFieldValue("payment_gateway", value)}
                onSuccess={() => console.log("redirect")}
              />}
              {formik.errors.currency && <ErrorMessage message={formik.errors.currency}/>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}