import { component$ } from "@builder.io/qwik";
import type { DemoProject } from "~/constants";
import { githubLogo } from "~/media";

export default component$((props: DemoProject) => {
  return (
    <>
      <div class="min-h-full flex flex-col bg-middle relative rounded-xl">
        <div class="flex flex-row justify-end absolute w-full py-2 px-2">
          {props.repo && (
            <a href={props.repo}>
              <img src={githubLogo} alt="icon" width={40} height={40} />
            </a>
          )}
        </div>
        <div class="flex flex-col gap-0 px-8 py-4">
          <div class="flex flex-row justify-center">
            <h1 class="text-2xl text-bold text-light-1 px-5">{props.title}</h1>
          </div>
          <div class="flex flex-row justify-normal text-xl text-light-1 md:px-8 lg:py-8 px-2 py-2">
            <p>{props.description}</p>
          </div>
          <div class="flex flex-row justify-center md:px-8 lg:py-8 px-2 py-2 container">
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
