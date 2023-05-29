import React, { useEffect, useState } from "react";

import Head from "next/head";
import { Layout } from "../../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "../../api";
import { useRouter } from "next/router";
import { getLocaleKeyFromObj, getRegionSlug } from "../../helpers/locale";
import detectFont from "../../helpers/fonts";

const Page = ({ data }) => {
  const { query, locale } = useRouter();

  function getStrippedDescription(length) {
    return getLocaleKeyFromObj(data, "text", query.lang)
      .replace(/(<([^>]+)>)/gi, "")
      .substring(0, length)
      .replace(/&nbsp;/g, "");
  }

  return (
    <div data-theme="light">
      <Head>
        <title>{`${getLocaleKeyFromObj(
          data,
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
        <meta property="og:image" content={data.image} />
        <meta
          property="og:title"
          content={`${data.name} - Consultida - ${getLocaleKeyFromObj(
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
               ${detectFont(locale, false, true)}
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
  const { data } = await api.getPolicies(1);

  return {
    props: {
      ...(await serverSideTranslations(props.query.lang || "en", [
        "common",
        "app",
      ])),
      data,
    },
  };
};
