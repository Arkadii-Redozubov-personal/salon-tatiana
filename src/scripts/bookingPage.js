import { MASTER, SERVICES } from '../data/siteData.js';
import {
  buildTelegramUrl,
  buildWhatsAppUrl,
  formatBookingMessage,
  resolveServiceSlug,
  validateBookingInput
} from '../lib/booking.js';
import { escapeHtml, initCommonUI } from './common.js';

function initBookingForm() {
  const form = document.getElementById('booking-form');
  const serviceSelect = document.getElementById('booking-service');
  const dateInput = document.getElementById('booking-date');
  const resultBox = document.getElementById('booking-result-box');

  if (!form || !serviceSelect || !resultBox) {
    return;
  }

  const optionsHtml = [
    ...SERVICES.map((s) => `<option value="${escapeHtml(s.slug)}">${escapeHtml(s.title)}</option>`),
    '<option value="two-zones">Комплекс «Две зоны» (действует скидка)</option>',
    '<option value="three-zones">Комплекс «Три зоны» (скидка по акции)</option>'
  ].join('');
  serviceSelect.innerHTML = optionsHtml;

  const params = new URLSearchParams(window.location.search);
  const rawService = params.get('service') || params.get('active-service');
  if (rawService === 'two-zones' || rawService === 'three-zones') {
    serviceSelect.value = rawService;
  } else {
    serviceSelect.value = resolveServiceSlug(window.location.search, SERVICES);
  }

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  const clearErrors = () => {
    form.querySelectorAll('[data-error-for]').forEach((el) => {
      el.textContent = '';
    });
    form.querySelectorAll('[aria-invalid]').forEach((el) => {
      el.removeAttribute('aria-invalid');
    });
  };

  const showErrors = (errors) => {
    Object.entries(errors).forEach(([field, msg]) => {
      const errEl = form.querySelector(`[data-error-for="${field}"]`);
      if (errEl) {
        errEl.textContent = msg;
      }
      const inputEl = form.querySelector(`[name="${field}"]`);
      if (inputEl) {
        inputEl.setAttribute('aria-invalid', 'true');
      }
    });
  };

  let lastPayloadSignature = '';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const data = new FormData(form);
    const input = {
      website: String(data.get('website') || ''),
      service: String(data.get('service') || ''),
      name: String(data.get('name') || ''),
      contact: String(data.get('contact') || ''),
      preferredDate: String(data.get('preferredDate') || ''),
      preferredTime: String(data.get('preferredTime') || ''),
      messenger: String(data.get('messenger') || 'whatsapp'),
      comment: String(data.get('comment') || ''),
      consent: data.get('consent') === 'on'
    };

    const validation = validateBookingInput(input);
    if (!validation.valid) {
      showErrors(validation.errors);
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    const signature = JSON.stringify(validation.sanitized);
    if (signature === lastPayloadSignature && !resultBox.hidden) {
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }
    lastPayloadSignature = signature;

    const matchedService = SERVICES.find((s) => s.slug === validation.sanitized.service);
    let serviceTitle = matchedService?.title || validation.sanitized.service;
    if (validation.sanitized.service === 'two-zones') {
      serviceTitle = 'Комплекс «Две зоны» (скидка по акции)';
    } else if (validation.sanitized.service === 'three-zones') {
      serviceTitle = 'Комплекс «Три зоны» (скидка по акции)';
    }

    const messageText = formatBookingMessage(validation.sanitized, serviceTitle);
    const waUrl = buildWhatsAppUrl(MASTER.phoneDigits, messageText);
    const tgUrl = buildTelegramUrl(MASTER.telegramHandle);

    const previewEl = document.getElementById('booking-preview-text');
    const waLink = document.getElementById('booking-wa-link');
    const tgLink = document.getElementById('booking-tg-link');
    const copyBtn = document.getElementById('booking-copy-btn');
    const copyStatus = document.getElementById('booking-copy-status');

    if (previewEl) {
      previewEl.textContent = messageText;
    }
    if (waLink) {
      waLink.setAttribute('href', waUrl);
    }
    if (tgLink) {
      tgLink.setAttribute('href', tgUrl);
    }
    if (copyStatus) {
      copyStatus.textContent = '';
    }

    if (copyBtn) {
      copyBtn.onclick = async () => {
        try {
          await navigator.clipboard.writeText(messageText);
          if (copyStatus) {
            copyStatus.textContent = 'Текст заявки скопирован — вставьте его в чат Telegram.';
          }
        } catch {
          if (copyStatus) {
            copyStatus.textContent = 'Скопируйте текст заявки вручную из поля выше.';
          }
        }
      };
    }

    resultBox.hidden = false;
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

initBookingForm();
initCommonUI();
