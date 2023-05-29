import React, { useEffect, useContext, useState } from "react";

import Head from "next/head";
import { Layout } from "../../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { UserContext } from "../../context";
import Form from "../../components/Form";
import api from "../../api";
import { useTranslation } from "next-i18next";
import detectFont from "../../helpers/fonts";
import { useRouter } from "next/router";

const Page = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation("app");
  const { query } = useRouter();
  const locale = query.lang;

  return (
    <div data-theme="light">
      <Head>
        <title>User - Profile Edit</title>
      </Head>
      <Layout>
        <ProtectedRoute>
          <div className="bg-[#F2F2F2]">
            <div className="custom-container">
              <div
                className={`
               ${detectFont(locale, false, true)}
                block lg-max:hidden w-full font-bold text-4xl
               text-gray leading-[60px] py-12`}
              >
                {t("editProfile")}
              </div>
            </div>
            <div className="bg-white py-[72px]">
              {user && <Form currentUser={user} />}
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
