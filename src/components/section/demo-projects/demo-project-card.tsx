import { component$ } from "@builder.io/qwik";
import type { DemoProject } from "~/constants/demo";
import { githubLogo } from "~/media";

export default component$((props: DemoProject) => {
  return (
    <>
      <div class="min-h-full flex flex-col bg-middle relative rounded-xl">
        <div class="flex flex-row justify-end absolute w-full py-2 px-2">
          {props.repo && (
            <a href={props.repo}>
              <img src={githubLogo} alt="icon" width={30} height={30} />
            </a>
          )}
        </div>
        <div class="flex flex-col gap-4 py-4">
          <div class="flex flex-row justify-center">
            <h1 class="text-2xl text-white text-bold px-10 font-salsa">{props.title}</h1>
          </div>
          <div class="flex flex-row justify-normal md:px-8 px-2">
            <p class="text-white font-baskerville">{props.description}</p>
          </div>
          <div class="flex flex-row justify-center md:px-8 px-2 container">
            {props.preview && (
              <a href={props.preview.link}>
                <img src={props.preview.img} alt="no preview" width={500} height={300}
                  class="object-cover"
                />
              </a>
            )}
          </div>
        </div>
      </div>

    </>
  )
})
