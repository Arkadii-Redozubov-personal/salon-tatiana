export function resolveServiceSlug(searchString, services = []) {
  if (!Array.isArray(services) || services.length === 0) {
    return '';
  }

  const params = new URLSearchParams(searchString || '');
  const raw = params.get('service') || params.get('active-service') || '';
  const normalized = raw.trim().toLowerCase();

  if (!normalized) {
    return services[0].slug;
  }

  const bySlug = services.find((item) => item.slug.toLowerCase() === normalized);
  if (bySlug) {
    return bySlug.slug;
  }

  const byTitle = services.find(
    (item) =>
      item.title.toLowerCase() === normalized ||
      (item.shortTitle && item.shortTitle.toLowerCase() === normalized)
  );
  if (byTitle) {
    return byTitle.slug;
  }

  return services[0].slug;
}

export function sanitizeText(value, maxLength = 300) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

export function validateBookingInput(input = {}) {
  const honeypot = sanitizeText(input.website || '', 100);
  if (honeypot.length > 0) {
    return {
      valid: false,
      isBot: true,
      errors: { form: 'Заявка не прошла автоматическую проверку. Попробуйте снова.' },
      sanitized: null
    };
  }

  const service = sanitizeText(input.service || '', 120);
  const name = sanitizeText(input.name || '', 80);
  const contact = sanitizeText(input.contact || '', 80);
  const preferredDate = sanitizeText(input.preferredDate || '', 40);
  const preferredTime = sanitizeText(input.preferredTime || '', 40);
  const messenger = input.messenger === 'telegram' ? 'telegram' : 'whatsapp';
  const comment = sanitizeText(input.comment || '', 400);
  const consent = Boolean(input.consent);

  const errors = {};

  if (!service) {
    errors.service = 'Выберите интересующую процедуру.';
  }
  if (name.length < 2) {
    errors.name = 'Укажите ваше имя (минимум 2 символа).';
  }
  if (contact.length < 4) {
    errors.contact = 'Укажите телефон, WhatsApp или @username в Telegram.';
  }
  if (!preferredDate) {
    errors.preferredDate = 'Укажите желаемую дату визита.';
  }
  if (!preferredTime) {
    errors.preferredTime = 'Выберите ориентировочное время.';
  }
  if (!consent) {
    errors.consent = 'Необходимо согласие на обработку персональных данных.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    isBot: false,
    errors,
    sanitized: {
      service,
      name,
      contact,
      preferredDate,
      preferredTime,
      messenger,
      comment,
      consent
    }
  };
}

export function formatBookingMessage(sanitized, serviceTitle) {
  const label = serviceTitle || sanitized.service;
  const lines = [
    'Здравствуйте, Татьяна! Хочу оставить предварительную заявку с сайта:',
    `• Услуга: ${label}`,
    `• Желаемая дата и время: ${sanitized.preferredDate}, ${sanitized.preferredTime}`,
    `• Имя: ${sanitized.name}`,
    `• Контакт для связи: ${sanitized.contact}`
  ];

  if (sanitized.comment) {
    lines.push(`• Комментарий: ${sanitized.comment}`);
  }

  lines.push('Подскажите, пожалуйста, свободно ли это время.');
  return lines.join('\n');
}

export function buildWhatsAppUrl(phoneDigits, message) {
  const digits = String(phoneDigits || '').replace(/\D/g, '');
  const encoded = encodeURIComponent(message || '');
  return `https://wa.me/${digits}?text=${encoded}`;
}

export function buildTelegramUrl(username) {
  const clean = String(username || '').replace(/^@/, '').trim();
  return `https://t.me/${clean}`;
}

