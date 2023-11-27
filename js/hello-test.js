import { Hello } from "./hello.js";

const tag = "m-hello";
customElements.define(tag, Hello);

const body = document.querySelector("body");
if (body === null) throw new Error('document.querySelector("body") is null');

const header = document.createElement("header");
const h1 = document.createElement("h1");
h1.innerText = `Testing ${tag}`;
const status = document.createElement("p");
status.classList.add("status");
status.innerText = "In progress";

header.append(h1, status);

body.appendChild(header);

const main = document.createElement("main");
body.appendChild(main);

const setup = (name, constructorArgs) => {
  const div = document.createElement("div");
  div.classList.add("test");

  const header = document.createElement("header");
  const h2 = document.createElement("h2");
  h2.innerText = name;
  header.appendChild(h2);

  const section = document.createElement("section");
  const hello = new Hello(...constructorArgs);
  section.appendChild(hello);

  const footer = document.createElement("footer");

  div.append(header, section, footer);
  main.appendChild(div);

  return { hello, div, footer };
};

const shouldRenderHello = (hello) => {
  const content = "Hello";

  let hasContent;
  hello.shadowRoot.querySelectorAll("p").forEach((p) => {
    if (p.innerText !== content) return;
    hasContent = true;
  });

  if (!hasContent) throw new Error(`p with "${content}" not found`);
};

const shouldRenderGoodbye = (hello) => {
  const content = "Goodbye";

  let hasContent;
  hello.shadowRoot.querySelectorAll("p").forEach((p) => {
    if (p.innerText !== content) return;
    hasContent = true;
  });

  if (!hasContent) throw new Error(`p with "${content}" not found`);
};

const shouldUpdateTextOnClick = (hello) => {
  const button = hello.shadowRoot.querySelector("button");
  if (button === null)
    throw new Error(`hello.shadowRoot.querySelector("button") is null`);

  button.click();

  const content = "Clicked";
  let hasContent;
  hello.shadowRoot.querySelectorAll("p").forEach((p) => {
    if (p.innerText !== content) return;
    hasContent = true;
  });

  if (!hasContent) throw new Error(`p with "${content}" not found`);
};

try {
  [
    {
      name: 'Should Render "Hello"',
      fn: shouldRenderHello,
      constructorArgs: [{ content: "Hello" }],
    },
    {
      name: 'Should Render "Goodbye"',
      fn: shouldRenderGoodbye,
      constructorArgs: [{ content: "Goodby" }],
    },
    {
      name: 'Should update text to "Clicked" when button is clicked',
      fn: shouldUpdateTextOnClick,
      constructorArgs: [{ content: "Hello" }],
    },
  ].forEach((config) => {
    const { name, fn, constructorArgs } = config;
    const { hello, div, footer } = setup(name, constructorArgs);

    try {
      fn(hello);
    } catch (error) {
      div.classList.add("failed");
      footer.innerText = error.message;
      throw error;
    }

    div.classList.add("passed");
    footer.innerText = "Passed";
  });
} catch (error) {
  console.error("test failed");
  status.innerText = "Failed";
  status.classList.add("failed");
  throw error;
}

status.innerText = "Passed";
status.classList.add("passed");
