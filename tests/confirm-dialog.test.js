import {
  fixture,
  html,
  expect,
  oneEvent,
} from "https://unpkg.com/@open-wc/testing?module";
import "../src/components/confirm-dialog.js";
import { setLang } from "../src/store.js";

describe("ConfirmDialog", () => {
  beforeEach(() => {
    // Dil varsayılanını Türkçe yap
    setLang("tr");
  });

  it("should open dialog with default message", async () => {
    const el = await fixture(html`<confirm-dialog></confirm-dialog>`);
    el.open();
    const dlg = el.shadowRoot.getElementById("dlg");
    expect(dlg.open).to.be.true;
    expect(el.message).to.equal("Emin misiniz?");
    expect(el.shadowRoot.querySelector(".title").textContent).to.equal(
      "Emin misiniz?"
    );
  });

  it("should open dialog with custom message and description", async () => {
    const el = await fixture(html`<confirm-dialog></confirm-dialog>`);
    const customMsg = "Test mesajı";
    const customDesc = "Detaylı açıklama";
    el.open(customMsg, customDesc);
    await el.updateComplete;
    expect(el.message).to.equal(customMsg);
    expect(el.description).to.equal(customDesc);
    const title = el.shadowRoot.querySelector(".title").textContent;
    const desc = el.shadowRoot.querySelector(".description").textContent;
    expect(title).to.equal(customMsg);
    expect(desc).to.equal(customDesc);
  });

  it('should dispatch "confirmed" event when proceed clicked', async () => {
    const el = await fixture(html`<confirm-dialog></confirm-dialog>`);
    el.open();
    const confirmedPromise = oneEvent(el, "confirmed");
    const proceedBtn = el.shadowRoot.querySelector("button.proceed");
    proceedBtn.click();
    const event = await confirmedPromise;
    expect(event).to.exist;
    const dlg = el.shadowRoot.getElementById("dlg");
    expect(dlg.open).to.be.false;
  });

  it('should dispatch "cancelled" event when cancel clicked', async () => {
    const el = await fixture(html`<confirm-dialog></confirm-dialog>`);
    el.open();
    const cancelledPromise = oneEvent(el, "cancelled");
    const cancelBtn = el.shadowRoot.querySelector("button.cancel");
    cancelBtn.click();
    const event = await cancelledPromise;
    expect(event).to.exist;
    const dlg = el.shadowRoot.getElementById("dlg");
    expect(dlg.open).to.be.false;
  });

  it("should update text on language change", async () => {
    const el = await fixture(html`<confirm-dialog></confirm-dialog>`);
    el.open();
    // Önce Türkçe kontrolü
    expect(el.shadowRoot.querySelector("button.proceed").textContent).to.equal(
      "Devam"
    );

    // Dili İngilizce yap
    setLang("en");
    window.dispatchEvent(new Event("lang-changed"));
    await el.updateComplete;

    expect(el.shadowRoot.querySelector("button.proceed").textContent).to.equal(
      "Proceed"
    );
  });
});
