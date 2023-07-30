export class Hello extends HTMLElement {
  constructor({ content }) {
    super();

    this.attachShadow({ mode: "open" });
    if (this.shadowRoot === null) throw new Error("this.shadowRoot is null");

    const div = document.createElement("div");

    const p = document.createElement("p");
    p.innerText = content;
    div.appendChild(p);

    const button = document.createElement("button");
    button.innerText = "Update Text";
    div.appendChild(button);

    this.shadowRoot.appendChild(div);

    button.onclick = () => {
      p.innerText = "Clicked";
    };
  }
}
