import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { useSpeakContext } from "qwik-speak";
import { supportedLocals } from "~/speak-config";
import Cookies from "js-cookie";
import styles from './change-local.css?inline';

export default component$(() => {

  useStyles$(styles);

  const currentLocal = useSpeakContext().locale;
  const currentFlag = supportedLocals.find((supLocal) => supLocal.lang === currentLocal.lang)!.flag;
  const availableLang = supportedLocals.filter((supLocal) => supLocal.lang !== currentLocal.lang);

  const showAvailable = useSignal(false);
  const activited = useSignal(false);
  const unfold = () => showAvailable.value && activited.value;
  const fold = () => !showAvailable.value && activited.value;

  return (
    <>
      <div class="flex flex-row justify-center">
        <div class="flex flex-col justify-center">
          <img src={currentFlag} alt="" width={40} height={40}
            class="hover:cursor-pointer z-10 opacity-90 hover:opacity-100"
            onClick$={() => {
              showAvailable.value = !showAvailable.value;
              activited.value = true;
            }}
          />
          {availableLang.map((avLang, index) => {
            const num = index + 1;
            return (
              <img key={avLang.lang} src={avLang.flag} alt="" width={40} height={40}
                class={[`hover:cursor-pointer hidden-flag opacity-90 hover:opacity-100`,
                  unfold() ? `psc-flag-${num}-unfold` : '',
                  fold() ? `psc-flag-${num}-fold` : '',
                ]}
                onClick$={() => {
                  Cookies.set("lang", avLang.lang);
                  location.reload();
                }}
              />
            )
          })}
        </div>
      </div>
    </>
  )
})
