import Head from "next/head";
import { Layout } from "../../components/Layout";
// import { Consultant as ConsultantInfo } from "../../components/Consultant";
import { ConsultantInfo } from "../../components/Consultant";
import api from "../../api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { getLocaleKeyFromObj, getRegionSlug } from "../../helpers/locale";

const Consultant = (props) => {
  const { query, locale } = useRouter();

  function getConsultantTags() {
    const tags = props.data.tags.filter((item) => item.locale === query.lang);

    return tags
      .map(function (item) {
        return item.name;
      })
      .join(", ");
  }

  return (
    <>
      <Head>
        <title>{`${getLocaleKeyFromObj(props.data, "name", query.lang)} - ${
          query.lang === "ka" ? "ექსპერტი" : "Expert in"
        }: ${getLocaleKeyFromObj(
          props.data.categories[0],
          "name",
          query.lang
        )} - Consultida ${getLocaleKeyFromObj(
          getRegionSlug(locale),
          "name",
          query.lang
        )}`}</title>
        <meta
          name="description"
          content={`${getConsultantTags()}. ${getLocaleKeyFromObj(
            props.data,
            "short_text",
            query.lang
          )}.`}
        ></meta>
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${getLocaleKeyFromObj(props.data, "name", query.lang)} - ${
            query.lang === "ka" ? "ექსპერტი" : "Expert in"
          }: ${getLocaleKeyFromObj(
            props.data.categories[0],
            "name",
            query.lang
          )} - Consultida ${getLocaleKeyFromObj(
            getRegionSlug(locale),
            "name",
            query.lang
          )}`}
        />
        <meta
          property="og:description"
          content={`${getConsultantTags()}. ${getLocaleKeyFromObj(
            props.data,
            "short_text",
            query.lang
          )}.`}
        />
        <meta property="og:image" content={props.data.image} />
      </Head>
      <Layout>
        {/* <ConsultantInfo data={props.data} webinars={props.newWebinars} /> */}
        <ConsultantInfo data={props.data} webinars={props.newWebinars} />
      </Layout>
    </>
  );
};

export const getServerSideProps = async ({
  locale,
  params,
  query,
  req,
  ...props
}) => {
  const forwarded = req.headers["x-real-ip"] || req.connection.remoteAddress;
  api.clientIp = forwarded;
  let { slug: region } = getRegionSlug(locale);
  const { data: newWebinars } = await api.getConsultantNewWebinars(params.id, {
    region,
  });
  const { data } = await api.getConsultant(params.id);

  return {
    props: {
      ...(await serverSideTranslations(query.lang || "en", ["common", "app"])),
      // Will be passed to the page component as props,
      data,
      newWebinars: newWebinars,
    },
  };
};
export default Consultant;
