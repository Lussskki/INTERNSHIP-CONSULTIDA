import Image from "next/image";

export default function LoggedInUser({ user }) {
  return (
    <div className="overflow-hidden">
      <Image width={48} height={48} alt={user.name} src={user.image} />
    </div>
  );
}
