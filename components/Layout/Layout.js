/* eslint-disable indent */
import { useState } from "react";
import Head from "next/head";
import { Header } from "../Header";
import Footer from "./Footer";
import { DataSearch } from "../DataSearch";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const [headerOpen, setHeaderOpen] = useState(false);

  const handleClick = (e) => {
    setHeaderOpen(e);
  };
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Eng/Roboto.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Header handleClick={handleClick} />
      {!headerOpen && (
        <>
          <div className="bg-[#F2F2F2]">
            {router.route === "/consultants" ||
            router.route === "/webinars" ||
            router.route === "/search" ? (
              <DataSearch />
            ) : null}
            {children}
          </div>
          <div className="bg-white">
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
