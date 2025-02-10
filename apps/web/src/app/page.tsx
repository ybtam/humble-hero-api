import {Suspense} from "react";
import Link from "next/link";
import {redirect} from "next/navigation";

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

  if (!res.ok) {
    return <div>Error fetching data</div>
  }

  const data = await res.json() as { id: number; name: string; superpowers: string; humilityScore: number }[]

  return <div className={'flex flex-col gap-4 items-center justify-center'}>
    {data.length === 0 && (
      <form action={async () => {
        "use server"

        await fetch(`${process.env.API_URL}/superheroes/seed`, {
          method: 'POST',
        })

        redirect('/') //alternative to reloading the page
      }}>
        <button className={'bg-gray-500 py-3 px-5 rounded hover:bg-gray-700 transition-colors duration-75 active:bg-gray-900'} type={'submit'}>Seed data</button>
      </form>
    )}

    <table className={'table-auto border-collapse border border-gray-400'}>
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
  </div>
}
