import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom500() {
  const { query } = useRouter();

  return (
    <div
      className="
    flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-grayTilt
  "
    >
      <div className="px-40 py-20 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-primary text-9xl">500</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Something Went Wrong
          </h6>

          <Link
            href={{
              pathname: `/`,
              query: query.lang && {
                lang: query.lang,
              },
            }}
            locale="geo"
            passHref
          >
            <a
              href="#"
              className="px-6 py-2 text-sm font-semibold text-white bg-primary"
            >
              Go home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
