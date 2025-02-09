import {beforeEach, describe, expect, test} from "@jest/globals";
import {app} from "../index.ts";
import {reset} from "drizzle-seed";
import {db} from "../db/index.ts";
import {heros} from "./schema.ts";
import {runMigration} from "../db/migrate.ts";

beforeEach(async () => {
  // @ts-ignore
  await reset(db, {heros})
  await runMigration()
})

describe('superhero', () => {
  test('should GET all heroes', async () => {
    const res = await app.request('/superheroes')

    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual([])
  })

  test('should add a hero', async () => {
    const testHero = {
      name: "test",
      superpowers: "testing",
      humilityScore: 1
    }

    const res = await app.request('/superheroes', {
      method: "POST",
      body: JSON.stringify(testHero),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    expect(res.status).toBe(200)
    expect(await res.json()).toMatchObject(testHero)
  })

  test('should return validation errors', async () => {
    const res1 = await app.request('/superheroes', {
      method: "POST",
      body: JSON.stringify({}),
      headers: new Headers({'Content-Type': 'application/json'}),
    })

    expect(res1.status).toBe(406)
    expect(await res1.json()).toEqual({
      "humilityScore": ["Required"],
      "name": ["Required"],
      "superpowers": ["Required"]
    })

    const res2 = await app.request('/superheroes', {
      method: "POST",
      body: JSON.stringify({
        humilityScore: 1
      }),
      headers: new Headers({'Content-Type': 'application/json'}),
    })

    expect(res2.status).toBe(406)
    expect(await res2.json()).toEqual({
      "name": ["Required"],
      "superpowers": ["Required"]
    })

    const res3 = await app.request('/superheroes', {
      method: "POST",
      body: JSON.stringify({
        humilityScore: 1,
        name: "test"
      }),
      headers: new Headers({'Content-Type': 'application/json'}),
    })

    expect(res3.status).toBe(406)
    expect(await res3.json()).toEqual({
      "superpowers": ["Required"]
    })

    const res4 = await app.request('/superheroes', {
      method: "POST",
      body: JSON.stringify({
        humilityScore: 1,
        superpowers: "testing"
      }),
      headers: new Headers({'Content-Type': 'application/json'}),
    })

    expect(res4.status).toBe(406)
    expect(await res4.json()).toEqual({
      "name": ["Required"]
    })
  })

  test('should give error messages', async () => {
    const testHero = {
      name: "t",
      superpowers: "t",
      humilityScore: 0
    }

    const res = await app.request('/superheroes', {
      method: "POST",
      body: JSON.stringify(testHero),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    expect(res.status).toBe(406)
    expect(await res.json()).toEqual({
        "humilityScore": ["Number must be greater than or equal to 1",],
         "name": ["String must contain at least 2 character(s)",],
         "superpowers": ["String must contain at least 2 character(s)",]
    })
  })
})
