import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { navLinks } from "~/constants/app";
import styles from './nav.css?inline';

export default component$(() => {

  useStyles$(styles);

  const isHamburgerOpen = useSignal(false);
  const isHamburgerActivated = useSignal(false);
  const isSlidingVisible = useSignal(false);

  const isFold = () => isHamburgerActivated.value && isHamburgerOpen.value;
  const isUnfold = () => isHamburgerActivated.value && !isHamburgerOpen.value;

  const mapNavitems = () => {
    return navLinks().map((item) => (
      <li key={item.id}>
        <a href={item.href} class="leading-normal text-lg opacity-80 hover:opacity-100 hover:drop-shadow-2xl font-baskerville">
          {item.label}
        </a>
      </li>
    ));
  };

  return (
    <>
      <header class="padding-x py-8 absolute z-10 w-full">
        <nav class="flex justify-between items-center max-lg:hidden">
          <div></div>
          <ul class="flex-1 flex justify-center items-center gap-16 text-dark-2">
            {mapNavitems()}
          </ul>
        </nav>
        <div class="flex justify-end">
          <div class="flex flex-col justify-start items-end">
            <div class="hidden max-lg:block opacity-80 hover:opacity-100">
              <svg width="54" height="44" viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="hover:cursor-pointer w-6 h-6"
                onClick$={() => {
                  if (!isSlidingVisible.value) {
                    isSlidingVisible.value = true;
                  } else {
                    setTimeout(() => isSlidingVisible.value = false, 600);
                  }
                  isHamburgerOpen.value = !isHamburgerOpen.value;
                  isHamburgerActivated.value = true;
                }}>
                <path d="M2 42H52" stroke="black" stroke-width="4" stroke-linecap="round"
                  class={{
                    'psc-menu-top-unfold': isUnfold(),
                    'psc-menu-top-fold': isFold()
                  }}
                />
                <path d="M2 22H52" stroke="black" stroke-width="4" stroke-linecap="round"
                  class={{
                    'psc-menu-middle-unfold': isUnfold(),
                    'psc-menu-middle-fold': isFold()
                  }}
                />
                <path d="M2 2H52" stroke="black" stroke-width="4" stroke-linecap="round"
                  class={{
                    'psc-menu-bottom-unfold': isUnfold(),
                    'psc-menu-bottom-fold': isFold()
                  }}
                />
              </svg>
            </div>
            {isSlidingVisible.value && (
              <nav class={["flex flex-col justify-between items-center bg-dark-1 p-4 rounded-xl -padding-x absolute top-20 right-0",
                {
                  'psc-sliding-menu-unfold': isUnfold(),
                  'psc-sliding-menu-fold': isFold()
                }
              ]}>
                <ul class="flex-1 flex justify-center flex-col items-center gap-16 text-white">
                  {mapNavitems()}
                </ul>
              </nav>
            )}
          </div>
        </div >
      </header >
    </>
  )
})
