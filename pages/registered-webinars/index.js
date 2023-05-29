import React, { useEffect, useState } from "react";

import Head from "next/head";
import { Layout } from "../../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { Table } from "../../components/Table";
import api from "../../api";
import { getLocaleKeyFromObj } from "../../helpers/locale";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import detectFont from "../../helpers/fonts";

const Page = () => {
  const [data, setData] = useState({ data: [], meta: {} });
  const { query } = useRouter();
  const locale = query.lang;
  const { t } = useTranslation("app");

  useEffect(() => {
    getData();
  }, []);

  async function getData(page) {
    const data = await api.getRegisteredWebinars(page);
    setData(data);
  }

  function handlePage(page) {
    getData(page);
  }

  return (
    <div data-theme="light">
      <Head>
        <title>User - Webinars</title>
        <meta name="description" content="List of current webinars"></meta>
        <meta property="og:type" content="article" />
        <meta property="og:title" content="User - Webinars" />
        <meta property="og:description" content="List of current webinars" />
      </Head>
      <Layout>
        <ProtectedRoute>
          <div className="bg-[#F2F2F2]">
            <div className="custom-container">
              <div
                className={`
               ${detectFont(locale, false, true)}
              block lg-max:hidden w-full font-bold text-4xl text-gray leading-[60px] py-[85px]`}
              >
                {t("webinars")}
              </div>
            </div>
            <div className="bg-white py-[72px]">
              {data ? (
                <Table data={data} handlePage={handlePage} />
              ) : (
                <span className="flex items-center justify-center text-sm max-w-[613px] mb-[10px]">
                  {t("youDontHaveBookedWebinars")}
                </span>
              )}
            </div>
          </div>
        </ProtectedRoute>
      </Layout>
    </div>
  );
};
export default Page;

export const getServerSideProps = async (props) => {
  const forwarded =
    props.req.headers["x-real-ip"] || props.req.connection.remoteAddress;
  api.clientIp = forwarded;
  return {
    props: {
      ...(await serverSideTranslations(props.query.lang || "en", [
        "common",
        "app",
      ])),
    },
  };
};
