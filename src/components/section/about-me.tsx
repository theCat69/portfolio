import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

export default component$(() => {

  const t = inlineTranslate();

  return (
    <>
      <section id="about-me" class="w-full flex justify-center min-h-screen bg-middle">
        <div class="h-min-screen flex flex-col text-center items-center justify-center gap-8 px-16 py-8">
          <h1 class="text-4xl text-white font-salsa">{t('app.aboutme')}</h1>
          <div class="flex flex-col text-center items-center justify-center gap-4">
            <p class="text-white text-xl lg:text-2xl font-baskerville">{t('aboutme.text')}</p>
            <p class="text-white text-xl lg:text-2xl font-baskerville">{t('aboutme.para2')}</p>
            <p class="text-white text-xl lg:text-2xl font-baskerville">{t('aboutme.para3')}</p>
            <p class="text-white text-xl lg:text-2xl font-baskerville">{t('aboutme.para4')}</p>
          </div>
        </div>
      </section>
    </>
  )
})
