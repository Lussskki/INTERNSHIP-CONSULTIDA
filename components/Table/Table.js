import { useTranslation } from "react-i18next";
import DisputeModal from "./DisputeModal";
import { useContext, useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { utcToZonedTime, toDate } from "date-fns-tz";
import { UserContext } from "../../context";
import Image from "next/image";
import { StarRating } from "../StarRating";
import { ka, en } from "date-fns/locale";
import { format } from "date-fns";
import { useRouter } from "next/router";
import detectFont from "../../helpers/fonts";

export default function Table({ data, webinars }) {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState(null);
  const [disputes, setDisputes] = useState([]);
  const { user } = useContext(UserContext);
  const { query } = useRouter();
  const locale = query.lang;

  useEffect(() => {
    getDisputes();
  }, []);

  async function getDisputes() {
    try {
      const { data } = await api.getDisputes();
      setDisputes(data);
    } catch (e) {
      toast("Couldn't get disputes", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressClassName: "fancy-progress-consultida",
      });
    }
  }
  function modalShow(transaction, text) {
    setShowModal(transaction);
    setModalText(text);
  }
  const { t } = useTranslation("app");
  function renderAppointments() {
    return data.data.map((item) => {
      // const shouldShowDispute = item.transaction.dispute && item.status !== "upcoming"
      const shouldShowDispute = item.status !== "upcoming";
      return (
        <tr key={item.id}>
          <td className="table-border-right bg-[#F7F7F7] px-6 border-l-0 text-xs whitespace-nowrap p-4 text-graySecondary">
            {item.consultant.name}
          </td>
          <td
            className={`
            ${detectFont(locale, true, false)}
            table-border-right bg-[#F7F7F7] px-6 border-l-0 
          text-xs whitespace-nowrap p-4 text-graySecondary`}
          >
            {format(
              utcToZonedTime(
                toDate(item.start_date, { timeZone: "UTC" }),
                user?.timezone?.name
              ),
              "eee',' MMM dd 'AT' h aaaaa'm'",
              { locale: query.lang === "en" ? en : ka }
            )}
          </td>
          <td
            className={`table-border-right bg-[#F7F7F7] px-6 border-l-0 text-xs whitespace-nowrap p-4 ${detectFont(
              locale,
              true,
              false
            )} text-graySecondary`}
          >
            <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
            {item.duration} {t("minutes")}
          </td>
          <td className="table-border-right bg-[#F7F7F7] px-6 border-l-0 text-xs whitespace-nowrap p-4 text-graySecondary">
            <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
            {item.transaction.customer_currency}{" "}
            {item.transaction.customer_currency === "GEL" ? "₾" : "$"}
            {item.transaction.customer_paid_total}
          </td>
          <td className="table-border-right bg-[#F7F7F7] px-6 border-l-0 text-xs whitespace-nowrap p-4">
            <a
              href={item.hangout_link}
              target="_blank"
              className="ml-6"
              rel="noreferrer"
            >
              <Image
                src="/googleMeet.png"
                alt="Meet Link"
                width={30}
                height={30}
              />
            </a>
          </td>
          <td className="table-border-right bg-[#F7F7F7] px-6 border-l-0 text-xs whitespace-nowrap p-4 pl-5">
            <StarRating
              id={item.id}
              done={item.status === "done" ? false : true}
              rate={item.rate}
            />
          </td>
          {shouldShowDispute && (
            <td className="table-border-right bg-[#F7F7F7] px-6 whitespace-nowrap p-4">
              <span
                className={`cursor-pointer text-[10px] leading-[12px] flex ${detectFont(
                  locale,
                  true,
                  false
                )}
                 border-[1px] border-[#8789BF] border-solid px-[10px] py-2 justify-center text-[#8789BF]`}
                onClick={() =>
                  modalShow(item.transaction, item.transaction.dispute?.text)
                }
              >
                {item.transaction.dispute?.status === "pending"
                  ? "View"
                  : "Dispute"}
              </span>
            </td>
          )}
        </tr>
      );
    });
  }

  function renderWebinars() {
    return data.data.map((item) => {
      // const shouldShowDispute = item.transaction.dispute || item.status !== "upcoming"
      const shouldShowDispute = item.status !== "upcoming";
      return (
        <tr key={item.id}>
          <th className="table-border-right bg-[#F7F7F7] px-6 align-middle border-l-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
            {item.id}
          </th>
          <td className="table-border-right bg-[#F7F7F7] px-6 align-middle border-l-0 text-xs whitespace-nowrap p-4">
            {"Webinar"}
          </td>
          <td className="table-border-right bg-[#F7F7F7] px-6 align-middle border-l-0 text-xs whitespace-nowrap p-4">
            {format(
              utcToZonedTime(
                toDate(item.start_date, { timeZone: "UTC" }),
                user?.timezone?.name
              ),
              "eee',' MMM dd 'AT' h aaaaa'm'",
              { locale: query.lang === "en" ? en : ka }
            )}
          </td>
          <td className="table-border-right bg-[#F7F7F7] px-6 align-middle border-l-0 text-xs whitespace-nowrap p-4">
            <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
            {item.duration}
            {t("minutes")}
          </td>
          <td className="table-border-right bg-[#F7F7F7] px-6 align-middle border-l-0 text-xs whitespace-nowrap p-4">
            <a
              href={item.hangout_link}
              _target="_blank"
              className="text-blue-500"
            >
              {item.hangout_link}
            </a>
          </td>
          <td className="table-border-right bg-[#F7F7F7] px-6 align-middle border-l-0 text-xs whitespace-nowrap p-4">
            {item.status}
          </td>
          <td className="border-t0- px-6 align-middle border-l-0 text-xs whitespace-nowrap p-4 text-green-500">
            <i className="fas fa-arrow-down text-orange-500 mr-4 "></i>
            {item.transaction.customer_paid_total}{" "}
            {item.transaction.customer_currency}
          </td>
          <td className="table-border-right bg-[#F7F7F7] px-6 align-middle border-l-0 text-xs whitespace-nowrap p-4 pl-5">
            <StarRating
              id={item.id}
              done={item.status === "done" ? false : true}
              rate={item.rate}
            />
          </td>
          {shouldShowDispute && (
            <td className="table-border-right bg-[#F7F7F7] px-6 align-middle border-l-0 text-xs whitespace-nowrap p-4">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setShowModal(item.transaction)}
              >
                {item.transaction.dispute?.status === "pending"
                  ? "View Dispute"
                  : "Create dispute"}
              </span>
            </td>
          )}
        </tr>
      );
    });
  }

  return (
    <div className="custom-container">
      <DisputeModal
        disputeText={modalText}
        defaultText={showModal.dispute?.text || ""}
        onSubmit={async (text) => {
          try {
            const data = await api.createDispute(text, showModal.id);
            setShowModal(false);
            toast("Dispute created, administration will contact soon !", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              progressClassName: "fancy-progress-consultida",
            });
          } catch (e) {
            if (e.response?.status === 422) {
              return toast("Should be at least 10 characters!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
            toast("Error creating dispute !", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }}
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
      />
      <section className="bg-grayTilt">
        <div className="w-full xl:mb-0mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full">
                <thead>
                  <tr>
                    <th
                      className="pr-6 pl-[10px] text-graySecondary table-border
                     py-3 text-xs whitespace-nowrap text-left font-bold"
                    >
                      Expert
                    </th>
                    <th
                      className="pr-6 pl-[10px] text-graySecondary table-border
                     py-3 text-xs whitespace-nowrap text-left font-bold"
                    >
                      Date / Time
                    </th>
                    <th
                      className="pr-6 pl-[10px] text-graySecondary table-border 
                    py-3 text-xs whitespace-nowrap text-left font-bold"
                    >
                      Duration
                    </th>
                    <th
                      className="pr-6 pl-[10px] text-graySecondary table-border
                     py-3 text-xs whitespace-nowrap text-left font-bold"
                    >
                      Paid
                    </th>
                  </tr>
                </thead>
                <tbody className="full-table-border">
                  {!webinars ? renderAppointments() : renderWebinars()}
                </tbody>
              </table>
              {data.meta.total > 10 && (
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span className="text-xs xs:text-sm text-gray-900">
                    Showing 1 to 10 of {data.meta.total} Entries
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                      Prev
                    </button>
                    &nbsp; &nbsp;
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
