import { Hello } from "./hello.js";

customElements.define("m-hello", Hello);

const body = document.querySelector("body");
if (body === null) throw new Error("body is null");

const hello = new Hello({ content: "Hello" });

body.appendChild(hello);
