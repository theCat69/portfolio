import { component$ } from "@builder.io/qwik";
import { skills } from "~/constants";
import SkillCard from "./skills/skill-card";

export default component$(() => {
  return (
    <>
      <section id="my-skills" class="w-full min-h-screen bg-middle">
        <div class="min-h-screen flex flex-col justify-evenly gap-4">
          <div class="flex flex-row justify-center">
            <h1 class="text-4xl text-bold text-primary">My skills</h1>
          </div>
          <div class="w-full h-full flex justify-center items-center">
            <div class="w-full h-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-flow-row auto-rows-auto md:gap-8 gap-4 justify-evenly items-center xl:px-48 lg:px-16 md:px-8 sm:px-4 px-0">
              {skills.map((skill) => (
                <div key={skill.id} class="min-h-full flex">
                  <SkillCard
                    {...skill}
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
