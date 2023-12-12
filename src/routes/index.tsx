import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Hero from "~/components/section/hero";
import Nav from "~/components/section/nav";
import Skills from "~/components/section/skills";

export default component$(() => {
  return (
    <>
      <main class="relative">
        <Nav />
        <Hero />
        <Skills />
        <section class="padding w-full">
          Demo projects
        </section>
        <section class="padding w-full">
          A propos de moi
        </section>
        <section class="padding sm:py-32 py-16 w-full">
          Contact me
        </section>
        <section class="bg-middle padding-x padding-t pb-8">
          Footer
        </section>
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
