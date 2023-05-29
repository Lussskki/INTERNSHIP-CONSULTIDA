import AuthModal from "./AuthModal";
import { useEffect, useContext } from "react";
import { Menu } from "@headlessui/react";
import { useUser } from "../useUser";
import NonLoggedInMenu from "./NonLoggedInMenu";
import LoggedInMenu from "./LoggedInMenu";
import LoggedInUser from "./LoggedInUser";
import { toast } from "react-toastify";
import { UserContext } from "../../context";
import {useTranslation} from "next-i18next";

export default function User() {
  const { user, isFetching, getUser, deleteUser } = useUser();
  const { authModalIsOpen, setAuthModalIsOpen } = useContext(UserContext);
  const { t } = useTranslation("app");


  useEffect(() => {
    if (user) {
      setAuthModalIsOpen(false);
    }
  }, [user, setAuthModalIsOpen]);

  function handleLogin() {
    getUser();
    toast("🦄 Succesfully logged in!", {
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

  function handleFailure() {
    toast("🦄 Unexpected error", {
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

  function renderUserComponents() {
    if (isFetching) {
      return (
        <div>
          <Menu.Button className="overflow-hidden w-12 h-12 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open user menu</span>
          </Menu.Button>
        </div>
      );
    }
    return (
      <>
        <div className="font-bold text-xs text-graySecondary flex items-center">
          <div className="flex lg-max:hidden items-center">
            {!user && (
              <>
                <h1
                  onClick={() => setAuthModalIsOpen(true)}
                  className="cursor-pointer"
                >
                  Login
                </h1>
                <div className="bg-[#8789BF] py-2 px-3 text-white ml-[22px] cursor-pointer">
                  <a
                    target="_blank"
                    href="https://dashboard.consultida.com/consultant/login"
                    className=""
                    rel="noreferrer"
                  >
                    {t("consultantlogin")}
                  </a>
                </div>
              </>
            )}
          </div>

          <div
            className="hidden lg-max:flex cursor-pointer"
            onClick={() => setAuthModalIsOpen(true)}
          >
            {!user && (
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="24" fill="#F4F5F4" />
                <path
                  d="M32 33V31C32 29.9391 31.5786 28.9217 30.8284 28.1716C30.0783 27.4214 29.0609 27 28 27H20C18.9391 27 17.9217 27.4214 17.1716 28.1716C16.4214 28.9217 16 29.9391 16 31V33"
                  stroke="#C3CBCD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 23C26.2091 23 28 21.2091 28 19C28 16.7909 26.2091 15 24 15C21.7909 15 20 16.7909 20 19C20 21.2091 21.7909 23 24 23Z"
                  stroke="#C3CBCD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <Menu.Button
            className={`${
              user ? "flex " : "hidden "
            }bg-gray-800 overflow-hidden w-12 h-12 lg-max:w-[25px] lg-max:h-[25px] flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
          >
            <span className="sr-only">Open user menu</span>
            {user && <LoggedInUser user={user} />}
          </Menu.Button>
        </div>

        {!user && <NonLoggedInMenu openAuth={() => setAuthModalIsOpen(true)} />}
        {user && <LoggedInMenu onLogout={deleteUser} />}
      </>
    );
  }

  return (
    <>
      <AuthModal
        onFailure={handleFailure}
        onLogin={handleLogin}
        toggle={setAuthModalIsOpen}
        isOpen={authModalIsOpen}
      />
      <Menu as="div" className="ml-3 relative z-20">
        {renderUserComponents()}
      </Menu>
    </>
  );
}
