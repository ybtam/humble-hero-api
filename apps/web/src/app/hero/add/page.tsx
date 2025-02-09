'use client'

import {useActionState} from "react";
import {addHero} from "@/app/hero/add/action";

export default function Page() {
  const [state, submitAction, isPending] = useActionState(addHero, null, '/')

  return (
    <div className={'flex w-full flex-col gap-4 p-4'}>
      <h1 className={'text-2xl'}>Add New Hero</h1>
      <form className={'flex flex-col gap-4'} action={submitAction}>
        <Input label={'Name'} name={'name'} type={'text'} placeholder={'Enter name'} defaultValue={state?.inputs?.name} error={state?.errors?.name}/>
        <Input label={'Superpowers'} name={'superpowers'} type={'text'} placeholder={'Enter superpowers'} defaultValue={state?.inputs?.superpowers} error={state?.errors?.superpowers}/>
        <Input label={'Humility Score'} name={'humilityScore'} type={'number'} placeholder={'Enter humility score'} defaultValue={state?.inputs?.humilityScore.toString()} error={state?.errors?.humilityScore}/>
        <button disabled={isPending} className={'bg-gray-500 py-3 px-5 rounded hover:bg-gray-700 transition-colors duration-75 active:bg-gray-900 disabled:bg-gray-400'}>Add</button>
      </form>
    </div>
  )
}

type InputProps = {
  label: string
  name: string
  type: string
  placeholder?: string
  required?: boolean
  error?: string
  defaultValue?: string
}

const Input = ({ label, required=false, error, ...inputProps }: InputProps) => {
  return (
    <div className={'flex flex-col gap-1 data-[error=true]:text-red-500'} data-error={!!error}>
      <label htmlFor={inputProps.name} className={'text-sm'}>{label}</label>
      <input id={inputProps.name} className={'border border-gray-300 px-3 py-2 rounded text-black placeholder-black'} {...inputProps}/>
      {error && <p className={'text-red-500'}>{error}</p>}
    </div>
  )
}
