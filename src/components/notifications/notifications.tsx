import { component$, $, useContext } from "@builder.io/qwik";
import Notification, { NotificationProps } from "./notification";
import { NotificationContext } from "~/routes";

export interface NotificationsStore {
  store: NotificationProps[],
}

export const filterInPlace = (a: NotificationProps[], id: number) => {
  let i = 0, j = 0;

  while (i < a.length) {
    const val = a[i];
    if (val.id === id) a[j++] = val;
    i++;
  }

  a.length = j;
}

export default component$(() => {

  const storeContext = useContext(NotificationContext);

  const closeNotification = $((notif: NotificationProps) => deleteFromStore(notif.id));

  const deleteFromStore = $((id: number | undefined) => {
    if (id) filterInPlace(storeContext.store, id);
  });

  return (
    <>
      <div class="fixed bottom-0 flex flex-col justify-center gap-2 w-full">
        {storeContext.store.map((notif) => (
          <div key={notif.id}>
            <Notification
              level={notif.level}
              title={notif.title}
              message={notif.message}
              id={notif.id}
              closeCallback={closeNotification}
            />
          </div>
        ))}
      </div>
    </>

  )
})
