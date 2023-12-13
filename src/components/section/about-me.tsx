import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <section id="about-me" class="w-full flex justify-center min-h-screen bg-middle">
        <div class="h-min-screen flex flex-row text-center items-center justify-center">
          <h1 class="text-4xl text-white">About me</h1>
        </div>
      </section>
    </>
  )
})
