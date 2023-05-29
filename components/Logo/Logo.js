import Link from "next/link";
import { useRouter } from "next/router";
import ImageLogo from "./Image";

export default function Logo({ color }) {
  const { query } = useRouter();

  return (
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
      <a className="text-primary text-lg font-bold cursor-pointer primary-hover">
        <ImageLogo color={color} />
      </a>
    </Link>
  );
}
