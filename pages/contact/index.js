import React, { useEffect, useState } from "react";
import detectFont from "../../helpers/fonts";
import Head from "next/head";
import { Layout } from "../../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "../../api";
import { getLocaleKeyFromObj, getRegionSlug } from "../../helpers/locale";
import { useRouter } from "next/router";

const Page = ({ data, pages }) => {
  const pageData = pages.find((item) => item.slug === "/contact");

  const { query, locale } = useRouter();

  function getStrippedDescription(length) {
    return getLocaleKeyFromObj(pageData, "description", query.lang)
      .replace(/(<([^>]+)>)/gi, "")
      .substring(0, length)
      .replace(/&nbsp;/g, "");
  }

  let phoneNumber = data.phone ? `tel:${data.phone}` : null;

  return (
    <div data-theme="light">
      <Head>
        <title>{`${getLocaleKeyFromObj(
          pageData,
          "name",
          query.lang
        )} - Consultida - ${getLocaleKeyFromObj(
          getRegionSlug(locale),
          "name",
          query.lang
        )}`}</title>
        <meta
          name="description"
          content={`${getStrippedDescription(230)}...`}
        ></meta>
        <meta property="og:type" content="article" />
        <meta property="og:image" content={pageData.image} />
        <meta
          property="og:title"
          content={`${pageData.name} - Consultida - ${getLocaleKeyFromObj(
            getRegionSlug(locale),
            "name",
            query.lang
          )}`}
        />
        <meta
          property="og:description"
          content={`${getStrippedDescription(230)}...`}
        />
      </Head>
      <Layout>
        <div className="bg-[#F2F2F2]">
          <div className="faq-container">
            <div
              className={`
              ${detectFont(query.lang, false, true)}
              block lg-max:hidden w-full font-bold text-4xl
             text-gray leading-[60px] py-[85px]`}
            >
              {getLocaleKeyFromObj(data, "name", query.lang)}
            </div>
          </div>
          <div className=" bg-white items-center flex flex-col">
            <div className="hidden lg-max:block bg-[#F2F2F2] w-full h-[100px]"></div>
            <div className="max-w-[850px] lg-max:w-[90%]">
              <div
                className={`
              ${detectFont(query.lang, false, true)}
              hidden lg-max:block font-bold text-3xl text-gray leading-[60px]`}
              >
                {getLocaleKeyFromObj(data, "name", query.lang)}
              </div>
              <div
                className="innerHtmlText mt-5"
                dangerouslySetInnerHTML={{
                  __html: getLocaleKeyFromObj(data, "text", query.lang),
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Page;

export const getServerSideProps = async (props) => {
  const forwarded =
    props.req.headers["x-real-ip"] || props.req.connection.remoteAddress;
  api.clientIp = forwarded;
  const { data } = await api.contact();
  const { data: pages } = await api.getPages({ region: props.locale });

  return {
    props: {
      ...(await serverSideTranslations(props.query.lang || "en", [
        "common",
        "app",
      ])),
      data,
      pages,
    },
  };
};
