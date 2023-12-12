import { component$ } from "@builder.io/qwik";
import { navLinks } from "~/constants";
import { hamburger } from "~/media";

export default component$(() => {
  return (
    <>
      <header class="padding-x py-8 absolute z-10 w-full">
        <nav class="flex justify-between items-center max-container">
          <div></div>
          <ul class="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
            {navLinks.map((item) => (
              <li key={item.id}>
                <a href={item.href} class="leading-normal text-lg text-dark-2 opacity-80 hover:opacity-100 hover:drop-shadow-2xl">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div class="hidden max-lg:block">
            <img src={hamburger} alt="Hamburger" width={25} height={25} />
          </div>
        </nav>
      </header>
    </>
  )
})
