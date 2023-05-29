import { Layout } from "../components/Layout";
import { NewConsultants, TopRatedConsultants } from "../components/Carousel";
import { BrandsWorked } from "../components/BrandsWorked";
import { InfoContainer } from "../components/InfoContainer";
import { FeaturedConsultants } from "../components/FeaturedConsultants";
import { HomeMainBanner } from "../components/HomeMainBanner";
import { HomeSecondBanner } from "../components/HomeSecondBanner";
import { NewWebinars } from "../components/NewWebinars";
import { MainSlider } from "../components/MainSlider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "../api";
import { useRouter } from "next/router";
import geoip from "geoip-lite";
import Head from "next/head";
import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { getLocaleKeyFromObj, getRegionSlug } from "../helpers/locale";

const howDoesItWorkList = [
  {
    id: 1,
    title: "Find a Consultant",
    title_ka: "მოძებნე კონსულტანტი",
    description_ka:
      "ჩვენი კონსულტანტების ქსელი შედგება სხვადასხვა ინდუსტრიის წამყვანი ექსპერტებისგან. ჩვენ მაქსიმალურად ვცდილობთ, რომ თქვენთვის ძალიან მარტივი იყოს თქვენი საჭიროებების შესაბამისი კონსულტანტის პოვნა.",
    description:
      "Our network of consultants consists of leading experts in many different industries. We try our best to make it extremely simple for you to find just the right consultant for your needs.",
  },
  {
    id: 2,
    title: "Book an Appointment",
    title_ka: "დაჯავშნეთ შეხვედრა",
    description_ka:
      "თქვენ შეგიძლიათ დაჯავშნოთ ონლაინ შეხვედრა თქვენს მიერ არჩეულ კონსულტანტთან მხოლოდ რამდენიმე დაწკაპუნებით. შეამოწმეთ განრიგი, შეარჩიეთ თქვენთვის ყველაზე შესაფერისი თარიღი და დრო, განახორციელეთ გადახდა და დაელოდეთ თქვენი ონლაინ სესიის ბმულს თქვენს ელფოსტაზე.",
    description:
      "You can book an online appointment with your chosen consultant in just a few clicks. Check the schedule, pick the date and time most suitable for you, make payment, and wait for your online session link in your email.",
  },
  {
    id: 3,
    title: "Get Expert Advise",
    title_ka: "მიიღეთ ექსპერტის რჩევა",
    description_ka:
      "დაგეგმილ დროს თქვენი კონსულტანტი მზად იქნება მოგაწოდოთ თქვენთვის საჭირო რჩევები ონლაინ. დარწმუნდით, რომ დროულად ეწვიეთ მითითებულ ბმულს და მზად იქონიეთ თქვენი შეკითხვები.",
    description:
      "On a scheduled time Your consultant will be ready to give you the advice you need online. Make sure to visit provided link on time and have your questions ready.",
  },
];
const whyUseConsultidaList = [
  {
    id: 1,
    title: "All Experts are Prescreened",
    title_ka: "ყველა ექსპერტი გადამოწმებულია",
    description_ka:
      "ჩვენი ყველა ექსპერტის გამოცდილება და კვალიფიკაცია გადამოწმებულია სხვადასხვა გზებით. შესაბამისად თქვენ უკავშირდებით ექსპერტებს, რომლებიც კომპეტენტურები არიან დაგეხმარონ თქვენს კონკრეტულ საჭიროებებში.",
    description:
      "At our consulting platform, we ensure that all of our experts are thoroughly prescreened for their skills and experience. This way, you can trust that you are connecting with top-quality consultants who are qualified to help with your specific needs.",
  },
  {
    id: 2,
    title_ka: "მოხერხებულოობა და სიმარტივე",
    title: "Convenient and Easy to Use",
    description_ka:
      "Consultida ამარტივებს კონსულტანტების პოვნასა და მათთან ონლაინ კავშირის დამყარებას. დამატებითი პროგრემებისა და სხვა სირთულეების გარეშე მარტივად და გასაგებად ჯავშნით და ატარებთ ონლაინ შეხვედრას შერჩეულ ექსპერტთან.",
    description:
      "Consultida makes it easy for customers to find and connect with consultants online, with a streamlined process for requesting consultations, communicating, and paying for services. Customers can get the help they need from the comfort of their own devices, without the need to schedule in-person appointments.",
  },
  {
    id: 3,
    title_ka: "ხელმისაწვდომი და ეფექტური",
    title: "Affordable and Cost-Effective",
    description_ka:
      "კონკურენტული ფასებით და გადახდის მოქნილი მეთოდებით თქვენ შეგიძლიათ მიიღოთ საჭირო ექსპერტის მხარდაჭერა, აირჩიოთ ექსპერტი, რომელიც შეესაბამება თქვენს ბიუჯეტს და საკონსულტაციო საჭიროებებს.",
    description:
      "Consultida offers an efficient and cost-effective way for customers to get the expert help they need. With competitive pricing and flexible payment options, customers can get the support they need without breaking the bank. Customers can choose an expert that fits their budget and their consulting needs.",
  },
];

