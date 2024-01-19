import { component$ } from "@builder.io/qwik";
import DemoProjectCard from "./demo-projects/demo-project-card";
import { demoProjects } from "~/constants/demo";
import { inlineTranslate } from "qwik-speak";

export default component$(() => {

  const t = inlineTranslate();

  return (
    <>
      <section id="demo-projects" class="w-full min-h-screen bg-primary py-2">
        <div class="min-h-screen flex flex-col justify-evenly gap-4">
          <div class="flex flex-row justify-center">
            <h1 class="text-4xl text-bold text-dark-1 font-salsa">{t('app.demo')}</h1>
          </div>
          <div class="w-full h-full flex justify-center items-center">
            <div class="w-full h-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-flow-row auto-rows-auto md:gap-8 gap-4 justify-evenly items-center xl:px-48 lg:px-16 md:px-8 sm:px-4 px-0">
              {demoProjects().map((demoProject) => (
                <div key={demoProject.id} class="min-h-full flex">
                  <DemoProjectCard
                    {...demoProject}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  )
})
