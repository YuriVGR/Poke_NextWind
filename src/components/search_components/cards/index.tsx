import Link from "next/link";

type CardProps = {
  name: string;
  image: string;
  id: number;
  type: string[];
  typeColor: string[];
};

export default function Card({ name, image, id, type, typeColor }: CardProps) {
  const formattedId = id.toString().padStart(4, "0");

  return (
    <Link
      href={`/pokemon/${name}`}
      className="border-1 group flex h-64 w-52 flex-col items-center rounded-md p-2 transition-all select-none"
    >
      <div className="flex size-40 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-slate-200 bg-contain bg-center">
        <img
          src={image}
          alt={name}
          className="size-36 transition-transform duration-300 ease-in-out"
        />
      </div>

      <div className="flex w-40 flex-col items-start justify-start gap-1 pl-2">
        <h1 className="text-xl font-semibold">{name}</h1>
        <p className="text-xs font-semibold text-slate-400 group-hover:text-slate-600">
          #{formattedId}
        </p>
      </div>
      <div className="mt-2 flex w-40 flex-row items-center justify-start gap-1 pl-2">
        {type.map((t, index) => (
          <div
            key={t}
            className={`${typeColor[index]} flex h-4 w-14 items-center justify-center rounded-sm text-center text-xs font-semibold leading-none text-white`}
          >
            <p>{t}</p>
          </div>
        ))}
      </div>
    </Link>
  );
}
