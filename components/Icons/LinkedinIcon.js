export default function LinkedinIcon({ route }) {
  return (
    <a
      href={route}
      target="_blank"
      className="text-primary text-lg font-bold cursor-pointer primary-hover"
      rel="noreferrer"
    >
      <svg
        width="25"
        height="25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.5 0C19.399 0 25 5.601 25 12.5S19.399 25 12.5 25 0 19.399 0 12.5 5.601 0 12.5 0ZM8.592 19.525V9.763H5.347v9.762h3.245Zm11.7 0v-5.598c0-2.998-1.6-4.393-3.736-4.393-1.721 0-2.492.946-2.924 1.611V9.763h-3.244c.043.916 0 9.762 0 9.762h3.244v-5.452c0-.292.021-.583.107-.792.234-.583.768-1.186 1.665-1.186 1.173 0 1.643.895 1.643 2.207v5.223h3.245ZM6.992 5.056c-1.111 0-1.837.73-1.837 1.687 0 .937.704 1.687 1.793 1.687h.021c1.132 0 1.836-.75 1.836-1.687-.02-.957-.704-1.687-1.814-1.687Z"
          fill="#8789BF"
        />
      </svg>
    </a>
  );
}
