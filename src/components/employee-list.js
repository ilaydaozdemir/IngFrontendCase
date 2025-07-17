import { LitElement, html, css } from "lit";
import "./confirm-dialog.js";
import { getEmployees, deleteEmployee, getLang } from "../store.js";

// Translation dictionary
const t = {
  en: {
    employeeList: "Employee List",
    firstName: "First Name",
    lastName: "Last Name",
    hireDate: "Date of Employment",
    dob: "Date of Birth",
    phone: "Phone",
    email: "Email",
    dept: "Department",
    position: "Position",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    tableView: "Table view",
    gridView: "Grid view",
    next: "Next",
    prev: "Previous",
    areYouSure: "Are you sure?",
    deleteMsg: (emp) =>
      `Selected Employee record of ${emp.firstName} ${emp.lastName} will be deleted`,
  },
  tr: {
    employeeList: "Çalışan Listesi",
    firstName: "Adı",
    lastName: "Soyadı",
    hireDate: "İşe Giriş Tarihi",
    dob: "Doğum Tarihi",
    phone: "Telefon",
    email: "E-posta",
    dept: "Departman",
    position: "Pozisyon",
    actions: "İşlemler",
    edit: "Düzenle",
    delete: "Sil",
    tableView: "Tablo görünümü",
    gridView: "Karte görünümü",
    next: "Sonraki",
    prev: "Önceki",
    areYouSure: "Emin misiniz?",
    deleteMsg: (emp) =>
      `${emp.firstName} ${emp.lastName} çalışan kaydı silinecek`,
  },
};
function trKey(key, ...args) {
  const lang = getLang();
  const val = t[lang][key];
  return typeof val === "function" ? val(...args) : val;
}

export class EmployeeList extends LitElement {
  static styles = css`
    .view-toggle {
      display: flex;
      gap: 12px;
      /* position: absolute; */
      /* top: 32px; */
      /* right: 40px; */
      z-index: 2;
      margin-bottom: 24px;
      justify-content: flex-end;
    }
    .toggle-btn {
      background: #fff;
      border: 1.5px solid #eee;
      border-radius: 8px;
      padding: 8px 10px;
      cursor: pointer;
      transition: box-shadow 0.2s, border 0.2s;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      display: flex;
      align-items: center;
      opacity: 0.7;
    }
    .toggle-btn.active {
      border: 1.5px solid var(--color-primary);
      box-shadow: 0 2px 8px rgba(255, 98, 0, 0.08);
      opacity: 1;
    }
    .toggle-btn svg {
      width: 22px;
      height: 22px;
      fill: var(--color-primary);
    }
    .fade-in {
      animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.97);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 32px;
      margin-top: 24px;
    }
    .card {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
      padding: 32px 28px 24px 28px;
      display: flex;
      flex-direction: column;
      min-height: 260px;
      transition: box-shadow 0.2s;
    }
    .card:hover {
      box-shadow: 0 4px 16px rgba(255, 98, 0, 0.1);
    }
    .card-fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 32px;
      margin-bottom: 24px;
    }
    .field-label {
      color: #999;
      font-size: 14px;
      font-weight: 500;
    }
    .field-value {
      color: #222;
      font-size: 17px;
      font-weight: 400;
      margin-bottom: 8px;
    }
    .card-actions {
      display: flex;
      gap: 16px;
      margin-top: 8px;
      margin-top: auto;
    }
    .edit-btn {
      background: #3d348b;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 8px 22px;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .edit-btn svg {
      fill: #fff;
      width: 18px;
      height: 18px;
    }
    .edit-btn:hover {
      background: #2d256b;
    }
    .delete-btn {
      background: var(--color-primary);
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 8px 22px;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .delete-btn svg {
      fill: #fff;
      width: 18px;
      height: 18px;
    }
    .delete-btn:hover {
      background: #d94e00;
    }
    :host {
      display: block;
      padding: 32px 0;
      font-family: var(--font-family);
      background: #f7f7f7;
      min-height: 100vh;
    }
    .container {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
      padding: 32px 24px;
      margin: 0 auto;
      max-width: 95vw;
      width: 98%;
    }
    .header {
      margin-bottom: 32px;
    }
    .header h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
      color: var(--color-primary);
      font-weight: 700;
    }
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
    }
    th,
    td {
      text-align: left;
      padding: 18px 12px;
      font-size: 15px;
      color: var(--color-text);
    }
    th {
      color: var(--color-primary);
      font-weight: 600;
      background: #faf9f8;
      border-bottom: 2px solid #f0f0f0;
    }
    tr {
      border-bottom: 1px solid #f0f0f0;
    }
    td {
      background: #fff;
    }
    td.actions {
      display: flex;
      gap: 16px;
      align-items: center;
    }
    .action-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
    }
    .action-btn svg {
      width: 20px;
      height: 20px;
      fill: var(--color-primary);
      transition: fill 0.2s;
    }
    .action-btn:hover svg {
      fill: #d94e00;
    }
    .checkbox {
      accent-color: var(--color-primary);
      width: 18px;
      height: 18px;
    }
    @media (max-width: 900px) {
      .container {
        padding: 8px;
      }
      th,
      td {
        padding: 8px 4px;
        font-size: 13px;
      }
    }
  `;

