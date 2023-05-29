import { GoogleLogin } from "react-google-login";
import { saveState } from "../../helpers/persist";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";

export default function AuthModal({ isOpen, onLogin, onFailure, toggle }) {
  const { t } = useTranslation("app");
  function login(response) {
    if (!response.tokenId) {
      console.error("Unable to get tokenId from Google", response);
      return;
    }

    const tokenBlob = new Blob(
      [JSON.stringify({ token_id: response.tokenId }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
    };

    fetch(process.env.SERVICE_URL + "/google/login", options).then((r) => {
      r.json().then((user) => {
        if (!user.access_token) {
          onFailure();
          return;
        }
        const token = user.access_token;
        saveState({ token }, "auth");
        onLogin();
      });
    });
  }

  const cancelButtonRef = useRef(null);
  if (isOpen === undefined) return null;

  return (
    <Transition show={isOpen} appear={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={toggle}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="py-5 bg-pink-5">
                <h3 className="text-2xl font-bold text-gray-700 text-center">
                  {t("authinconsultida")}
                </h3>
                <div className="flex justify-center h-10 my-5">
                  <GoogleLogin
                    clientId="610094857253-ass0aodp33mjgl5qfguev3d0qo7u316s.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={login}
                    onFailure={(e) => console.log("faulure", e)}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <div className="mt-3 text-xs text-center dark:text-gray-800">
                  {t("ifconsultanttry")}{" "}
                  <a
                    target="_blank"
                    href="https://dashboard.consultida.com/consultant/login"
                    className="text-pink-900 hover:text-pink-800"
                    rel="noreferrer"
                  >
                    {t("consultantlogin")}
                  </a>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
