import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import cx from 'classnames'
import Slide from './Slide'
const ARROW_COLOR = "#8789BF"
import { useTranslation } from 'next-i18next';

export default function MainSlider(props) {
  const { t } = useTranslation("app")
  return (
    <div className="lg-max:hidden">
      <Carousel
        renderArrowPrev={(onClick,isPrev,acc) => {
          return (
            <div className={
              cx("cursor-pointer active:scale-90 hover:opacity-100 transition-all absolute w-20 z-20 color-white bottom-0 top-0 left-0 flex items-center justify-center",{
                "opacity-0": !isPrev,
                "opacity-80 hover:opacity-100": isPrev
              })
            } onClick={onClick} aria-label={acc}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke={ARROW_COLOR}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          )
        }}
        renderArrowNext={(onClick,isNext,acc) => {
          return (
            <div className={
              cx("cursor-pointer active:scale-90 transition-all absolute w-20 z-20 color-white bottom-0 top-0 right-0 flex items-center justify-center",{
                "opacity-0": !isNext,
                "opacity-80 hover:opacity-100": isNext
              })
            } onClick={onClick} aria-label={acc}>
              <svg xmlns="http://www.w3.org/2000/svg" className=" h-20 w-20" fill="none" viewBox="0 0 24 24" stroke={ARROW_COLOR}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )
        }}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
      >
        {props.items.map(item => (
          <Slide 
            key={item.name}
            item={item}
            imageSrc={item.image}
            url={item.url}
            buttonTitle={t("seedetails")}
          />
        ))}
      </Carousel>
    </div>
  )
}