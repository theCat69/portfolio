import { QRL, component$, useSignal, useStyles$, useTask$, $ } from "@builder.io/qwik";
import styles from "./notification.css?inline";
import { crossIcon } from "~/media";

export interface NotificationProps {
  level: "success" | "error",
  title: string,
  message: string,
  closeCallback?: QRL<() => void>,
}

export default component$((notif: NotificationProps) => {

  useStyles$(styles);
  const visible = useSignal(true);
  const opened = useSignal(true);

  const closeNotif = $(() => {
    opened.value = false;
    setTimeout(() => {
      visible.value = false;
      if (notif.closeCallback) {
        notif.closeCallback();
      }
    }, 1000);
  });

  useTask$(() => {
    setTimeout(() => closeNotif, 4000);
  })

  return (
    <>
      {
        visible.value && (
          <div class="w-full flex flex-row justify-center fixed bottom-0">
            <div class={["flex flex-col items-center z-10 rounded-xl py-4 px-20 gap-2 relative",
              {
                "bg-red-400": notif.level === "error",
                "bg-green-400": notif.level === "success",
                "psc-notification-unfold": opened.value,
                "psc-notification-fold": !opened.value,
              }
            ]}>
              <div class="flex flex-row justify-self-end py-2 px-2 z-20 absolute right-0 top-0"
                onClick$={closeNotif}
              >
                <img src={crossIcon} alt="icon" width={15} height={15} />
              </div>
              <h3 class="text-white font-baskerville text-xl">{notif.title}</h3>
              <p class="text-white font-baskerville">{notif.message}</p>
            </div>
          </div>
        )
      }
    </>
  )
})