export default function Home(props) {
  const pageData = props.pages.find((item) => item.slug === "/");
  const { query, locale } = useRouter();
  const { t } = useTranslation("app");

  return (
    <div data-theme="light">
      <Head>
        <title>
          {getLocaleKeyFromObj(pageData, "keyword", query.lang).replace(
            "{Region}",
            getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang)
          )}
        </title>
        <meta
          name="description"
          content={getLocaleKeyFromObj(
            pageData,
            "description",
            query.lang
          ).replace(
            "{Region}",
            getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang)
          )}
        ></meta>
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={getLocaleKeyFromObj(pageData, "keyword", query.lang).replace(
            "{Region}",
            getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang)
          )}
        />
        <meta property="og:image" content={pageData.image} />
        <meta
          property="og:description"
          content={getLocaleKeyFromObj(pageData, "description", query.lang)}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Layout>
        {/* <MainSlider items={props.sliderItems} /> */}
        <HomeMainBanner />
        <div className="bg-white">
          {/* <BrandsWorked /> */}
          <InfoContainer
            list={howDoesItWorkList}
            title={t("howDoesItWork")}
            desc={t("ourFaq")}
            howDoesItWork={true}
          />
        </div>
        <div className="bg-[#F2F2F2]">
          <FeaturedConsultants items={props.topRated} />
        </div>
        <div className="bg-white">
          <InfoContainer
            list={whyUseConsultidaList}
            howDoesItWork={false}
            title={t("whyUseConsultidaTitle")}
            desc={t("ourFaq")}
          />
        </div>
        <HomeSecondBanner />
        <div className="bg-[#F2F2F2]">
          <NewWebinars
            moreWebinars={true}
            items={props.newWebinars.slice(0, 3)}
          />
        </div>

        {/* <div className="pt-3">
          <NewConsultants items={props.newCons} />
          <TopRatedConsultants items={props.topRated} />
          <NewWebinars items={props.newWebinars} />
        </div> */}
      </Layout>
      <div>
        <CookieConsent
          contentClasses="cookies-consent-content"
          buttonWrapperClasses="cookies-consent-buttons-wrapper"
          buttonText={t("accept")}
          expires={365}
        >
          {getLocaleKeyFromObj(props.cookies, "text", query.lang)}{" "}
          <Link
            href={{
              pathname: `/privacy-policy`,
              query: query.lang && {
                lang: query.lang,
              },
            }}
            locale="geo"
          >
            <a style={{ textDecoration: "underline" }}>{t("privacypolicy")}</a>
          </Link>
        </CookieConsent>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({
  locale: region,
  query,
  req,
  res,
}) => {
  const forwarded = req.headers["x-real-ip"] || req.connection.remoteAddress;
  api.clientIp = forwarded;
  var geo = geoip.lookup(forwarded);

  try {
    const { data: sliders } = await api.getSliders({ region });
    const { data: newCons } = await api.getNewConsultants({ region });
    const { data: newWebinars } = await api.getNewWebinars({ region });
    const { data: topRated } = await api.getTopRatedConsultants({ region });
    const { data: pages } = await api.getPages({ region });
    const { data: cookies } = await api.getPolicies(3);

    return {
      props: {
        country: geo ? geo.country : null,
        sliderItems: sliders,
        ...(await serverSideTranslations(query.lang || "en", [
          "common",
          "app",
        ])),
        newCons: newCons,
        topRated,
        newWebinars: newWebinars,
        cookies: cookies,
        pages,
      },
    };
  } catch (e) {
    return {
      props: {
        country: geo ? geo.country : null,
        sliderItems: [],
        ...(await serverSideTranslations(query.lang || "en", [
          "common",
          "app",
        ])),
        newCons: [],
        topRated: [],
        newWebinars: [],
      },
    };
  }
};