  static properties = {
    employees: { type: Array },
    page: { type: Number },
    viewMode: { type: String },
    pageSize: { type: Number },
    selectedIds: { type: Object },
  };

  constructor() {
    super();
    this.page = 1;
    this.pageSize = 10;
    this.viewMode = "table";
    this._refreshEmployees();
    this.selectedIds = new Set();
    window.addEventListener("lang-changed", () => this.requestUpdate());
  }

  get totalPages() {
    return Math.ceil((this.employees?.length || 0) / this.pageSize);
  }

  get pagedEmployees() {
    const start = (this.page - 1) * this.pageSize;
    return (this.employees || []).slice(start, start + this.pageSize);
  }

  _refreshEmployees() {
    this.employees = getEmployees();
    // Eğer mevcut sayfa, toplam sayfa sayısını aşıyorsa son sayfaya çek
    if (this.page > this.totalPages) {
      this.page = this.totalPages || 1;
    }
  }

  firstUpdated() {
    this._confirmDlg = document.getElementById("confirmDlg");
    this.addEventListener("delete-employee", (e) => {
      const emp = e.detail;
      this._confirmDlg.open(trKey("areYouSure"), trKey("deleteMsg", emp));
      this._confirmDlg.addEventListener(
        "confirmed",
        () => {
          this._deleteEmployee(emp);
        },
        { once: true }
      );
    });
    window.addEventListener("popstate", () => this._refreshEmployees());
    this.addEventListener("save-employee", () => this._refreshEmployees());
  }

