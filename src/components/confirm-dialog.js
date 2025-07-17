import { LitElement, html, css } from 'lit';
import { getLang } from '../store.js';

export class ConfirmDialog extends LitElement {
  static styles = css`
    dialog {
      border: none;
      border-radius: 12px;
      padding: 0;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      min-width: 380px;
      max-width: 95vw;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 24px 0 24px;
    }
    .title {
      color: #ff6600;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }
    .close {
      background: none;
      border: none;
      font-size: 28px;
      color: #ff6600;
      cursor: pointer;
      line-height: 1;
      padding: 0;
    }
    .description {
      color: #444;
      font-size: 16px;
      margin: 16px 24px 0 24px;
      min-height: 32px;
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: 32px 24px 24px 24px;
    }
    button {
      padding: 12px 0;
      font-size: 16px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: background 0.2s, color 0.2s;
    }
    button.proceed {
      background: #ff6600;
      color: #fff;
      width: 100%;
      margin-bottom: 0;
    }
    button.cancel {
      background: #fff;
      color: #444;
      border: 2px solid #bdbdbd;
      width: 100%;
    }
    @media (max-width: 420px) {
      dialog {
        min-width: unset;
        width: 98vw;
      }
    }
  `;

  static properties = {
    message: { type: String },
    description: { type: String },
  };

  constructor() {
    super();
    this.message = trKey('areYouSure');
    this.description = '';
    window.addEventListener('lang-changed', () => this.requestUpdate());
  }

  render() {
    return html`
      <dialog @cancel=${this._onCancel} id="dlg">
        <div class="header">
          <span class="title">${this.message}</span>
          <button class="close" @click=${this._onCancel} aria-label="Close">&times;</button>
        </div>
        <div class="description">${this.description}</div>
        <div class="actions">
          <button class="proceed" @click=${this._onConfirm}>${trKey('proceed')}</button>
          <button class="cancel" @click=${this._onCancel}>${trKey('cancel')}</button>
        </div>
      </dialog>
    `;
  }

  /** Açmak için çağırın */
  open(message = this.message, description = this.description) {
    this.message = message;
    this.description = description;
    this.shadowRoot.getElementById('dlg').showModal();
  }

  _onConfirm() {
    this.shadowRoot.getElementById('dlg').close();
    this.dispatchEvent(new CustomEvent('confirmed'));
  }

  _onCancel(e) {
    this.shadowRoot.getElementById('dlg').close();
    this.dispatchEvent(new CustomEvent('cancelled'));
  }
}

customElements.define('confirm-dialog', ConfirmDialog);

const t = {
  en: {
    proceed: 'Proceed',
    cancel: 'Cancel',
    areYouSure: 'Are you sure?',
  },
  tr: {
    proceed: 'Devam',
    cancel: 'İptal',
    areYouSure: 'Emin misiniz?',
  }
};
function trKey(key) {
  const lang = getLang();
  return t[lang][key] || key;
}
