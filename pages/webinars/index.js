import React from 'react'

import Head from 'next/head'
import {Layout} from '../../components/Layout'
import {Pagination} from '../../components/Pagination'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import api from '../../api';
import { getLocaleKeyFromObj, getRegionSlug } from "../../helpers/locale";
import { useRouter } from "next/router";

const Page = ({page, meta, consultants, pages}) => {
  const pageData = pages.find(item => item.slug === "/webinars")
  const { query, locale } = useRouter();

  return(
    <div data-theme="light">
      <Head>
        <title>{getLocaleKeyFromObj(pageData, "keyword", query.lang).replace('{Region}', getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang))}</title>
        <meta name="description" content={getLocaleKeyFromObj(pageData, "description", query.lang).replace('{Region}', getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang))}></meta>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={getLocaleKeyFromObj(pageData, "keyword", query.lang).replace('{Region}', getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang))} />
        <meta property="og:image" content={pageData.image} />
        <meta property="og:description" content={getLocaleKeyFromObj(pageData, "description", query.lang).replace('{Region}', getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang))} />
      </Head>
      <Layout>
        <Pagination webinar data={consultants} meta={meta} page={page}/>
      </Layout>
    </div>
  )
}
export default Page 

export const getServerSideProps  =  async (props) => {
  const forwarded = props.req.headers["x-real-ip"] || props.req.connection.remoteAddress
  api.clientIp = forwarded
  const { page} = props.query
  const params = new URLSearchParams({
    page: page ?? 1,
  })

  const res = await fetch(`${process.env.SERVICE_URL}/webinars?${params}`)
  const data = await res.json()
  const { data: pages } = await api.getPages({region: props.locale})

  return {
    props: {
      ...(await serverSideTranslations(props.query.lang || 'en', ['common', 'app'])),
      // Will be passed to the page component as props,
      consultants: data ? data.data : [],
      meta: data.meta,
      pages
    },
  };
}
