import { createDOM } from "@builder.io/qwik/testing";
import { test, expect } from "vitest";
import { config } from "./speak-config";
import { translationFn } from "./speak-functions";
import { QwikSpeakMockProvider } from "qwik-speak";
import Index from "./routes/[...lang]";

test("[App Test]: Application should render", async () => {
  const { screen, render } = await createDOM();
  await render(
    <QwikSpeakMockProvider config={config} translationFn={translationFn} locale={config.defaultLocale}>
      <Index />
    </QwikSpeakMockProvider>
  );
  expect(screen.innerHTML).toContain("Web");
});
