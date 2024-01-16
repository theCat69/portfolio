import type { NoSerialize } from "@builder.io/qwik";
import { component$, noSerialize, useSignal, useStore, $, useContext } from "@builder.io/qwik";
import { attachmentIcon, crossIcon } from "~/media";
import { ValiError, array, blob, email, maxSize, minLength, object, parse, string } from 'valibot';
import { NotificationAddMethodContext, NotificationContext } from "~/routes/[...lang]";
import { inlineTranslate } from "qwik-speak";
import type { NotificationProps } from "../notifications/notification";

interface ContactForm {
  name: string,
  email: string,
  message: string,
  files: NoSerialize<File>[] | null | undefined,
}

const contactSchema = () => {
  const t = inlineTranslate();

  return object({
    name: string([
      minLength(1, t('contact.validation.name.minlength@@Please enter your name.')),
    ]),
    email: string([
      minLength(1, t('contact.validation.email.minlength@@Please enter your email.')),
      email(t('contact.validation.email.format@@The email is not properly formatted.')),
    ]),
    message: string([
      minLength(1, t('contact.validation.message.minlength@@Please enter a message.')),
    ]),
    files: array(blob([
      maxSize(2000000, t('contact.validation.files.maxsize@@File max size is 2Mo'))
    ])),
  })
};


interface ContactFormError {
  field: string,
  message: string,
  key?: number,
}

interface FileDto {
  name: string,
  content: string
}

interface ContactFormDto {
  name: string,
  email: string,
  message: string,
  files: FileDto[],
}

function fileToBase64(file: File): Promise<FileDto> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const resultString = reader.result as string;
      const fileContentAsB64 = resultString.substring(resultString.indexOf(',') + 1, resultString.length - 1);
      resolve({
        name: file.name,
        content: fileContentAsB64
      });
    }
    reader.onerror = error => reject(error);
  });
}

const mailServiceURL: string = import.meta.env.VITE_MAIL_SENDER_URL;


const spliceAtName = (name: string, files: NoSerialize<File>[] | null | undefined): void => {
  if (files) {
    const indexToDelete = files.findIndex((file) => file?.name === name);
    if (indexToDelete > -1) {
      files.splice(indexToDelete, 1);
    }
  }
}

const cutFileNameIfTooLong = (fileName: string): string => {
  const maxLength = 20;
  const maxVisibleCharacters = 17;

  if (fileName.length > maxLength) {
    const extensionIndex = fileName.lastIndexOf('.');

    if (extensionIndex !== -1) {
      const extension = fileName.slice(extensionIndex);
      const fileNameWithoutExtension = fileName.slice(0, extensionIndex);

      if (fileNameWithoutExtension.length > maxVisibleCharacters) {
        const truncatedName = fileNameWithoutExtension.slice(0, maxVisibleCharacters) + '...';
        return truncatedName + extension;
      }
    }
  }

  return fileName;
}

const handleValidation = async (contactFormState: ContactForm): Promise<ContactFormError[]> => {
  try {
    parse(contactSchema(), contactFormState);
  } catch (e) {
    if (e instanceof ValiError) {
      return e.issues.map((issue) => {
        return {
          field: issue.path![0].key as string,
          message: issue.message,
          key: issue.path![1] ? issue.path![1].key as number : undefined,
        }
      });
    }
  }
  return [];
}

const successNotification = async (): Promise<NotificationProps> => {
  const t = inlineTranslate();
  return {
    level: "success",
    title: t('contact.notification.success.title@@Contact message'),
    message: t('contact.notification.success.message@@Contact message send with success'),
  }
};

const errorNotification = async (errorMessage: string): Promise<NotificationProps> => {
  const t = inlineTranslate();
  return {
    level: "error",
    title: t('contact.notification.error.message@@Error sending contact message'),
    message: errorMessage,
  }
}

const sendMailToService = async (contactValues: ContactFormDto) => {
  const reponse = await fetch(`${mailServiceURL}/mail`, {
    method: "POST",
    body: JSON.stringify(contactValues),
    headers: {
      "Content-Type": "application/json",
    }
  });
  if (!reponse.ok) {
    throw new Error(`${reponse.status} ${reponse.statusText}`);
  }
  return reponse.json();
};

