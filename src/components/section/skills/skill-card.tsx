import { component$ } from "@builder.io/qwik";
import { Skill } from "~/constants";

export default component$((props: Skill) => {
  return (
    <>
      <div class="flex flex-col bg-light-1 relative rounded-xl">
        <div class="flex flex-row justify-between absolute w-full py-2 px-4">
          {props.imgs.map((img, index) => (
            <img key={index} src={img} alt="icon" width={40} height={40} />
          ))}
        </div>
        <div class="flex flex-col gap-4 px-8 py-4">
          <div class="flex flex-row justify-center">
            <h1 class="text-2xl text-bold">{props.title}</h1>
          </div>
          <div class="flex flex-row justify-normal">
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </>
  )
})
