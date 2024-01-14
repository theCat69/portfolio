import { component$, useContextProvider, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import AboutMe from "~/components/section/about-me";
import Contact from "~/components/section/contact";
import DemoProjects from "~/components/section/demo-projects";
import Footer from "~/components/section/footer";
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
        <DemoProjects />
        <AboutMe />
        <Contact />
        <Footer />
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Félix Vadcard Portfolio",
  meta: [
    {
      name: "description",
      content: "description",
    },
  ],
};
