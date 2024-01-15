import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <section id="about-me" class="w-full flex justify-center min-h-screen bg-middle">
        <div class="h-min-screen flex flex-col text-center items-center justify-center gap-8 px-16 py-8">
          <h1 class="text-4xl text-white font-salsa">About me</h1>
          <p class="text-white text-xl lg:text-2xl font-baskerville">Born in Cannes in 1988. I grew up between the mountains and the sea. I played basketball for more than 10 years and I am still a fan of the NBA. I learned guitar in my late teenage years and now I still play for myself (and my neighboors). I went to Nice university of science to study chemistery and I pursued my master in Lyon. After struggling to find my place in the chemistery industry I pursued a formation to be a full stack developer. At the end of the formation, I was recrueted by Cap Gemini, a famous tech consulting French compagny. After 3 years working on different Java project I was recrueted by Webhelp payment services to perform java development. Today, I am pursuing my own path as an independant full stack developer and I am looking forward for us working together.</p>
        </div>
      </section>
    </>
  )
})
