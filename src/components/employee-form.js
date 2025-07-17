import { LitElement, html, css } from "lit";
import {
  addEmployee,
  updateEmployee,
  getEmployees,
  getLang,
} from "../store.js";

// Translation dictionary
const t = {
  en: {
    add: "Add",
    edit: "Edit",
    employee: "Employee",
    detailsBelow: "details below",
    firstName: "First Name",
    lastName: "Last Name",
    hireDate: "Date of Employment",
    dob: "Date of Birth",
    phone: "Phone",
    email: "Email",
    dept: "Department",
    position: "Position",
    select: "Select…",
    analytics: "Analytics",
    engineering: "Engineering",
    sales: "Sales",
    cancel: "Cancel",
    save: "Save",
    hr: "HR",
    support: "Support",
    marketing: "Marketing",
    finance: "Finance",
    it: "IT",
    junior: "Junior",
    medior: "Medior",
    senior: "Senior",
    manager: "Manager",
    specialist: "Specialist",
    lead: "Lead",
    executive: "Executive",
    director: "Director",
    sysadmin: "SysAdmin",
    agent: "Agent",
    coordinator: "Coordinator",
    intern: "Intern",
    analyst: "Analyst",
    developer: "Developer",
  },
  tr: {
    add: "Ekle",
    edit: "Düzenle",
    employee: "Çalışan",
    detailsBelow: "detayları aşağıda",
    firstName: "Adı",
    lastName: "Soyadı",
    hireDate: "İşe Giriş Tarihi",
    dob: "Doğum Tarihi",
    phone: "Telefon",
    email: "E-posta",
    dept: "Departman",
    position: "Pozisyon",
    select: "Seç…",
    analytics: "Analitik",
    engineering: "Mühendislik",
    sales: "Satış",
    cancel: "İptal",
    save: "Kaydet",
    hr: "İK",
    support: "Destek",
    marketing: "Pazarlama",
    finance: "Finans",
    it: "BT",
    junior: "Yeni",
    medior: "Orta",
    senior: "Kıdemli",
    manager: "Yönetici",
    specialist: "Uzman",
    lead: "Lider",
    executive: "Yönetici",
    director: "Direktör",
    sysadmin: "Sistem Yöneticisi",
    agent: "Temsilci",
    coordinator: "Koordinatör",
    intern: "Stajyer",
    analyst: "Analist",
    developer: "Geliştirici",
  },
};
function trKey(key) {
  const lang = getLang();
  return t[lang][key] || key;
}

