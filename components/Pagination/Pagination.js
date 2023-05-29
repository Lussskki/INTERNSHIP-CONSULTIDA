/* eslint-disable indent */
import { useRouter } from "next/router";
import Card from "./Card";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { NewWebinarItem } from "../NewWebinars";
import { ConsultantItem } from "../Consultant";
export default function Pagination({ data, meta, webinar }) {
  const { push, query } = useRouter();
  const [page, setPage] = useState(meta.current_page - 1);
  const { t } = useTranslation("app");

  return (
    <div
      className={`lg-max:pb-[20px] ${
        data.length === 0 ? "" : "custom-container"
      } relative lg-max:pt-[20px]`}
    >
      <div
        className={`${
          data.length === 0
            ? "flex mt-12 justify-center items-center"
            : `grid grid-cols-1 px-[13px] lg:px-[0]
       ${webinar ? "lg:grid-cols-3" : "lg:grid-cols-4"}
       gap-6 mt-12 lg-max:gap-0`
        } 
        pb-12 lg-max:pb-0 lg-max:px-0 lg-max:m-0`}
      >
        {data.length === 0 && (
          <div className="flex">
            <span className="text-[35px] lg-max:text-3xl leading-[25px] text-[#B0B0B0]">
              {t("noresults")}
            </span>
          </div>
        )}
        {data.map((item) => (
          <Link
            key={item.id}
            passHhref
            href={{
              pathname: `${webinar ? "/webinars" : "/consultants"}/${item.id}`,
              query: query.lang && {
                lang: query.lang,
              },
            }}
            locale="geo"
          >
            <a>
              {webinar ? (
                <NewWebinarItem item={item} />
              ) : (
                <ConsultantItem item={item} />
              )}
            </a>
          </Link>
        ))}
      </div>

      {data.length > 16 && (
        <div className="m-auto pb-[50px] w-full flex justify-center py-4">
          <ReactPaginate
            previousClassName=""
            previousLinkClassName={`p-3 bg-[#E0DCD8] font-bold ${detectFont(
              query.lang,
              true,
              false
            )} border-solid border-[1px] 
            text-[12px] text-graySecondary hover:border-primary hover:text-primary hover:bg-white`}
            nextClassName=""
            nextLinkClassName={`p-3 bg-[#E0DCD8] font-bold ${detectFont(
              query.lang,
              true,
              false
            )} border-solid
             border-[1px] text-[12px] text-graySecondary hover:border-primary hover:text-primary hover:bg-white`}
            breakLinkClassName="btn"
            hrefBuilder={() => "#"}
            breakLabel={false}
            containerClassName="flex btn-group items-center"
            pageClassName=""
            pageLinkClassName={`mx-[5px] py-[12px] px-[15px] bg-[#E0DCD8] font-bold 
            ${detectFont(
              query.lang,
              true,
              false
            )} border-solid border-[1px] text-[12px] text-graySecondary hover:border-primary
             hover:text-primary hover:bg-white`}
            disableInitialCallback={true}
            activeLinkClassName="!border-primary !text-primary !bg-white"
            nextLabel={t("nextLabel")}
            forcePage={page}
            onPageChange={(page) => {
              setPage(page.selected);
              push(
                `/${webinar ? "webinars" : "consultants"}?page=${
                  page.selected + 1
                }`
              );
            }}
            pageRangeDisplayed={5}
            pageCount={meta.last_page}
            previousLabel={t("previousLabel")}
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </div>
  );
}
