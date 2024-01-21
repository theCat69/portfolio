import { type QRL, component$, createContextId, useContextProvider, useStore, $ } from "@builder.io/qwik";
import type { DocumentHead, StaticGenerateHandler } from "@builder.io/qwik-city";
import type { NotificationProps } from "~/components/notifications/notification";
import Notifications, { type NotificationsStore } from "~/components/notifications/notifications";
import AboutMe from "~/components/section/about-me";
import Contact from "~/components/section/contact";
import DemoProjects from "~/components/section/demo-projects";
import Footer from "~/components/section/footer";
import Hero from "~/components/section/hero";
import Nav from "~/components/section/nav";
import Skills from "~/components/section/skills";
import { config } from '../../speak-config';
import ChangeLocal from "~/components/change-local/change-local";

export const NotificationContext = createContextId<NotificationsStore>(
  'docs.notification-context'
);
export const NotificationAddMethodContext = createContextId<QRL<(notification: NotificationProps, store: NotificationsStore) => void>>(
  'docs.notification-add-method-context'
);

export default component$(() => {

  const addNotification = $((notification: NotificationProps, store: NotificationsStore) => {
    notification.id = Math.floor(Math.random() * 1000000000001);
    store.store.push(notification);
  });

  useContextProvider(NotificationContext, useStore<NotificationsStore>({ store: [] }))
  useContextProvider(NotificationAddMethodContext, addNotification);

  return (
    <>
      <main class="relative overflow-x-hidden">
        <Nav />
        <Hero />
        <Skills />
        <DemoProjects />
        <AboutMe />
        <Contact />
        <Footer />
        <Notifications />
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

/**
 * Dynamic SSG route
 */
export const onStaticGenerate: StaticGenerateHandler = () => {
  return {
    params: config.supportedLocales.map(locale => {
      return { lang: locale.lang };
    })
  };
};
