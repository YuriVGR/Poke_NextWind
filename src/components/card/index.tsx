import Link from "next/link";

type CardProps = {
  name: string;
  type: string;
  color: string;
  bgSource: string;
};

export default function Card({ name, type, color, bgSource }: CardProps) {
  return (
    <Link href={`/pokemon/${name} `}>
      <div className={`bg-white rounded-lg p-4 bg-[${bgSource}]`}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
      </div>
    </Link>
  );
}
