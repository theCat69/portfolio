import { component$ } from "@builder.io/qwik";
import type { Skill } from "~/constants";

export default component$((props: Skill) => {
  return (
    <>
      <div class="min-h-full flex flex-col bg-primary relative rounded-xl">
        <div class="flex flex-row justify-between absolute w-full py-2 px-2">
          {props.imgs.map((img, index) => (
            <img key={index} src={img} alt="icon" width={35} height={35} />
          ))}
        </div>
        <div class="flex flex-col gap-4 py-4">
          <div class="flex flex-row justify-center">
            <h1 class="text-2xl text-bold text-dark-1 px-5 font-salsa">{props.title}</h1>
          </div>
          <div class="flex flex-row justify-normal text-dark-2 md:px-8 px-2 font-baskerville">
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </>
  )
})
