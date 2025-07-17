import { getLang, setLang } from "../store.js";
class AppHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this._highlight();
    window.addEventListener("popstate", () => this._highlight());
    window.addEventListener("lang-changed", () => this.render());
  }

  render() {
    const lang = getLang();
    const isTR = lang === "tr";
    this.innerHTML = `
      <header class="app-header">
        <div class="header-left">
          <img src="../../logo.png" alt="Logo" class="header-logo" />
          <span class="header-title"></span>
        </div>
        <div class="header-right">
          <a href="/employees" class="header-link">${
            isTR ? "Çalışanları Listele" : "List Employees"
          }</a>
          <a href="/employees/add" class="header-add">${
            isTR ? "+ Çalışan Ekle" : "+ Add Employee"
          }</a>
          <button class="header-flag" id="langBtn">${
            isTR ? "EN" : "TR"
          }</button>
        </div>
      </header>
      <style>
        .header-link, .header-add {
          text-decoration: none;
          color: #ff6101;
          font-weight: 500;
          margin-right: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: background 0.2s, color 0.2s;
        }
        .header-link.active, .header-add.active {
         color: #ff6200;
        }
        .header-add.active {
          box-shadow: 0 2px 8px rgba(255,98,0,0.10);
          color: #ff6200;
        }
      </style>
    `;
    this._highlight();
    this.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        window.history.pushState({}, "", a.getAttribute("href"));
        window.dispatchEvent(new Event("popstate"));
      });
    });
    this.querySelector("#langBtn").onclick = () => setLang(isTR ? "en" : "tr");
  }

  _highlight() {
    const path = window.location.pathname;
    this.querySelectorAll("a").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === path);
    });
  }
}

customElements.define("app-header", AppHeader);
