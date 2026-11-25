import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveServiceSlug,
  validateBookingInput,
  formatBookingMessage,
  buildWhatsAppUrl,
  buildTelegramUrl
} from '../src/lib/booking.js';
import { SERVICES } from '../src/data/siteData.js';

test('resolveServiceSlug handles ?service=, ?active-service= and fallback', () => {
  assert.equal(resolveServiceSlug('?service=laser-removal', SERVICES), 'laser-removal');
  assert.equal(resolveServiceSlug('?active-service=brows-magic-shading', SERVICES), 'brows-magic-shading');
  assert.equal(resolveServiceSlug('?service=unknown', SERVICES), SERVICES[0].slug);
  assert.equal(resolveServiceSlug('', SERVICES), SERVICES[0].slug);
});

test('validateBookingInput rejects empty required fields and bot honeypot', () => {
  const invalid = validateBookingInput({
    service: '',
    name: 'А',
    contact: '',
    preferredDate: '',
    preferredTime: '',
    consent: false
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.service);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.contact);
  assert.ok(invalid.errors.preferredDate);
  assert.ok(invalid.errors.preferredTime);
  assert.ok(invalid.errors.consent);

  const bot = validateBookingInput({
    website: 'http://spam.example',
    service: 'lips',
    name: 'Мария',
    contact: '+37368000000',
    preferredDate: '2026-12-01',
    preferredTime: 'Утро (09:00–12:00)',
    consent: true
  });
  assert.equal(bot.valid, false);
  assert.equal(bot.isBot, true);
});

test('validateBookingInput accepts valid input and normalizes whitespace', () => {
  const result = validateBookingInput({
    service: 'brows-kak-svoi',
    name: '  Елена   Иванова ',
    contact: ' +373 68 111 222 ',
    preferredDate: '2026-12-05',
    preferredTime: 'День (12:00–16:00)',
    messenger: 'telegram',
    comment: '  Две   зоны ',
    consent: true
  });

  assert.equal(result.valid, true);
  assert.equal(result.sanitized.name, 'Елена Иванова');
  assert.equal(result.sanitized.messenger, 'telegram');
  assert.equal(result.sanitized.comment, 'Две зоны');
});

test('formatBookingMessage, buildWhatsAppUrl and buildTelegramUrl build valid links', () => {
  const msg = formatBookingMessage(
    {
      service: 'brows-kak-svoi',
      name: 'Елена',
      contact: '+37368111222',
      preferredDate: '2026-12-05',
      preferredTime: 'День (12:00–16:00)',
      comment: 'Интересует скидка на две зоны'
    },
    'Брови в волосковой технике «Как свои»'
  );

  assert.match(msg, /Брови в волосковой технике «Как свои»/);
  assert.match(msg, /2026-12-05, День \(12:00–16:00\)/);
  assert.match(msg, /Елена/);

  const waUrl = buildWhatsAppUrl('+373 68 473 497', msg);
  assert.ok(waUrl.startsWith('https://wa.me/37368473497?text='));
  assert.equal(buildTelegramUrl('@tatiana_malighina'), 'https://t.me/tatiana_malighina');
});