export class EmployeeForm extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--spacing);
      font-family: var(--font-family);
      background: var(--color-bg);
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      margin-bottom: var(--spacing);
    }
    .header h1 {
      margin: 0;
      font-size: var(--font-size-h1);
      color: var(--color-text);
    }
    .header h2 {
      margin: 4px 0 0;
      font-size: var(--font-size-h2);
      color: var(--color-muted);
    }
    form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing);
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing);
    }
    label {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: var(--color-text);
    }
    input,
    select {
      margin-top: 4px;
      padding: 8px;
      font-size: 14px;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      background: #fff;
    }
    .footer {
      display: flex;
      justify-content: center;
      gap: var(--spacing);
      margin-top: var(--spacing);
    }
    button {
      padding: 8px 16px;
      font-size: 14px;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
    }
    button.cancel {
      background: var(--color-border);
      color: var(--color-text);
    }
    button.save {
      background: var(--color-primary);
      color: #fff;
    }
  `;

  static properties = {
    mode: { type: String }, // 'Add' or 'Edit'
    employee: { type: Object }, // existing data for Edit
  };

  constructor() {
    super();
    this.mode = "Add";
    this.employee = {};
    window.addEventListener("lang-changed", () => this.requestUpdate());
  }

  firstUpdated() {
    const path = window.location.pathname;
    const editMatch = path.match(/\/employees\/(\d+)\/edit/);
    if (editMatch) {
      this.mode = "Edit";
      const id = Number(editMatch[1]);
      const emp = getEmployees().find((e) => e.id === id);
      if (emp) this.employee = emp;
    }
  }

  render() {
    const lang = getLang();
    const isEdit = this.mode === "Edit";
    return html`
      <div class="header">
        <h1>${trKey(isEdit ? "edit" : "add")} ${trKey("employee")}</h1>
        <h2>${trKey(isEdit ? "edit" : "add")} ${trKey("detailsBelow")}</h2>
      </div>
      <form @submit="${this._onSave}">
        <div class="form-grid">
          <label>
            ${trKey("firstName")}
            <input
              name="firstName"
              .value="${this.employee.firstName || ""}"
              required
            />
          </label>
          <label>
            ${trKey("lastName")}
            <input
              name="lastName"
              .value="${this.employee.lastName || ""}"
              required
            />
          </label>
          <label>
            ${trKey("hireDate")}
            <input
              name="hireDate"
              type="date"
              .value="${this.employee.hireDate || ""}"
              required
            />
          </label>
          <label>
            ${trKey("dob")}
            <input
              name="dob"
              type="date"
              .value="${this.employee.dob || ""}"
              required
            />
          </label>
          <label>
            ${trKey("phone")}
            <input
              name="phone"
              type="tel"
              .value="${this.employee.phone || ""}"
            />
          </label>
          <label>
            ${trKey("email")}
            <input
              name="email"
              type="email"
              .value="${this.employee.email || ""}"
            />
          </label>
          <label>
            ${trKey("dept")}
            <select name="dept" required>
              <option value="" disabled>${trKey("select")}</option>
              <option
                value="analytics"
                ?selected=${this.employee.dept === "analytics"}
              >
                ${trKey("analytics")}
              </option>
              <option
                value="engineering"
                ?selected=${this.employee.dept === "engineering"}
              >
                ${trKey("engineering")}
              </option>
              <option value="sales" ?selected=${this.employee.dept === "sales"}>
                ${trKey("sales")}
              </option>
              <option value="hr" ?selected=${this.employee.dept === "hr"}>
                ${trKey("hr")}
              </option>
              <option
                value="support"
                ?selected=${this.employee.dept === "support"}
              >
                ${trKey("support")}
              </option>
              <option
                value="marketing"
                ?selected=${this.employee.dept === "marketing"}
              >
                ${trKey("marketing")}
              </option>
              <option
                value="finance"
                ?selected=${this.employee.dept === "finance"}
              >
                ${trKey("finance")}
              </option>
              <option value="it" ?selected=${this.employee.dept === "it"}>
                ${trKey("it")}
              </option>
            </select>
          </label>
          <label>
            ${trKey("position")}
            <select name="position" .value="${this.employee.position || ""}">
              <option value="" disabled>${trKey("select")}</option>
              <option>${trKey("junior")}</option>
              <option>${trKey("medior")}</option>
              <option>${trKey("senior")}</option>
              <option>${trKey("manager")}</option>
              <option>${trKey("specialist")}</option>
              <option>${trKey("lead")}</option>
              <option>${trKey("executive")}</option>
              <option>${trKey("director")}</option>
              <option>${trKey("sysadmin")}</option>
              <option>${trKey("agent")}</option>
              <option>${trKey("coordinator")}</option>
              <option>${trKey("intern")}</option>
              <option>${trKey("analyst")}</option>
              <option>${trKey("developer")}</option>
            </select>
          </label>
        </div>
        <div class="footer">
          <button type="button" class="cancel" @click="${this._onCancel}">
            ${trKey("cancel")}
          </button>
          <button type="submit" class="save">${trKey("save")}</button>
        </div>
      </form>
    `;
  }

  _onSave(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (this.mode === "Edit") {
      updateEmployee(this.employee.id, data);
    } else {
      addEmployee(data);
    }
    this.dispatchEvent(
      new CustomEvent("save-employee", {
        detail: { mode: this.mode, data },
        bubbles: true,
        composed: true,
      })
    );
    window.history.back();
  }

  _onCancel() {
    window.history.back();
  }
}

customElements.define("employee-form", EmployeeForm);