  renderPagination() {
    if (this.totalPages <= 1) return "";
    const pages = [];
    const maxPageButtons = 5;
    const lastPage = this.totalPages;
    if (lastPage <= maxPageButtons + 2) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      if (this.page <= maxPageButtons) {
        for (let i = 1; i <= maxPageButtons; i++) pages.push(i);
        pages.push("...");
        pages.push(lastPage);
      } else if (this.page >= lastPage - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = lastPage - 4; i <= lastPage; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = this.page - 1; i <= this.page + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(lastPage);
      }
    }
    return html`
      <style>
        .pagination-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin: 32px 0 0 0;
          font-family: inherit;
          position: static;
        }
        .pagination-btn {
          background: none;
          border: none;
          color: #222;
          font-size: 18px;
          min-width: 36px;
          min-height: 36px;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .pagination-btn.active {
          background: #ff6200;
          color: #fff;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(255, 98, 0, 0.1);
        }
        .pagination-btn:disabled {
          color: #bbb;
          cursor: default;
        }
        .pagination-arrow {
          font-size: 22px;
          color: #ff6200;
          background: none;
          border: none;
          min-width: 36px;
          min-height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .pagination-arrow:disabled {
          color: #bbb;
          cursor: default;
        }
        .pagination-ellipsis {
          min-width: 36px;
          text-align: center;
          color: #bbb;
          font-size: 18px;
          user-select: none;
        }
        /* Pagination'ı container'ın en altına sabitle */
        .container {
          display: flex;
          flex-direction: column;
          min-height: 500px;
        }
        .content-area {
          flex: 1 1 auto;
        }
        .pagination-bar {
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .pagination-bar {
            margin-top: 16px;
          }
        }
      </style>
      <div class="pagination-bar">
        <button
          class="pagination-arrow"
          ?disabled=${this.page === 1}
          @click=${() => this._gotoPage(this.page - 1)}
          title="Önceki"
        >
          &#60;
        </button>
        ${pages.map((num) =>
          num === "..."
            ? html`<span class="pagination-ellipsis">...</span>`
            : html`<button
                class="pagination-btn${num === this.page ? " active" : ""}"
                @click=${() => this._gotoPage(num)}
                ?disabled=${num === this.page}
              >
                ${num}
              </button>`
        )}
        <button
          class="pagination-arrow"
          ?disabled=${this.page === this.totalPages}
          @click=${() => this._gotoPage(this.page + 1)}
          title="Sonraki"
        >
          &#62;
        </button>
      </div>
    `;
  }
  render() {
    return html`
      <div class="container">
        <div class="header">
          <h1>${trKey("employeeList")}</h1>
        </div>
        <div class="view-toggle">
          <button
            class="toggle-btn ${this.viewMode === "table" ? "active" : ""}"
            @click=${() => this._setView("table")}
            title="${trKey("tableView")}"
          >
            <svg viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="3" rx="1" />
              <rect x="3" y="9" width="18" height="4" rx="1" />
              <rect x="3" y="15" width="18" height="4" rx="1" />
            </svg>
          </button>
          <button
            class="toggle-btn ${this.viewMode === "grid" ? "active" : ""}"
            @click=${() => this._setView("grid")}
            title="${trKey("gridView")}"
          >
            <svg viewBox="0 0 24 24">
              <rect x="3" y="3" width="5" height="5" rx="1" />
              <rect x="10" y="3" width="5" height="5" rx="1" />
              <rect x="17" y="3" width="4" height="5" rx="1" />
              <rect x="3" y="10" width="5" height="5" rx="1" />
              <rect x="10" y="10" width="5" height="5" rx="1" />
              <rect x="17" y="10" width="4" height="5" rx="1" />
              <rect x="3" y="17" width="5" height="4" rx="1" />
              <rect x="10" y="17" width="5" height="4" rx="1" />
              <rect x="17" y="17" width="4" height="4" rx="1" />
            </svg>
          </button>
        </div>
        <div class="content-area">
          ${this.viewMode === "table"
            ? html`
                <div class="fade-in">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            class="checkbox"
                            .checked=${this._allSelected()}
                            @change=${this._toggleAll}
                          />
                        </th>
                        <th>${trKey("firstName")}</th>
                        <th>${trKey("lastName")}</th>
                        <th>${trKey("hireDate")}</th>
                        <th>${trKey("dob")}</th>
                        <th>${trKey("phone")}</th>
                        <th>${trKey("email")}</th>
                        <th>${trKey("dept")}</th>
                        <th>${trKey("position")}</th>
                        <th>${trKey("actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${this.pagedEmployees.map(
                        (emp) => html`
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                class="checkbox"
                                .checked=${this.selectedIds.has(emp.id)}
                                @change=${(e) =>
                                  this._toggleSelectRow(e, emp.id)}
                              />
                            </td>
                            <td>${emp.firstName}</td>
                            <td>${emp.lastName}</td>
                            <td>${emp.hireDate}</td>
                            <td>${emp.dob}</td>
                            <td>${emp.phone}</td>
                            <td>${emp.email}</td>
                            <td>${emp.dept}</td>
                            <td>${emp.position}</td>
                            <td class="actions">
                              <button
                                class="action-btn"
                                title="${trKey("edit")}"
                                @click=${() => this._onEdit(emp)}
                              >
                                <svg viewBox="0 0 24 24">
                                  <path
                                    d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.71-9.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                  />
                                </svg>
                              </button>
                              <button
                                class="action-btn"
                                title="${trKey("delete")}"
                                @click=${() => this._onDelete(emp)}
                              >
                                <svg viewBox="0 0 24 24">
                                  <path
                                    d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        `
                      )}
                    </tbody>
                  </table>
                </div>
              `
            : html`
                <div class="grid fade-in">
                  ${this.pagedEmployees.map(
                    (emp) => html`
                      <div class="card">
                        <div class="card-fields">
                          <div>
                            <div class="field-label">
                              ${trKey("firstName")}:
                            </div>
                            <div class="field-value">${emp.firstName}</div>
                            <div class="field-label">${trKey("hireDate")}</div>
                            <div class="field-value">${emp.hireDate}</div>
                            <div class="field-label">${trKey("phone")}</div>
                            <div class="field-value">${emp.phone}</div>
                            <div class="field-label">${trKey("dept")}</div>
                            <div class="field-value">${emp.dept}</div>
                          </div>
                          <div>
                            <div class="field-label">${trKey("lastName")}:</div>
                            <div class="field-value">${emp.lastName}</div>
                            <div class="field-label">${trKey("dob")}</div>
                            <div class="field-value">${emp.dob}</div>
                            <div class="field-label">${trKey("email")}</div>
                            <div class="field-value">${emp.email}</div>
                            <div class="field-label">${trKey("position")}</div>
                            <div class="field-value">${emp.position}</div>
                          </div>
                        </div>
                        <div class="card-actions">
                          <button
                            class="edit-btn"
                            @click=${() => this._onEdit(emp)}
                          >
                            <svg viewBox="0 0 24 24">
                              <path
                                d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.71-9.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                              />
                            </svg>
                            ${trKey("edit")}
                          </button>
                          <button
                            class="delete-btn"
                            @click=${() => this._onDelete(emp)}
                          >
                            <svg viewBox="0 0 24 24">
                              <path
                                d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z"
                              />
                            </svg>
                            ${trKey("delete")}
                          </button>
                        </div>
                      </div>
                    `
                  )}
                </div>
              `}
        </div>
        ${this.renderPagination()}
      </div>
    `;
  }

  _onAdd() {
    window.history.pushState({}, "", "/employees/add");
    window.dispatchEvent(new Event("popstate"));
  }

  _onEdit(emp) {
    window.history.pushState({}, "", `/employees/${emp.id}/edit`);
    window.dispatchEvent(new Event("popstate"));
  }

  _onDelete(emp) {
    this.dispatchEvent(new CustomEvent("delete-employee", { detail: emp }));
  }

  _deleteEmployee(emp) {
    deleteEmployee(emp.id);
    this._refreshEmployees();
  }

  _gotoPage(n) {
    if (n >= 1 && n <= this.totalPages) {
      this.page = n;
    }
  }

  _toggleSelectRow(e, id) {
    if (e.target.checked) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
    this.selectedIds = new Set(this.selectedIds);
  }

  _toggleAll(e) {
    if (e.target.checked) {
      this.pagedEmployees.forEach((emp) => this.selectedIds.add(emp.id));
    } else {
      this.pagedEmployees.forEach((emp) => this.selectedIds.delete(emp.id));
    }
    this.selectedIds = new Set(this.selectedIds);
  }

  _allSelected() {
    return (
      this.pagedEmployees.length > 0 &&
      this.pagedEmployees.every((emp) => this.selectedIds.has(emp.id))
    );
  }

  _setView(mode) {
    if (this.viewMode !== mode) {
      this.viewMode = mode;
    }
  }
}

customElements.define("employee-list", EmployeeList);
