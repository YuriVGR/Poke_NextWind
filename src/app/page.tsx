
interface PokeDataProps {
  name: string;
  type: string;
  color: string;
  bgColor: string;
}

export default function Home({ name, type, color, bgColor }: PokeDataProps) {
  return (
    <main className="h-full w-screen flex flex-row p-12">
      <section className="flex flex-row h-full w-full rounded-lg overflow-hidden">
        <div className="bg-red-500 h-full w-3/5 flex items-center justify-center flex-col p-12">
          <h1 className="text-white text-4xl font-bold">Poke API</h1>
          <p className="text-white text-2xl">
            Encontre todos os seus pokémons favoritos aqui
          </p>
          
        </div>
        <div className="bg-blue-500 h-full w-full"></div>
      </section>
    </main>
  );
}
