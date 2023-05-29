import React from "react";

import Head from "next/head";
import { Layout } from "../../components/Layout";
import { Pagination } from "../../components/Pagination";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "../../api";
import { useRouter } from "next/router";
import { getLocaleKeyFromObj, getRegionSlug } from "../../helpers/locale";

const Page = ({ page, meta, consultants, pages }) => {
  const pageData = pages.find((item) => item.slug === "/consultants");
  const { query, locale } = useRouter();

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
          content={getLocaleKeyFromObj(
            pageData,
            "description",
            query.lang
          ).replace(
            "{Region}",
            getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang)
          )}
        />
      </Head>
      <Layout>
        <Pagination data={consultants} meta={meta} page={page} />
      </Layout>
    </div>
  );
};
export default Page;

export const getServerSideProps = async (props) => {
  const forwarded =
    props.req.headers["x-real-ip"] || props.req.connection.remoteAddress;
  api.clientIp = forwarded;
  const { page } = props.query;
  const params = new URLSearchParams({
    page: page ?? 1,
  });

  const { data, meta } = await api.getConsultants({
    region: props.locale,
    filters: {},
  });

  const { data: pages } = await api.getPages({ region: props.locale });

  return {
    props: {
      ...(await serverSideTranslations(props.query.lang || "en", [
        "common",
        "app",
      ])),
      // Will be passed to the page component as props,
      consultants: data,
      meta,
      pages,
    },
  };
};
