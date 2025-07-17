import {
  fixture,
  html,
  expect,
  oneEvent,
} from "https://unpkg.com/@open-wc/testing?module";
import "../src/components/employee-form.js";
import { setLang } from "../src/store.js";
describe("EmployeeForm", () => {
  beforeEach(() => {
    setLang("tr");
  });
  it("renders Add Employee form with Turkish labels by default", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    expect(el.shadowRoot.querySelector("h1").textContent).to.include(
      "Ekle Çalışan"
    );
    expect(el.shadowRoot.querySelector("label").textContent).to.include("Adı");
  });
  it("updates text when language changes", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    expect(el.shadowRoot.querySelector("h1").textContent).to.include("Ekle");
    setLang("en");
    window.dispatchEvent(new CustomEvent("lang-changed"));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("h1").textContent).to.include("Add");
  });

  it("pre-fills inputs when mode is Edit and employee is set", async () => {
    const employee = {
      id: 1,
      firstName: "Ahmet",
      lastName: "Ayra",
      hireDate: "2020-01-01",
      dob: "1990-06-15",
      phone: "123456789",
      email: "ahmet@example.com",
      dept: "engineering",
      position: "developer",
    };
    const el = await fixture(
      html`<employee-form
        .mode=${"Edit"}
        .employee=${employee}
      ></employee-form>`
    );
    expect(
      el.shadowRoot.querySelector('input[name="firstName"]').value
    ).to.equal("Ahmet");
    expect(
      el.shadowRoot.querySelector('input[name="lastName"]').value
    ).to.equal("Ayra");
    expect(
      el.shadowRoot.querySelector('input[name="hireDate"]').value
    ).to.equal("2020-01-01");
    expect(el.shadowRoot.querySelector('select[name="dept"]').value).to.equal(
      "engineering"
    );
  });

  it("dispatches 'save-employee' event with correct data on submit", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const form = el.shadowRoot.querySelector("form");
    form.querySelector('input[name="firstName"]').value = "Ayla";
    form.querySelector('input[name="lastName"]').value = "Kerem";
    form.querySelector('input[name="hireDate"]').value = "2022-05-20";
    form.querySelector('input[name="dob"]').value = "1992-07-10";
    form.querySelector('select[name="dept"]').value = "marketing";
    form.querySelector('select[name="position"]').value = "manager";

    setTimeout(() =>
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      )
    );

    const event = await oneEvent(el, "save-employee");
    expect(event).to.exist;
    expect(event.detail.mode).to.equal("Add");
    expect(event.detail.data.firstName).to.equal("Ayla");
    expect(event.detail.data.dept).to.equal("marketing");
  });

  it("calls window.history.back() on cancel button click", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const cancelBtn = el.shadowRoot.querySelector("button.cancel");

    const originalBack = window.history.back;
    let called = false;
    window.history.back = () => {
      called = true;
    };
    cancelBtn.click();
    expect(called).to.be.true;
    window.history.back = originalBack;
  });
});
