import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { config } from "~/speak-config";
import { findLanguageSupported } from "./plugin";

export default component$(() => {

  // maybe i can do this another way, a better way i mean
  // this will basically redirect to the correct locale version of the website
  // depending on browser preferences
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    let guessLocal: string | undefined;

    if (navigator.languages.length > 0) {
      guessLocal = findLanguageSupported(navigator.languages);
    } else if ((navigator.language || navigator.language[0])) {
      guessLocal = findLanguageSupported([(navigator.language || navigator.language[0])]);
    } else {
      guessLocal = config.defaultLocale.lang;
    }

    window.location.assign(guessLocal!);
  });

  return (
    <>

    </>
  )
})

export const head: DocumentHead = {
  title: "Félix Vadcard Portfolio",
  meta: [
    {
      name: "description",
      content: "description",
    },
  ],
};

