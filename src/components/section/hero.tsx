import { component$ } from "@builder.io/qwik";
import { omar } from "~/media";

export default component$(() => {
  return (
    <>
      <section id="home" class="w-full min-h-screen bg-primary flex xl:flex-row flex-col justify-evenly items-center sm:gap-10 gap-2 sm:px-16 px-2 pt-8 sm:pt-32 pb-6 sm:pb-24">
        <div class="sm:w-1/2 w-full h-full flex flex-col justify-center gap-4">
          <h1 class="text-8xl leading-none max-sm:text-[72px] max-sm:leading-[82px] font-bold text-dark-1">Félix VADCARD</h1>
          <div class="flex flex-row justify-end">
            <p class="text-middle w-4/5">Full stack <span class="font-bold text-dark-2">Web </span>developer. Specialize in<span class="font-bold text-dark-2"> Java</span>,<span class="font-bold text-dark-2"> Angular </span>and<span class="font-bold text-dark-2"> SQL Databases</span>. Unlock the cat power and skyrocket your web dreams. <span class="font-bold text-dark-2">Hire me </span>!</p>
          </div>
        </div>
        <div class="sm:w-1/2 w-full h-1/2 sm:h-full flex flex-col justify-center items-center">
          <div>
            <img src={omar} alt="omar" width={300} height={500} class="h-full w-full object-contain" />
          </div>
        </div>
      </section>
    </>
  )
})
