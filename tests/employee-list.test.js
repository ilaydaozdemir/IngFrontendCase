import {
  fixture,
  html,
  expect,
  oneEvent,
} from "https://unpkg.com/@open-wc/testing?module";
import "../src/components/employee-list.js";
import { setLang } from "../src/store.js";

describe("EmployeeList without sinon", () => {
  const employeesSample = [
    {
      id: 1,
      firstName: "Ahmet",
      lastName: "Ayra",
      hireDate: "2020-01-01",
      dob: "1990-06-15",
      phone: "123456789",
      email: "ahmet@example.com",
      dept: "engineering",
      position: "developer",
    },
    {
      id: 2,
      firstName: "Ayşe",
      lastName: "Demir",
      hireDate: "2021-02-02",
      dob: "1988-04-23",
      phone: "987654321",
      email: "ayse@example.com",
      dept: "marketing",
      position: "manager",
    },
  ];

  beforeEach(() => {
    setLang("tr"); // Türkçe dil ayarı
    let confirmDlg = document.getElementById("confirmDlg");
    if (!confirmDlg) {
      confirmDlg = document.createElement("confirm-dialog");
      confirmDlg.id = "confirmDlg";
      document.body.appendChild(confirmDlg);
    }
  });

  it("renders employee list header in Turkish by default", async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    el.employees = employeesSample;
    await el.updateComplete;

    const h1 = el.shadowRoot.querySelector("h1");
    expect(h1).to.exist;
    expect(h1.textContent).to.include("Çalışan Listesi");
  });

  it("dispatches delete-employee event on delete button click", async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    el.employees = employeesSample;
    await el.updateComplete;
    const deleteBtn = el.shadowRoot.querySelector(
      "tbody tr button[title='Sil']"
    );
    expect(deleteBtn).to.exist;

    setTimeout(() => deleteBtn.click());
    const event = await oneEvent(el, "delete-employee");

    expect(event).to.exist;
    expect(event.detail.firstName).to.equal(employeesSample[0].firstName);
  });

  it("edit button changes URL and triggers popstate", async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    el.employees = employeesSample;
    await el.updateComplete;

    const editBtn = el.shadowRoot.querySelector(
      "tbody tr button[title='Düzenle']"
    );
    expect(editBtn).to.exist;

    const popstatePromise = new Promise((resolve) =>
      window.addEventListener("popstate", resolve, { once: true })
    );
    editBtn.click();

    await popstatePromise;
    expect(window.location.pathname).to.include(
      `/employees/${employeesSample[0].id}/edit`
    );
  });
});
