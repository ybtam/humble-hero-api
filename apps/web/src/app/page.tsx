import {Suspense} from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className={'w-full h-svh flex flex-col items-center justify-center gap-4'}>
      <div>
        <Link href={'/hero/add'} className={'bg-gray-500 py-3 px-5 rounded hover:bg-gray-700 transition-colors duration-75 active:bg-gray-900'}>
          Add New Hero
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <HerosList/>
      </Suspense>
    </div>
  );
}

const HerosList = async () => {
  const res = await fetch(`${process.env.API_URL}/superheroes`)
  const data = await res.json() as { id: number; name: string; superpowers: string; humilityScore: number }[]

  return <table className={'table-auto border-collapse border border-gray-400'}>
    <thead>
      <tr>
        <th className={'border border-gray-300 px-4 py-2'}>ID</th>
        <th className={'border border-gray-300 px-4 py-2'}>Name</th>
        <th className={'border border-gray-300 px-4 py-2'}>Superpowers</th>
        <th className={'border border-gray-300 px-4 py-2'}>Humility Score</th>
      </tr>
    </thead>
    <tbody>
      {data.map(({ id, name, superpowers, humilityScore }) => (
        <tr key={id} className={'text-center hover:bg-gray-700'}>
          <td className={'border border-gray-300 px-4 py-2'}>{id}</td>
          <td className={'border border-gray-300 px-4 py-2'}>{name}</td>
          <td className={'border border-gray-300 px-4 py-2'}>{superpowers}</td>
          <td className={'border border-gray-300 px-4 py-2'}>{humilityScore}</td>
        </tr>
      ))}
    </tbody>
  </table>
}
