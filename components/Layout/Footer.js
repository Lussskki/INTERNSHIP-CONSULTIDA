import { Logo } from "../Logo";
import FooterItems from "./FooterItems";
import {
  FbIcon,
  LinkedinIcon,
  VisaIcon,
  MastercardIcon,
  PaypalIcon,
} from "../Icons";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { query } = useRouter();
  const { t } = useTranslation("app");

  return (
    <div className="w-full border-t-solid border-t-[1px] border-t-[#C4C4C4]">
      <div
        className="custom-container-footer w-full
         min-h-96 pt-[30px] pb-[25px] sm-max:pt-[15px]
        sm-max:pb-[15px] sm-max:px-[22px] footer-border"
        style={{ background: "white" }}
      >
        <div className="hidden justify-between items-center sm-max:flex">
          <p className="font-bold text-sm text-graySecondary">© CONSULTIDA</p>
          <div className="flex">
            <FbIcon />
            <LinkedinIcon />
          </div>
        </div>
        <div className="sm-max:hidden">
          <div className="flex justify-between">
            <div className="left-content flex items-start justify-between flex-col">
              <div className="flex items-center mb-5">
                <Logo style={{ width: "118px" }} color="#8F8F8F" />
                <div className="flex ml-11">
                  <FbIcon route="https://www.facebook.com/Consultida" />
                  <LinkedinIcon route="https://www.linkedin.com/company/consultida/" />
                </div>
              </div>
              <FooterItems
                align="left"
                items={[
                  {
                    title: "Tvibo LLC #429 105 N 1st Street San Jose CA, 95103",
                  },
                  {
                    to: "mailto:hello@consultida.com",
                    title: "hello@consultida.com",
                  },
                  {
                    /*to: "tel:+995511167589",
                    title: "+995 511 167589",*/
                  },
                ]}
              />
            </div>
            <FooterItems
              align="right"
              items={[
                {
                  to: `consultants`,
                  query: true,
                  title: t("consultants"),
                },
                {
                  to: `webinars`,
                  query: true,
                  title: t("webinars"),
                },
                {
                  to: "https://blog.consultida.com",
                  query: false,
                  title: t("FAQ"),
                },
                {
                  to: `about`,
                  query: true,
                  title: t("aboutus"),
                },
                {
                  to: `https://dashboard.consultida.com/consultant/login`,
                  query: false,
                  title: t("becomeconsultant"),
                },
                {
                  to: `terms`,
                  query: true,
                  title: t("termsandconditions"),
                },
                {
                  to: `privacy-policy`,
                  query: true,
                  title: t("privacypolicy"),
                },
              ]}
            />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm max-w-[613px] mb-[10px]">
                All logoes mentioned are trademarks or intelectual property of
                their respective owners. Consultida doesn’t claim ownership of
                any intelectual property of any content posted on this site.
                Experts and their expirience are not our responsibility, they
                are not our employees.
              </p>
              <p className="font-bold text-sm text-graySecondary">
                © CONSULTIDA
              </p>
            </div>
            <div className="paying-container flex">
              <VisaIcon />
              <MastercardIcon />
              <PaypalIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
