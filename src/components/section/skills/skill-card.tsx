import { component$ } from "@builder.io/qwik";
import { Skill } from "~/constants";

export default component$((props: Skill) => {
  return (
    <>
      <div key={props.id} class="min-h-full flex flex-col bg-primary relative rounded-xl">
        <div class="flex flex-row justify-between absolute w-full py-2 px-4">
          {props.imgs.map((img, index) => (
            <img key={index} src={img} alt="icon" width={40} height={40} />
          ))}
        </div>
        <div class="flex flex-col gap-4 px-8 py-4">
          <div class="flex flex-row justify-center">
            <h1 class="text-2xl text-bold text-dark-1">{props.title}</h1>
          </div>
          <div class="flex flex-row justify-normal text-xl text-dark-2 md:px-8 lg:py-8 px-2 py-2">
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </>
  )
})
