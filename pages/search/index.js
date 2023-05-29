import React from 'react'
import Head from 'next/head'
import {Layout} from '../../components/Layout'
import {Pagination} from '../../components/Pagination'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import api from '../../api';
import { getLocaleKeyFromObj, getRegionSlug } from "../../helpers/locale";
import { useRouter } from "next/router";

const Page = ({categories, page, pages, meta, consultants}) => {
  const pageData = pages.find(item => item.slug === "/consultants") || {}
  const { query, locale } = useRouter();

  function headTags() {
    let title, description, category;

    if(query.categoryId)
      category = getLocaleKeyFromObj(categories.filter(x => x.id == query.categoryId)[0], "name", query.lang);

    if(query.lang !== "ka"){
      title = `Top rated experts from ${getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang)} ${query.keyword !== undefined ? "-" : ""} ${query.keyword  !== undefined ? query.keyword : ""}  ${category ? "-" : ""} ${category ? category : ""}`
      description = `Book online meetings with experts from ${getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang)} on Consultida ${query.keyword !== undefined ? "-" : ""} ${query.keyword  !== undefined ? query.keyword : ""}  ${category ? "-" : ""} ${category ? category : ""}`
    }
    else {
      title = `ექსპერტები და კონსულტანტები - ${getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang)} ${query.keyword !== undefined ? "-" : ""} ${query.keyword  !== undefined ? query.keyword : ""} ${category ? "-" : ""} ${category ? category : ""}`
      description = `დაჯავშნე ონლაინ კონსულტაცია ექსპერტთან - ${getLocaleKeyFromObj(getRegionSlug(locale), "name", query.lang)} - Consultida ${query.keyword !== undefined ? "-" : ""} ${query.keyword  !== undefined ? query.keyword : ""}  ${category ? category : ""}`
    }
    return <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={pageData.image} />
      <meta property="og:description" content={description} />
    </>
  }

  return(
    <div data-theme="light">
      <Head>
        {headTags()}
      </Head>
      <Layout>
        <Pagination data={consultants} meta={meta} page={page}/>
      </Layout>
    </div>
  )
}
export default Page 

export const getServerSideProps  =  async (props) => {
  const forwarded = props.req.headers["x-real-ip"] || props.req.connection.remoteAddress
  api.clientIp = forwarded
  const { keyword, page, categoryId} = props.query
  const params = {
    keyword,
    page: page ?? 1,
    category_id: categoryId
  }

  const { data, meta } = await api.getConsultants({region: props.locale, filters: params})
  const { data: categories } = await api.getCategories({})
  const { data: pages } = await api.getPages({region: props.locale})

  return {
    props: {
      ...(await serverSideTranslations(props.query.lang || 'en', ['common', 'app'])),
      // Will be passed to the page component as props,
      consultants: data || [],
      meta: meta,
      pages,
      categories: categories,
    },
  };
}
