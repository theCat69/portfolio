import { NoSerialize, component$, noSerialize, useStore } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { attachmentIcon, crossIcon } from "~/media";

interface ContactForm {
  name: string,
  email: string,
  message: string,
  files: NoSerialize<File>[] | null | undefined,
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

const sendMailToService = server$(async (contactValues: ContactFormDto) => {
  const reponse = await fetch(`${mailServiceURL}/mail`, {
    method: "POST",
    body: JSON.stringify(contactValues),
    headers: {
      "Content-Type": "application/json",
    }
  });
  return reponse.json();
});

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

export default component$(() => {

  const contactFormState: ContactForm = useStore({ name: '', email: '', message: '', files: [] });

  return (
    <>
      <section id="contact-me" class="w-full flex flex-col justify-center min-h-screen bg-primary">
        <div class="h-min-screen flex flex-col text-center items-center justify-center gap-16">
          <h1 class="text-4xl text-dark-1">Contact me</h1>
          <form preventdefault:submit onSubmit$={async () => {
            const files = contactFormState.files?.map(async (file) => await fileToBase64(file as File));
            await sendMailToService(
              {
                name: contactFormState.name,
                email: contactFormState.email,
                message: contactFormState.message,
                files: files ? await Promise.all(files) : [],
              }
            );
            contactFormState.name = '';
            contactFormState.email = '';
            contactFormState.message = '';
            contactFormState.files = [];
          }}
            class="grid grid-cols-1 justify-items-center gap-4 bg-dark-1 px-5 py-5 xl:w-1/2 md:w-3/4 w-full rounded-xl my-5"
          >
            <div class="flex flex-row w-full gap-2">
              <div class="flex 2xl:flex-row flex-col w-full xl:gap-5 gap-2">
                <label class="flex flex-col gap-2 items-start w-full">
                  <span class="text-light-1 text-xl">Your name</span>
                  <input
                    value={contactFormState.name}
                    type="text"
                    placeholder="Name"
                    onInput$={(e) => contactFormState.name = (e.target as HTMLInputElement).value}
                    class="rounded w-64 p-2"
                  />
                </label>
                <label class="flex flex-col gap-2 items-start w-full">
                  <span class="text-light-1 text-xl">Your email</span>
                  <input
                    value={contactFormState.email}
                    type="text"
                    placeholder="example@mail.com"
                    onInput$={(e) => contactFormState.email = (e.target as HTMLInputElement).value}
                    class="rounded w-64 p-2"
                  />
                </label>
              </div>
              <div class="flex flex-col items-end justify-start w-full gap-2">
                <label for="file-input" class="flex flex-col items-end justify-start w-full hover:cursor-pointer">
                  <img src={attachmentIcon} alt="attachmentIcon" width={30} height={30} class="mt-2 mr-2" />
                </label>
                <div >
                  {contactFormState.files && contactFormState.files.map((file) => (
                    <div key={file!.name} class="text-light-1 text-xs flex flex-row justify-end items-center w-full gap-2">
                      {cutFileNameIfTooLong(file!.name)}
                      <img src={crossIcon} alt="remove" width={10} height={10} class="hover:cursor-pointer"
                        onClick$={() => {
                          spliceAtName(file!.name, contactFormState.files!);
                        }}
                      />
                    </div>
                  ))}
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
              <span class="text-light-1 text-xl">Your message</span>
              <textarea
                value={contactFormState.message}
                placeholder="Type your message here ..."
                onInput$={(e) => contactFormState.message = (e.target as HTMLInputElement).value}
                class="rounded w-full h-64 p-2"
              ></textarea>
            </label>
            <button class="bg-light-1 text-dark-1 py-5 px-20 rounded-full hover:text-white hover:bg-light-2 hover:cursor-pointer mt-5">Send</button>
          </form>
        </div>
      </section>
    </>
  )
})
