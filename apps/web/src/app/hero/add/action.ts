"use server"

import {redirect} from "next/navigation";

export const addHero = async (state: unknown, formData: FormData) => {

  const rawData = {
    name: formData.get('name') as string,
    superpowers: formData.get('superpowers') as string,
    humilityScore: parseInt(formData.get('humilityScore') as string)
  }

  const res = await fetch(`${process.env.API_URL}/superheroes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rawData)
  })

  if (!res.ok) {
    return {
      inputs: rawData,
      errors: await res.json()
    }
  }

  redirect('/')
}
