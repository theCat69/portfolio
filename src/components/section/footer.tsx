import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

export default component$(() => {

  const t = inlineTranslate();

  return (
    <>
      <section class="bg-middle padding-x py-8 flex flex-row justify-center">
        <p class="font-baskerville text-white">Félix Vadvard - vadcard.felix@gmail.com - {t('footer.text@@Mentions légales - Conditions générales - Tous droits réservés ')}</p>
      </section>
    </>
  )
})