export default component$(() => {

  const t = inlineTranslate();

  const contactFormState: ContactForm = useStore({ name: '', email: '', message: '', files: [] });
  const contactFormErrorState = useSignal<ContactFormError[]>([]);
  const notificationStore = useContext(NotificationContext);
  const addNotification = useContext(NotificationAddMethodContext);

  const getErrorForField = (key: keyof ContactForm) => contactFormErrorState.value.filter(fieldError => fieldError.field === key);

  const displayError = (key: keyof ContactForm) => {
    const errorField = getErrorForField(key);
    if (errorField.length >= 0) {
      return (
        <div class="font-baskerville text-red-600">
          {getErrorForField(key)[0]?.message}
        </div>
      )
    }
  }


  const handleSubmit = $(async (contactFormState: ContactForm) => {
    try {
      const files = contactFormState.files?.map(async (file) => await fileToBase64(file as File));
      await sendMailToService(
        {
          name: contactFormState.name,
          email: contactFormState.email,
          message: contactFormState.message,
          files: files ? await Promise.all(files) : [],
        }
      );
      addNotification(await successNotification(), notificationStore);
      contactFormState.name = '';
      contactFormState.email = '';
      contactFormState.message = '';
      contactFormState.files = [];
    } catch (error) {
      if (error instanceof Error) {
        addNotification(await errorNotification(error.message), notificationStore);
      } else {
        throw error;
      }
    }
  });


  return (
    <>
      <section id="contact-me" class="w-full flex flex-col justify-center min-h-screen bg-primary py-2">
        <div class="h-min-screen flex flex-col text-center items-center justify-center lg:gap-8 gap-4">
          <h1 class="text-4xl text-dark-1 font-salsa">{t('app.contactme')}</h1>
          <form preventdefault:submit onSubmit$={async () => {
            contactFormErrorState.value = await handleValidation(contactFormState);
            if (contactFormErrorState.value.length === 0) {
              handleSubmit(contactFormState);
            }
          }}
            class="grid grid-cols-1 justify-items-center gap-4 bg-middle px-5 py-5 xl:w-1/2 md:w-3/4 w-full rounded-xl my-5"
          >
            <div class="flex flex-row w-full gap-2">
              <div class="flex 2xl:flex-row flex-col w-full xl:gap-5 gap-2">
                <label class="flex flex-col gap-2 items-start w-full">
                  <span class="text-white text-xl font-baskerville">{t('contact.yourname@@Your name')}</span>
                  <input
                    value={contactFormState.name}
                    type="text"
                    placeholder={t('contact.name@@Name')}
                    onInput$={(e) => contactFormState.name = (e.target as HTMLInputElement).value}
                    class="rounded w-64 p-2"
                  />
                  {displayError("name")}
                </label>
                <label class="flex flex-col gap-2 items-start w-full">
                  <span class="text-white text-xl font-baskerville">{t('contact.youremail@@Your email')}</span>
                  <input
                    value={contactFormState.email}
                    type="text"
                    placeholder="example@mail.com"
                    onInput$={(e) => contactFormState.email = (e.target as HTMLInputElement).value}
                    class="rounded w-64 p-2"
                  />
                  {displayError("email")}
                </label>
              </div>
              <div class="flex flex-col items-end justify-start w-full gap-2">
                <label for="file-input" class="flex flex-col items-end justify-start w-full hover:cursor-pointer">
                  <img src={attachmentIcon} alt="attachmentIcon" width={30} height={30} class="mt-2 mr-2" />
                </label>
                <div >
                  {contactFormState.files && contactFormState.files.map((file) => (
                    <div key={file!.name} class="text-white text-xs flex flex-row justify-end items-center w-full gap-2">
                      {cutFileNameIfTooLong(file!.name)}
                      <img src={crossIcon} alt="remove" width={10} height={10} class="hover:cursor-pointer"
                        onClick$={() => {
                          spliceAtName(file!.name, contactFormState.files!);
                        }}
                      />
                    </div>
                  ))}
                  <div class="mt-2">
                    {displayError("files")}
                  </div>
                </div>
              </div>
              <input
                id="file-input"
                type="file"
                onInput$={(e) => {
                  const fileInput = (e.target as HTMLInputElement).files?.item(0);
                  if (fileInput) {
                    contactFormState.files?.push(noSerialize(fileInput))
                  }
                }}
                class="hidden"
              />
            </div>
            <label class="flex flex-col gap-2 items-start w-full">
              <span class="text-white text-xl font-baskerville">{t('contact.yourmessage@@Your message')}</span>
              <textarea
                value={contactFormState.message}
                placeholder={t('contact.yourmessageplaceholder@@Type your message here ...')}
                onInput$={(e) => contactFormState.message = (e.target as HTMLInputElement).value}
                class="rounded w-full h-64 p-2"
              ></textarea>
              {displayError("message")}
            </label>
            <button class="bg-light-1 text-dark-1 py-5 px-20 rounded-full hover:text-white hover:bg-light-2 hover:cursor-pointer active:bg-dark-1 mt-5 font-baskerville">{t('contact.send@@Send')}</button>
          </form>
        </div>
      </section>
    </>
  )
})
