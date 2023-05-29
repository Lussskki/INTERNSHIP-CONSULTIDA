import Head from "next/head";
import { Layout } from "../../components/Layout";
// import { Webinar as WebinarInfo } from "../../components/Webinar";
import { WebinarInfo } from "../../components/Webinar";
import api from "../../api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { getLocaleKeyFromObj, getRegionSlug } from "../../helpers/locale";

const Consultant = (props) => {
  const { query, locale } = useRouter();

  function getWebinarStrippedDescription(length) {
    return getLocaleKeyFromObj(props.data, "text", query.lang)
      .replace(/(<([^>]+)>)/gi, "")
      .substring(0, length);
  }

  return (
    <>
      <Head>
        <title>{`${getLocaleKeyFromObj(props.data, "name", query.lang)} - ${
          query.lang === "ka" ? "ვებინარი" : "Webinar"
        } - Consultida ${getLocaleKeyFromObj(
          getRegionSlug(locale),
          "name",
          query.lang
        )}`}</title>
        <meta
          name="description"
          content={`${getWebinarStrippedDescription(230)}...`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${getLocaleKeyFromObj(props.data, "name", query.lang)} - ${
            query.lang === "ka" ? "ვებინარი" : "Webinar"
          } - Consultida ${getLocaleKeyFromObj(
            getRegionSlug(locale),
            "name",
            query.lang
          )}`}
        />
        <meta
          property="og:description"
          content={`${getWebinarStrippedDescription(230)}...`}
        />
        <meta property="og:image" content={props.data.cover} />
      </Head>
      <Layout>
        <WebinarInfo data={props.data} webinars={props.newWebinars} />
      </Layout>
    </>
  );
};

export const getServerSideProps = async ({ params, req, query, locale }) => {
  const forwarded = req.headers["x-real-ip"] || req.connection.remoteAddress;
  api.clientIp = forwarded;
  const { data } = await api.getWebinar(params.id);
  let { slug: region } = getRegionSlug(locale);
  const { data: newWebinars } = await api.getNewWebinars({
    region,
    perPage: 3,
  });
  const { data: pages } = await api.getPages({ region: locale });

  return {
    props: {
      data,
      ...(await serverSideTranslations(query.lang || "en", ["common", "app"])),
      newWebinars: newWebinars,
      pages,
    },
  };
};

export default Consultant;
