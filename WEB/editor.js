/* ═══════════════════════════════════════════════════════════════
   EDITOR VISUAL — Casa Museo Hermanas Mirabal
   editor.js  —  Lógica completa del CMS visual
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   1. DEFINICIÓN DE CAMPOS EDITABLES
   Cada campo mapea un selector CSS del index.html al panel.
   ───────────────────────────────────────────────────────────── */
const FIELD_MAP = [
  /* ── IDENTIDAD / MARCA ─────────────────────────────────── */
  {
    panel: 'identidad', panelIcon: '🦋', panelLabel: 'Identidad del Museo',
    fields: [
      { id: 'logo-title', label: 'Nombre (línea 1)', type: 'text', selector: '.logo-title', multiple: true },
      { id: 'logo-subtitle', label: 'Nombre (línea 2)', type: 'text', selector: '.logo-subtitle', multiple: true },
      { id: 'page-title', label: 'Título de pestaña', type: 'text', selector: null, special: 'page-title' },
      { id: 'meta-desc', label: 'Meta descripción', type: 'textarea', selector: null, special: 'meta-desc' },
    ]
  },

  /* ── COLORES ────────────────────────────────────────────── */
  {
    panel: 'colores', panelIcon: '🎨', panelLabel: 'Paleta de Colores',
    fields: [
      { id: 'color-accent', label: 'Verde principal', type: 'color', cssVar: '--color-forest', defaultVal: '#2D4A3E' },
      { id: 'color-accent2', label: 'Verde claro', type: 'color', cssVar: '--color-sage', defaultVal: '#4E7A68' },
      { id: 'color-terra', label: 'Terracota', type: 'color', cssVar: '--color-terra', defaultVal: '#C26B4A' },
      { id: 'color-gold', label: 'Dorado', type: 'color', cssVar: '--color-gold', defaultVal: '#C9A96E' },
      { id: 'color-dark', label: 'Fondo oscuro', type: 'color', cssVar: '--color-dark', defaultVal: '#0A0A0A' },
      { id: 'color-ink', label: 'Texto principal', type: 'color', cssVar: '--color-ink', defaultVal: '#1A1A1A' },
    ]
  },

  /* ── HERO ───────────────────────────────────────────────── */
  {
    panel: 'hero', panelIcon: '🏛️', panelLabel: 'Sección Hero',
    fields: [
      { id: 'hero-eyebrow', label: 'Texto eyebrow', type: 'text', selector: '.eyebrow-text' },
      { id: 'hero-title', label: 'Título principal', type: 'textarea', selector: '.hero-title', htmlMode: true },
      { id: 'hero-subtitle', label: 'Subtítulo', type: 'textarea', selector: '.hero-subtitle', htmlMode: true },
      { id: 'hero-btn1', label: 'Botón 1 — texto', type: 'text', selector: '#btn-explorar-historia' },
      { id: 'hero-btn2', label: 'Botón 2 — texto', type: 'text', selector: '#btn-planifica-hero' },
      { id: 'hero-scroll', label: 'Texto "scroll"', type: 'text', selector: '.hero-scroll-indicator span' },
      { id: 'hero-img', label: 'Imagen de portada', type: 'image', selector: '#hero-bg-image' },
    ]
  },

  /* ── INTRODUCCIÓN ───────────────────────────────────────── */
  {
    panel: 'intro', panelIcon: '📖', panelLabel: 'Introducción / Historia',
    subsections: true,
    fields: [
      { id: 'intro-tag', label: 'Etiqueta sección', type: 'text', selector: '#historia .section-tag' },
      { id: 'intro-heading', label: 'Título', type: 'textarea', selector: '#intro-heading', htmlMode: true },
      { id: 'intro-p1', label: 'Párrafo 1', type: 'textarea', selector: '#historia .intro-text:first-of-type' },
      { id: 'intro-p2', label: 'Párrafo 2', type: 'textarea', selector: '#historia .intro-text:last-of-type' },
      { subsectionLabel: 'Estadísticas' },
      { id: 'stat1-num', label: 'Dato 1 — Número', type: 'text', selector: '.stat-item:nth-child(1) .stat-number' },
      { id: 'stat1-lbl', label: 'Dato 1 — Etiqueta', type: 'text', selector: '.stat-item:nth-child(1) .stat-label' },
      { id: 'stat2-num', label: 'Dato 2 — Número', type: 'text', selector: '.stat-item:nth-child(2) .stat-number' },
      { id: 'stat2-lbl', label: 'Dato 2 — Etiqueta', type: 'text', selector: '.stat-item:nth-child(2) .stat-label' },
      { id: 'stat3-num', label: 'Dato 3 — Número', type: 'text', selector: '.stat-item:nth-child(3) .stat-number' },
      { id: 'stat3-lbl', label: 'Dato 3 — Etiqueta', type: 'text', selector: '.stat-item:nth-child(3) .stat-label' },
    ]
  },

  /* ── LAS HERMANAS ───────────────────────────────────────── */
  {
    panel: 'hermanas', panelIcon: '🌸', panelLabel: 'Las Hermanas (Mariposas)',
    fields: [
      { id: 'sis-tag', label: 'Etiqueta sección', type: 'text', selector: '#las-hermanas .section-tag' },
      { id: 'sis-title', label: 'Título', type: 'text', selector: '#sisters-heading' },
      { id: 'sis-sub', label: 'Subtítulo', type: 'text', selector: '#las-hermanas .section-subtitle' },
      { subsectionLabel: 'Patria' },
      { id: 'patria-photo', label: 'Foto — Patria', type: 'sister-image', selector: '#photo-patria' },
      { id: 'patria-years', label: 'Años de vida', type: 'text', selector: '#card-patria .sister-birth-year' },
      { id: 'patria-name', label: 'Nombre', type: 'text', selector: '#patria-name' },
      { id: 'patria-role', label: 'Rol / eslogan', type: 'text', selector: '#card-patria .sister-role' },
      { id: 'patria-desc', label: 'Descripción', type: 'textarea', selector: '#card-patria .sister-desc' },
      { id: 'patria-quote', label: 'Cita', type: 'text', selector: '#card-patria blockquote' },
      { subsectionLabel: 'Minerva' },
      { id: 'minerva-photo', label: 'Foto — Minerva', type: 'sister-image', selector: '#photo-minerva' },
      { id: 'minerva-years', label: 'Años de vida', type: 'text', selector: '#card-minerva .sister-birth-year' },
      { id: 'minerva-name', label: 'Nombre', type: 'text', selector: '#minerva-name' },
      { id: 'minerva-role', label: 'Rol / eslogan', type: 'text', selector: '#card-minerva .sister-role' },
      { id: 'minerva-desc', label: 'Descripción', type: 'textarea', selector: '#card-minerva .sister-desc' },
      { id: 'minerva-quote', label: 'Cita', type: 'text', selector: '#card-minerva blockquote' },
      { subsectionLabel: 'María Teresa' },
      { id: 'mt-photo', label: 'Foto — María Teresa', type: 'sister-image', selector: '#photo-mariateresa' },
      { id: 'mt-years', label: 'Años de vida', type: 'text', selector: '#card-mariateresa .sister-birth-year' },
      { id: 'mt-name', label: 'Nombre', type: 'text', selector: '#mariateresa-name' },
      { id: 'mt-role', label: 'Rol / eslogan', type: 'text', selector: '#card-mariateresa .sister-role' },
      { id: 'mt-desc', label: 'Descripción', type: 'textarea', selector: '#card-mariateresa .sister-desc' },
      { id: 'mt-quote', label: 'Cita', type: 'text', selector: '#card-mariateresa blockquote' },
    ]
  },

  /* ── LA CASA ────────────────────────────────────────────── */
  {
    panel: 'lacasa', panelIcon: '🏠', panelLabel: 'La Casa como Testimonio',
    fields: [
      { id: 'casa-tag', label: 'Etiqueta sección', type: 'text', selector: '#la-casa .section-tag' },
      { id: 'casa-heading', label: 'Título', type: 'textarea', selector: '#casa-heading', htmlMode: true },
      { id: 'casa-p1', label: 'Párrafo 1', type: 'textarea', selector: '#la-casa .body-text:first-of-type' },
      { id: 'casa-p2', label: 'Párrafo 2', type: 'textarea', selector: '#la-casa .body-text:last-of-type' },
      { id: 'casa-img', label: 'Imagen interior', type: 'image', selector: '#casa-interior-img' },
      { id: 'casa-img-cap', label: 'Pie de foto', type: 'text', selector: '.casa-image-caption span' },
      { subsectionLabel: 'Características' },
      { id: 'feat1-title', label: 'Característica 1', type: 'text', selector: '.feature-item:nth-child(1) strong' },
      { id: 'feat1-desc', label: 'Descripción 1', type: 'text', selector: '.feature-item:nth-child(1) span' },
      { id: 'feat2-title', label: 'Característica 2', type: 'text', selector: '.feature-item:nth-child(2) strong' },
      { id: 'feat2-desc', label: 'Descripción 2', type: 'text', selector: '.feature-item:nth-child(2) span' },
      { id: 'feat3-title', label: 'Característica 3', type: 'text', selector: '.feature-item:nth-child(3) strong' },
      { id: 'feat3-desc', label: 'Descripción 3', type: 'text', selector: '.feature-item:nth-child(3) span' },
    ]
  },

  /* ── ACTIVIDADES ────────────────────────────────────────── */
  {
    panel: 'actividades', panelIcon: '📅', panelLabel: 'Actividades y Exposiciones',
    fields: [
      { id: 'act-tag', label: 'Etiqueta sección', type: 'text', selector: '#actividades .section-tag' },
      { id: 'act-title', label: 'Título', type: 'text', selector: '#activities-heading' },
      { id: 'act-sub', label: 'Subtítulo', type: 'text', selector: '#actividades .section-subtitle' },
      { subsectionLabel: 'Actividad 1 — Visita Guiada' },
      { id: 'act1-type', label: 'Tipo', type: 'text', selector: '#activity-guided-tours .activity-type' },
      { id: 'act1-name', label: 'Nombre', type: 'text', selector: '#act-heading-1' },
      { id: 'act1-desc', label: 'Descripción', type: 'textarea', selector: '#activity-guided-tours .activity-desc' },
      { id: 'act1-sched', label: 'Horario', type: 'text', selector: '#activity-guided-tours .activity-schedule' },
      { id: 'act1-price', label: 'Precio', type: 'text', selector: '#activity-guided-tours .activity-price' },
      { subsectionLabel: 'Actividad 2 — Educación' },
      { id: 'act2-type', label: 'Tipo', type: 'text', selector: '#activity-education .activity-type' },
      { id: 'act2-name', label: 'Nombre', type: 'text', selector: '#act-heading-2' },
      { id: 'act2-desc', label: 'Descripción', type: 'textarea', selector: '#activity-education .activity-desc' },
      { id: 'act2-sched', label: 'Horario', type: 'text', selector: '#activity-education .activity-schedule' },
      { id: 'act2-price', label: 'Precio', type: 'text', selector: '#activity-education .activity-price' },
      { subsectionLabel: 'Actividad 3 — 25 Nov (destacada)' },
      { id: 'act3-type', label: 'Tipo', type: 'text', selector: '#activity-nov25 .activity-type' },
      { id: 'act3-name', label: 'Nombre', type: 'text', selector: '#act-heading-3' },
      { id: 'act3-desc', label: 'Descripción', type: 'textarea', selector: '#activity-nov25 .activity-desc' },
      { id: 'act3-sched', label: 'Horario', type: 'text', selector: '#activity-nov25 .activity-schedule' },
      { id: 'act3-price', label: 'Precio', type: 'text', selector: '#activity-nov25 .activity-price' },
      { subsectionLabel: 'Actividad 4 — Galería' },
      { id: 'act4-name', label: 'Nombre', type: 'text', selector: '#act-heading-4' },
      { id: 'act4-desc', label: 'Descripción', type: 'textarea', selector: '#activity-exhibitions .activity-desc' },
      { subsectionLabel: 'Actividad 5 — Charlas' },
      { id: 'act5-name', label: 'Nombre', type: 'text', selector: '#act-heading-5' },
      { id: 'act5-desc', label: 'Descripción', type: 'textarea', selector: '#activity-talks .activity-desc' },
      { subsectionLabel: 'Actividad 6 — Biblioteca' },
      { id: 'act6-name', label: 'Nombre', type: 'text', selector: '#act-heading-6' },
      { id: 'act6-desc', label: 'Descripción', type: 'textarea', selector: '#activity-library .activity-desc' },
    ]
  },

  /* ── VISITA ─────────────────────────────────────────────── */
  {
    panel: 'visita', panelIcon: '🕐', panelLabel: 'Planifica tu Visita',
    fields: [
      { id: 'vis-tag', label: 'Etiqueta sección', type: 'text', selector: '#visita .section-tag' },
      { id: 'vis-title', label: 'Título', type: 'text', selector: '#visit-heading' },
      { id: 'vis-sub', label: 'Subtítulo', type: 'text', selector: '#visita .section-subtitle' },
      { subsectionLabel: 'Horarios' },
      { id: 'hours-weekday', label: 'Días de semana', type: 'text', selector: '#visit-hours dt:nth-child(1)' },
      { id: 'hours-wend', label: 'Fin de semana', type: 'text', selector: '#visit-hours dt:nth-child(3)' },
      { subsectionLabel: 'Entradas' },
      { id: 'adm-adult', label: 'Adultos — precio', type: 'text', selector: '#visit-admission dd:nth-child(2)' },
      { id: 'adm-kids', label: 'Niños — precio', type: 'text', selector: '#visit-admission dd:nth-child(4)' },
      { subsectionLabel: 'Contacto' },
      { id: 'phone', label: 'Teléfono', type: 'text', selector: '#contact-phone' },
      { id: 'email', label: 'Email', type: 'text', selector: '#contact-email' },
      { subsectionLabel: 'Dirección' },
      { id: 'address', label: 'Dirección', type: 'textarea', selector: '.visit-address', htmlMode: true },
    ]
  },

  /* ── CIERRE / CTA ───────────────────────────────────────── */
  {
    panel: 'cta', panelIcon: '💬', panelLabel: 'Cierre Emocional (CTA)',
    fields: [
      { id: 'cta-pre', label: 'Pre-heading', type: 'text', selector: '.cta-preheading' },
      { id: 'cta-heading', label: 'Título', type: 'textarea', selector: '#cta-heading', htmlMode: true },
      { id: 'cta-text', label: 'Texto principal', type: 'textarea', selector: '.cta-text' },
      { id: 'cta-btn', label: 'Texto del botón', type: 'text', selector: '#btn-cta-visita' },
    ]
  },

  /* ── FOOTER ─────────────────────────────────────────────── */
  {
    panel: 'footer', panelIcon: '📌', panelLabel: 'Footer',
    fields: [
      { id: 'footer-tagline', label: 'Tagline', type: 'text', selector: '.footer-tagline' },
      { id: 'footer-legal', label: 'Texto legal / ©', type: 'text', selector: '.footer-legal' },
      { id: 'footer-tribute', label: 'Frase de tributo', type: 'text', selector: '.footer-tribute' },
      { id: 'footer-addr', label: 'Dirección en footer', type: 'textarea', selector: '.footer-contact-group address p:first-child', htmlMode: true },
    ]
  },

  /* ── LÍNEA DE TIEMPO / HITOS ───────────────────────────── */
  {
    panel: 'timeline', panelIcon: '⏳', panelLabel: 'Línea de Tiempo / Hitos',
    fields: [
      { subsectionLabel: 'Espaciado' },
      {
        id: 'tl-item-gap', label: 'Espacio entre hitos', type: 'tri-slider',
        cssVar: '--tl-item-gap', unit: 'rem',
        desktop: { min: 0.5,  max: 6,   step: 0.25, defaultVal: 2   },
        tablet:  { min: 0.5,  max: 6,   step: 0.25, defaultVal: 2   },
        mobile:  { min: 0.25, max: 4,   step: 0.25, defaultVal: 1.5 },
      },
      {
        id: 'tl-col-gap', label: 'Separación año → texto', type: 'tri-slider',
        cssVar: '--tl-col-gap', unit: 'rem',
        desktop: { min: 0.25, max: 4,  step: 0.25, defaultVal: 1.5 },
        tablet:  { min: 0.25, max: 4,  step: 0.25, defaultVal: 1.5 },
        mobile:  { min: 0.25, max: 3,  step: 0.25, defaultVal: 1   },
      },
      {
        id: 'tl-year-col', label: 'Ancho columna del año', type: 'tri-slider',
        cssVar: '--tl-year-col', unit: 'rem',
        desktop: { min: 4,   max: 12,  step: 0.5,  defaultVal: 7.5 },
        tablet:  { min: 3,   max: 10,  step: 0.5,  defaultVal: 6   },
        mobile:  { min: 2,   max: 8,   step: 0.5,  defaultVal: 4.5 },
      },
      {
        id: 'tl-marker-size', label: 'Tamaño del punto •', type: 'tri-slider',
        cssVar: '--tl-marker-size', unit: 'px',
        desktop: { min: 6,  max: 24,  step: 1,   defaultVal: 10 },
        tablet:  { min: 6,  max: 24,  step: 1,   defaultVal: 10 },
        mobile:  { min: 4,  max: 18,  step: 1,   defaultVal: 8  },
      },
      { subsectionLabel: 'Tipografía' },
      {
        id: 'tl-year-size', label: 'Tamaño fuente año', type: 'tri-slider',
        cssVar: '--tl-year-size', unit: 'rem',
        desktop: { min: 0.75, max: 2.5,  step: 0.125, defaultVal: 1.25  },
        tablet:  { min: 0.75, max: 2.5,  step: 0.125, defaultVal: 1.25  },
        mobile:  { min: 0.75, max: 2,    step: 0.125, defaultVal: 1     },
      },
      {
        id: 'tl-event-size', label: 'Tamaño fuente título evento', type: 'tri-slider',
        cssVar: '--tl-event-size', unit: 'rem',
        desktop: { min: 0.75, max: 2.5,  step: 0.125, defaultVal: 1.25  },
        tablet:  { min: 0.75, max: 2.5,  step: 0.125, defaultVal: 1.25  },
        mobile:  { min: 0.75, max: 2,    step: 0.125, defaultVal: 1.125 },
      },
      {
        id: 'tl-desc-size', label: 'Tamaño fuente descripción', type: 'tri-slider',
        cssVar: '--tl-desc-size', unit: 'rem',
        desktop: { min: 0.7,  max: 1.5,  step: 0.0625, defaultVal: 0.9375 },
        tablet:  { min: 0.7,  max: 1.5,  step: 0.0625, defaultVal: 0.9375 },
        mobile:  { min: 0.7,  max: 1.25, step: 0.0625, defaultVal: 0.875  },
      },
    ]
  },

  /* ── TAMAÑOS ────────────────────────────────────────────── */
  {
    panel: 'tamanios', panelIcon: '📐', panelLabel: 'Tamaños y Espaciado',
    fields: [
      { subsectionLabel: 'Espacio vertical entre secciones' },
      {
        id: 'size-2xl', label: 'Espacio mayor (entre secciones)', type: 'tri-slider',
        cssVar: '--space-2xl', unit: 'rem',
        desktop: { min: 2,   max: 12,  step: 0.5,  defaultVal: 8   },
        tablet:  { min: 1,   max: 8,   step: 0.5,  defaultVal: 5   },
        mobile:  { min: 0.5, max: 5,   step: 0.5,  defaultVal: 3   },
      },
      {
        id: 'size-xl', label: 'Espacio XL (hero, grids)', type: 'tri-slider',
        cssVar: '--space-xl', unit: 'rem',
        desktop: { min: 2,   max: 10,  step: 0.5,  defaultVal: 6   },
        tablet:  { min: 1,   max: 8,   step: 0.5,  defaultVal: 4   },
        mobile:  { min: 0.5, max: 5,   step: 0.5,  defaultVal: 3.5 },
      },
      {
        id: 'size-lg', label: 'Espacio LG (interior secciones)', type: 'tri-slider',
        cssVar: '--space-lg', unit: 'rem',
        desktop: { min: 1,   max: 8,   step: 0.5,  defaultVal: 4   },
        tablet:  { min: 0.5, max: 6,   step: 0.5,  defaultVal: 3   },
        mobile:  { min: 0.5, max: 4,   step: 0.5,  defaultVal: 2   },
      },
      {
        id: 'size-md', label: 'Espacio MD (gaps, separaciones)', type: 'tri-slider',
        cssVar: '--space-md', unit: 'rem',
        desktop: { min: 0.5,  max: 4,  step: 0.25, defaultVal: 2   },
        tablet:  { min: 0.5,  max: 4,  step: 0.25, defaultVal: 2   },
        mobile:  { min: 0.25, max: 3,  step: 0.25, defaultVal: 1.5 },
      },
      { subsectionLabel: 'Imágenes' },
      {
        id: 'img-casa-h', label: 'Altura mín. imagen La Casa', type: 'tri-slider',
        cssVar: '--img-casa-min-h', unit: 'px',
        desktop: { min: 300, max: 900, step: 20, defaultVal: 600 },
        tablet:  { min: 200, max: 600, step: 20, defaultVal: 300 },
        mobile:  { min: 100, max: 400, step: 10, defaultVal: 220 },
      },
      {
        id: 'img-sister-h', label: 'Altura máx. fotos Hermanas', type: 'tri-slider',
        cssVar: '--img-sister-maxh', unit: 'px',
        desktop: { min: 150, max: 600, step: 10, defaultVal: 600 },
        tablet:  { min: 150, max: 500, step: 10, defaultVal: 400 },
        mobile:  { min: 80,  max: 350, step: 10, defaultVal: 200 },
      },
    ]
  },
];


/* ─────────────────────────────────────────────────────────────
   2. ESTADO GLOBAL
   ───────────────────────────────────────────────────────────── */
const state = {
  iframe: null,
  iframeDoc: null,
  originalValues: {},   // fieldId → valor original
  currentValues: {},    // fieldId → valor actual
  changesCount: 0,
  originalHtml: '',     // HTML completo del index.html al cargar
};

/* ─────────────────────────────────────────────────────────────
   3. UTILIDADES
   ───────────────────────────────────────────────────────────── */
function toast(msg, type = 'default', duration = 2800) {
  const el = document.getElementById('ed-toast');
  el.className = `ed-toast ${type}`;
  const icon = type === 'success'
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
    : type === 'error'
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  el.innerHTML = icon + msg;
  el.classList.add('show');
  clearTimeout(el._tid);
  el._tid = setTimeout(() => el.classList.remove('show'), duration);
}

function updateChangeBadge() {
  const badge = document.getElementById('ed-changes-badge');
  const countEl = document.getElementById('ed-changes-count');
  state.changesCount = Object.keys(state.currentValues).filter(
    id => state.currentValues[id] !== state.originalValues[id]
  ).length;
  countEl.textContent = state.changesCount;
  badge.style.display = state.changesCount > 0 ? 'flex' : 'none';
}

function markFieldChanged(fieldId, isChanged) {
  const row = document.getElementById(`ed-field-row-${fieldId}`);
  if (!row) return;
  row.classList.toggle('changed', isChanged);

  // Mark panel dot
  const panelEl = row.closest('.ed-panel');
  if (panelEl) {
    const hasAnyChange = [...panelEl.querySelectorAll('.ed-field.changed')].length > 0;
    panelEl.classList.toggle('has-changes', hasAnyChange);
  }
}

/* ─────────────────────────────────────────────────────────────
   4. LEER DEL IFRAME
   ───────────────────────────────────────────────────────────── */
function readFromIframe(field) {
  const doc = state.iframeDoc;
  if (!doc) return '';

  if (field.special === 'page-title') {
    return doc.title || '';
  }
  if (field.special === 'meta-desc') {
    const meta = doc.querySelector('meta[name="description"]');
    return meta ? meta.getAttribute('content') : '';
  }
  if (field.type === 'color') return ''; // colors read from CSS vars
  if (field.type === 'image') {
    const el = doc.querySelector(field.selector);
    return el ? (el.src || el.getAttribute('src') || '') : '';
  }

  const el = doc.querySelector(field.selector);
  if (!el) return '';
  return field.htmlMode ? el.innerHTML.trim() : el.textContent.trim();
}

/* ─────────────────────────────────────────────────────────────
   5. ESCRIBIR AL IFRAME
   ───────────────────────────────────────────────────────────── */
function writeToIframe(field, value) {
  const doc = state.iframeDoc;
  if (!doc) return;

  if (field.special === 'page-title') {
    doc.title = value;
    return;
  }
  if (field.special === 'meta-desc') {
    const meta = doc.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', value);
    return;
  }
  if (field.type === 'color') {
    // Write CSS variable to iframe's root
    doc.documentElement.style.setProperty(field.cssVar, value);
    return;
  }
  if (field.type === 'image') {
    const el = doc.querySelector(field.selector);
    if (el) el.src = value;
    return;
  }

  const selector = field.multiple
    ? doc.querySelectorAll(field.selector)
    : [doc.querySelector(field.selector)];

  selector.forEach(el => {
    if (!el) return;
    if (field.htmlMode) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });
}

/* ─────────────────────────────────────────────────────────────
   6. CREAR CAMPOS EN EL SIDEBAR
   ───────────────────────────────────────────────────────────── */
function buildTextField(field) {
  const orig = readFromIframe(field);
  state.originalValues[field.id] = orig;
  state.currentValues[field.id] = orig;

  const row = document.createElement('div');
  row.className = 'ed-field';
  row.id = `ed-field-row-${field.id}`;
  row.dataset.label = field.label.toLowerCase();

  const labelRow = document.createElement('div');
  labelRow.className = 'ed-field-label';

  const lbl = document.createElement('span');
  lbl.className = 'ed-label-txt';
  lbl.textContent = field.label;

  const resetBtn = document.createElement('button');
  resetBtn.className = 'ed-field-reset';
  resetBtn.textContent = 'Restaurar';
  resetBtn.title = 'Restaurar valor original';

  labelRow.appendChild(lbl);
  labelRow.appendChild(resetBtn);
  row.appendChild(labelRow);

  const isTextarea = field.type === 'textarea';
  const input = document.createElement(isTextarea ? 'textarea' : 'input');
  input.className = isTextarea ? 'ed-textarea' : 'ed-input';
  input.value = orig;
  if (!isTextarea) input.type = 'text';
  input.spellcheck = false;

  input.addEventListener('input', () => {
    const val = input.value;
    state.currentValues[field.id] = val;
    writeToIframe(field, val);
    const changed = val !== state.originalValues[field.id];
    markFieldChanged(field.id, changed);
    updateChangeBadge();
  });

  resetBtn.addEventListener('click', () => {
    input.value = state.originalValues[field.id];
    state.currentValues[field.id] = state.originalValues[field.id];
    writeToIframe(field, state.originalValues[field.id]);
    markFieldChanged(field.id, false);
    updateChangeBadge();
    toast('Campo restaurado', 'default', 1800);
  });

  row.appendChild(input);
  return row;
}

function buildColorField(field) {
  // Read default from CSS var in iframe
  const doc = state.iframeDoc;
  let orig = field.defaultVal;
  if (doc) {
    const computed = getComputedStyle(doc.documentElement).getPropertyValue(field.cssVar).trim();
    if (computed) orig = computed;
  }
  state.originalValues[field.id] = orig;
  state.currentValues[field.id] = orig;

  const row = document.createElement('div');
  row.className = 'ed-field';
  row.id = `ed-field-row-${field.id}`;
  row.dataset.label = field.label.toLowerCase();

  const labelRow = document.createElement('div');
  labelRow.className = 'ed-field-label';
  const lbl = document.createElement('span');
  lbl.className = 'ed-label-txt';
  lbl.textContent = field.label;
  const resetBtn = document.createElement('button');
  resetBtn.className = 'ed-field-reset';
  resetBtn.textContent = 'Restaurar';
  labelRow.appendChild(lbl);
  labelRow.appendChild(resetBtn);
  row.appendChild(labelRow);

  const colorRow = document.createElement('div');
  colorRow.className = 'ed-color-row';

  // Swatch
  const swatch = document.createElement('div');
  swatch.className = 'ed-color-swatch';
  const colInput = document.createElement('input');
  colInput.type = 'color';
  colInput.value = orig;
  const preview = document.createElement('div');
  preview.className = 'ed-color-preview';
  preview.style.background = orig;
  swatch.appendChild(colInput);
  swatch.appendChild(preview);

  // Hex input
  const hexInput = document.createElement('input');
  hexInput.className = 'ed-color-hex';
  hexInput.type = 'text';
  hexInput.value = orig;
  hexInput.maxLength = 7;
  hexInput.spellcheck = false;

  // Name label
  const nameLbl = document.createElement('span');
  nameLbl.className = 'ed-color-name';
  nameLbl.textContent = field.cssVar;

  colorRow.appendChild(swatch);
  colorRow.appendChild(hexInput);
  colorRow.appendChild(nameLbl);
  row.appendChild(colorRow);

  function applyColor(val) {
    if (!/^#[0-9A-Fa-f]{6}$/.test(val)) return;
    colInput.value = val;
    hexInput.value = val;
    preview.style.background = val;
    state.currentValues[field.id] = val;
    writeToIframe(field, val);
    const changed = val !== state.originalValues[field.id];
    markFieldChanged(field.id, changed);
    updateChangeBadge();
  }

  colInput.addEventListener('input', () => applyColor(colInput.value));
  hexInput.addEventListener('input', () => {
    let v = hexInput.value;
    if (!v.startsWith('#')) v = '#' + v;
    applyColor(v);
  });

  resetBtn.addEventListener('click', () => {
    applyColor(state.originalValues[field.id]);
    markFieldChanged(field.id, false);
    updateChangeBadge();
    toast('Color restaurado', 'default', 1800);
  });

  return row;
}

function buildImageField(field) {
  const orig = readFromIframe(field);
  state.originalValues[field.id] = orig;
  state.currentValues[field.id] = orig;

  const row = document.createElement('div');
  row.className = 'ed-field';
  row.id = `ed-field-row-${field.id}`;
  row.dataset.label = field.label.toLowerCase();

  const labelRow = document.createElement('div');
  labelRow.className = 'ed-field-label';
  const lbl = document.createElement('span');
  lbl.className = 'ed-label-txt';
  lbl.textContent = field.label;
  const resetBtn = document.createElement('button');
  resetBtn.className = 'ed-field-reset';
  resetBtn.textContent = 'Restaurar';
  labelRow.appendChild(lbl);
  labelRow.appendChild(resetBtn);
  row.appendChild(labelRow);

  const picker = document.createElement('div');
  picker.className = 'ed-img-picker';
  if (orig) picker.classList.add('has-image');

  const previewArea = document.createElement('div');
  previewArea.className = 'ed-img-preview';

  const thumb = document.createElement('img');
  thumb.className = 'ed-img-thumb' + (orig ? ' visible' : '');
  thumb.src = orig || '';
  thumb.alt = 'Previsualización';

  const placeholder = document.createElement('div');
  placeholder.className = 'ed-img-placeholder';
  placeholder.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Subir imagen<br/>o pegar URL</span>`;

  const hoverOverlay = document.createElement('div');
  hoverOverlay.className = 'ed-img-hover-overlay';
  hoverOverlay.innerHTML = `<span>Cambiar imagen</span>`;

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.className = 'ed-img-file-input';

  previewArea.appendChild(thumb);
  previewArea.appendChild(placeholder);
  previewArea.appendChild(hoverOverlay);
  previewArea.appendChild(fileInput);

  // URL row
  const urlWrap = document.createElement('div');
  urlWrap.className = 'ed-img-url-wrap';
  const urlLabel = document.createElement('span');
  urlLabel.className = 'ed-img-url-label';
  urlLabel.textContent = 'URL';
  const urlInput = document.createElement('input');
  urlInput.className = 'ed-img-url-input';
  urlInput.type = 'text';
  urlInput.placeholder = 'https://…';
  urlInput.value = orig || '';
  urlInput.spellcheck = false;
  urlWrap.appendChild(urlLabel);
  urlWrap.appendChild(urlInput);

  picker.appendChild(previewArea);
  picker.appendChild(urlWrap);
  row.appendChild(picker);

  function setImage(url) {
    thumb.src = url;
    thumb.classList.add('visible');
    picker.classList.add('has-image');
    urlInput.value = url;
    state.currentValues[field.id] = url;
    writeToIframe(field, url);
    const changed = url !== state.originalValues[field.id];
    markFieldChanged(field.id, changed);
    updateChangeBadge();
  }

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setImage(e.target.result);
    reader.readAsDataURL(file);
  });

  urlInput.addEventListener('input', () => {
    const url = urlInput.value.trim();
    if (url) setImage(url);
  });

  resetBtn.addEventListener('click', () => {
    setImage(state.originalValues[field.id]);
    markFieldChanged(field.id, false);
    updateChangeBadge();
    toast('Imagen restaurada', 'default', 1800);
  });

  return row;
}

function buildField(field) {
  if (field.type === 'color')        return buildColorField(field);
  if (field.type === 'image')        return buildImageField(field);
  if (field.type === 'sister-image') return buildSisterImageField(field);
  if (field.type === 'tri-slider')   return buildTriSliderField(field);
  if (field.type === 'slider')       return buildTriSliderField(field); // legacy alias
  if (field.type === 'font-slider')  return buildTriSliderField(field); // legacy alias
  return buildTextField(field);
}

/* ─────────────────────────────────────────────────────────────
   6c. CAMPO SLIDER (tamaños / espaciado)
   Controla CSS custom properties. Exporta una etiqueta <style> con
   media queries para mantener el comportamiento responsivo.
   ───────────────────────────────────────────────────────────── */
function calcResponsive(val, pct, minVal) {
  return Math.max(Math.round(val * pct * 4) / 4, minVal);
}

function applySizesToIframe() {
  const doc = state.iframeDoc;
  if (!doc) return;

  // Collect values per viewport for all tri-slider fields
  const desktopVars = {};
  const tabletVars  = {};
  const mobileVars  = {};

  FIELD_MAP.forEach(panel => {
    (panel.fields || []).forEach(f => {
      if (f.type === 'tri-slider' && f.cssVar) {
        const vpMap = { desktop: desktopVars, tablet: tabletVars, mobile: mobileVars };
        ['desktop', 'tablet', 'mobile'].forEach(vp => {
          const key = `${f.id}-${vp}`;
          if (state.currentValues[key] !== undefined) {
            vpMap[vp][f.cssVar] = { val: state.currentValues[key], unit: f.unit };
          }
        });
      }
    });
  });

  const buildVarBlock = (vars) =>
    Object.entries(vars)
      .map(([v, { val, unit }]) => `  ${v}: ${val}${unit};`)
      .join('\n');

  const parts = ['/* Editor Visual — Tamaños personalizados */'];
  if (Object.keys(desktopVars).length)
    parts.push(`:root {\n${buildVarBlock(desktopVars)}\n}`);
  if (Object.keys(tabletVars).length)
    parts.push(`@media (max-width: 900px) {\n  :root {\n${buildVarBlock(tabletVars)}\n  }\n}`);
  if (Object.keys(mobileVars).length)
    parts.push(`@media (max-width: 600px) {\n  :root {\n${buildVarBlock(mobileVars)}\n  }\n}`);

  let tag = doc.getElementById('ed-custom-sizes');
  if (!tag) {
    tag = doc.createElement('style');
    tag.id = 'ed-custom-sizes';
    doc.head.appendChild(tag);
  }
  tag.textContent = parts.join('\n');
}

function buildTriSliderField(field) {
  const doc = state.iframeDoc;
  const viewports = ['desktop', 'tablet', 'mobile'];
  const vpLabels = { desktop: '🖥 Escritorio', tablet: 'Tablet', mobile: 'Móvil' };

  // Read initial values: desktop from computed CSS, tablet/mobile from defaults
  const initVals = {};
  viewports.forEach(vp => {
    let val = field[vp].defaultVal;
    if (vp === 'desktop' && doc) {
      const computed = getComputedStyle(doc.documentElement)
        .getPropertyValue(field.cssVar).trim();
      if (computed) val = parseFloat(computed) || val;
    }
    initVals[vp] = val;
    state.originalValues[`${field.id}-${vp}`] = val;
    state.currentValues[`${field.id}-${vp}`]  = val;
  });

  /* ── Row container ── */
  const row = document.createElement('div');
  row.className = 'ed-field';
  row.id = `ed-field-row-${field.id}`;
  row.dataset.label = field.label.toLowerCase();

  /* ── Label + reset ── */
  const labelRow = document.createElement('div');
  labelRow.className = 'ed-field-label';
  const lbl = document.createElement('span');
  lbl.className = 'ed-label-txt';
  lbl.textContent = field.label;
  const resetBtn = document.createElement('button');
  resetBtn.className = 'ed-field-reset';
  resetBtn.textContent = 'Restaurar';
  labelRow.appendChild(lbl);
  labelRow.appendChild(resetBtn);
  row.appendChild(labelRow);

  /* ── Tab bar ── */
  const tabBar = document.createElement('div');
  tabBar.className = 'ed-vp-tabs';
  viewports.forEach(vp => {
    const tab = document.createElement('button');
    tab.className = 'ed-vp-tab' + (vp === 'desktop' ? ' active' : '');
    tab.dataset.vp = vp;
    tab.textContent = vpLabels[vp];
    tabBar.appendChild(tab);
  });
  row.appendChild(tabBar);

  /* ── Slider panels ── */
  const content = document.createElement('div');
  content.className = 'ed-tri-slider-content';

  const sliderRefs = {};  // store {slider, valueDisplay} per vp

  viewports.forEach(vp => {
    const cfg  = field[vp];
    const wrap = document.createElement('div');
    wrap.className = 'ed-tri-slider-wrap' + (vp === 'desktop' ? ' active' : '');
    wrap.dataset.vp = vp;

    /* slider row */
    const sliderRow = document.createElement('div');
    sliderRow.className = 'ed-slider-row';

    const minLbl = document.createElement('span');
    minLbl.className = 'ed-slider-bound';
    minLbl.textContent = cfg.min + field.unit;

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.className = 'ed-slider';
    slider.min  = cfg.min;
    slider.max  = cfg.max;
    slider.step = cfg.step;
    slider.value = initVals[vp];

    const maxLbl = document.createElement('span');
    maxLbl.className = 'ed-slider-bound';
    maxLbl.textContent = cfg.max + field.unit;

    sliderRow.appendChild(minLbl);
    sliderRow.appendChild(slider);
    sliderRow.appendChild(maxLbl);

    /* value display */
    const valueDisplay = document.createElement('div');
    valueDisplay.className = 'ed-tri-slider-value';
    valueDisplay.textContent = initVals[vp] + field.unit;

    wrap.appendChild(sliderRow);
    wrap.appendChild(valueDisplay);
    content.appendChild(wrap);

    sliderRefs[vp] = { slider, valueDisplay };

    /* listener — cada viewport es completamente independiente */
    slider.addEventListener('input', () => {
      const num = parseFloat(slider.value);
      valueDisplay.textContent = num + field.unit;
      state.currentValues[`${field.id}-${vp}`] = num;
      applySizesToIframe();
      const anyChanged = viewports.some(
        v => state.currentValues[`${field.id}-${v}`] !== state.originalValues[`${field.id}-${v}`]
      );
      markFieldChanged(field.id, anyChanged);
      updateChangeBadge();
    });
  });

  row.appendChild(content);

  /* ── Tab switching ── */
  tabBar.querySelectorAll('.ed-vp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabBar.querySelectorAll('.ed-vp-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      content.querySelectorAll('.ed-tri-slider-wrap').forEach(w => w.classList.remove('active'));
      content.querySelector(`[data-vp="${tab.dataset.vp}"]`).classList.add('active');
    });
  });

  /* ── Reset (restaura los 3 viewports) ── */
  resetBtn.addEventListener('click', () => {
    viewports.forEach(vp => {
      const orig = state.originalValues[`${field.id}-${vp}`];
      state.currentValues[`${field.id}-${vp}`] = orig;
      sliderRefs[vp].slider.value = orig;
      sliderRefs[vp].valueDisplay.textContent = orig + field.unit;
    });
    applySizesToIframe();
    markFieldChanged(field.id, false);
    updateChangeBadge();
    toast('Tamaños restaurados', 'default', 1800);
  });

  return row;
}


/* ─────────────────────────────────────────────────────────────
   6b. CAMPO DE FOTO DE HERMANA
   ───────────────────────────────────────────────────────────── */
function buildSisterImageField(field) {
  const doc = state.iframeDoc;
  const imgEl = doc ? doc.querySelector(field.selector) : null;
  const orig = (imgEl && imgEl.src && !imgEl.src.endsWith('/editor.html')) ? imgEl.src : '';

  state.originalValues[field.id] = orig;
  state.currentValues[field.id] = orig;

  const row = document.createElement('div');
  row.className = 'ed-field';
  row.id = `ed-field-row-${field.id}`;
  row.dataset.label = field.label.toLowerCase();

  const labelRow = document.createElement('div');
  labelRow.className = 'ed-field-label';
  const lbl = document.createElement('span');
  lbl.className = 'ed-label-txt';
  lbl.textContent = field.label;
  const resetBtn = document.createElement('button');
  resetBtn.className = 'ed-field-reset';
  resetBtn.textContent = 'Quitar foto';
  labelRow.appendChild(lbl);
  labelRow.appendChild(resetBtn);
  row.appendChild(labelRow);

  const picker = document.createElement('div');
  picker.className = 'ed-img-picker' + (orig ? ' has-image' : '');

  const previewArea = document.createElement('div');
  previewArea.className = 'ed-img-preview';

  const thumb = document.createElement('img');
  thumb.className = 'ed-img-thumb' + (orig ? ' visible' : '');
  thumb.src = orig || '';
  thumb.alt = 'Vista previa';

  const placeholder = document.createElement('div');
  placeholder.className = 'ed-img-placeholder';
  placeholder.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Subir foto<br/>o pegar URL</span>`;

  const hoverOverlay = document.createElement('div');
  hoverOverlay.className = 'ed-img-hover-overlay';
  hoverOverlay.innerHTML = `<span>Cambiar foto</span>`;

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.className = 'ed-img-file-input';

  previewArea.appendChild(thumb);
  previewArea.appendChild(placeholder);
  previewArea.appendChild(hoverOverlay);
  previewArea.appendChild(fileInput);

  const urlWrap = document.createElement('div');
  urlWrap.className = 'ed-img-url-wrap';
  const urlLabel = document.createElement('span');
  urlLabel.className = 'ed-img-url-label';
  urlLabel.textContent = 'URL';
  const urlInput = document.createElement('input');
  urlInput.className = 'ed-img-url-input';
  urlInput.type = 'text';
  urlInput.placeholder = 'https://… o ./img/foto.jpg';
  urlInput.value = orig || '';
  urlInput.spellcheck = false;
  urlWrap.appendChild(urlLabel);
  urlWrap.appendChild(urlInput);

  picker.appendChild(previewArea);
  picker.appendChild(urlWrap);
  row.appendChild(picker);

  function setPhoto(url) {
    const iframeImg = state.iframeDoc ? state.iframeDoc.querySelector(field.selector) : null;
    if (iframeImg) {
      if (url) {
        iframeImg.src = url;
        // Wait for load to add class
        iframeImg.onload = () => iframeImg.classList.add('loaded');
        iframeImg.onerror = () => iframeImg.classList.remove('loaded');
      } else {
        iframeImg.src = '';
        iframeImg.classList.remove('loaded');
      }
    }
    thumb.src = url;
    thumb.classList.toggle('visible', !!url);
    picker.classList.toggle('has-image', !!url);
    urlInput.value = url;
    state.currentValues[field.id] = url;
    const changed = url !== state.originalValues[field.id];
    markFieldChanged(field.id, changed);
    updateChangeBadge();
  }

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setPhoto(e.target.result);
    reader.readAsDataURL(file);
  });

  urlInput.addEventListener('input', () => {
    const url = urlInput.value.trim();
    setPhoto(url);
  });

  resetBtn.addEventListener('click', () => {
    setPhoto('');
    markFieldChanged(field.id, false);
    updateChangeBadge();
    toast('Foto eliminada — fallback activo', 'default', 2000);
  });

  return row;
}

/* ─────────────────────────────────────────────────────────────
   7. CONSTRUIR PANELES
   ───────────────────────────────────────────────────────────── */
function buildPanels() {
  const container = document.getElementById('ed-panels');
  container.innerHTML = '';

  FIELD_MAP.forEach((panelDef, pIdx) => {
    const panelEl = document.createElement('div');
    panelEl.className = 'ed-panel' + (pIdx === 0 ? ' open' : '');
    panelEl.id = `ed-panel-${panelDef.panel}`;

    // Header
    const header = document.createElement('div');
    header.className = 'ed-panel-header';
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', pIdx === 0 ? 'true' : 'false');
    header.setAttribute('tabindex', '0');
    header.innerHTML = `
      <span class="ed-panel-icon">${panelDef.panelIcon}</span>
      <span class="ed-panel-title">${panelDef.panelLabel}</span>
      <span class="ed-panel-changed-dot"></span>
      <svg class="ed-panel-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    `;
    header.addEventListener('click', () => togglePanel(panelEl, header));
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePanel(panelEl, header); }
    });

    // Body
    const body = document.createElement('div');
    body.className = 'ed-panel-body';

    let currentSubsection = null;

    panelDef.fields.forEach(field => {
      if (field.subsectionLabel) {
        const sub = document.createElement('div');
        sub.className = 'ed-subsection-title';
        sub.textContent = field.subsectionLabel;
        body.appendChild(sub);
        currentSubsection = sub;
        return;
      }
      if (!field.id) return;
      const fieldEl = buildField(field);
      body.appendChild(fieldEl);
    });

    panelEl.appendChild(header);
    panelEl.appendChild(body);
    container.appendChild(panelEl);
  });
}

function togglePanel(panelEl, header) {
  const isOpen = panelEl.classList.contains('open');
  panelEl.classList.toggle('open', !isOpen);
  header.setAttribute('aria-expanded', String(!isOpen));
}

/* ─────────────────────────────────────────────────────────────
   8. BÚSQUEDA DE CAMPOS
   ───────────────────────────────────────────────────────────── */
function initSearch() {
  const searchInput = document.getElementById('ed-search');
  const clearBtn = document.getElementById('ed-search-clear');
  const noResults = document.getElementById('ed-no-results');
  const termEl = document.getElementById('ed-search-term');

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    clearBtn.style.display = q ? 'block' : 'none';

    let totalVisible = 0;

    document.querySelectorAll('.ed-panel').forEach(panel => {
      let panelVisible = 0;
      panel.querySelectorAll('.ed-field').forEach(field => {
        const label = (field.dataset.label || '').toLowerCase();
        const match = !q || label.includes(q);
        field.classList.toggle('hidden-search', !match);
        if (match) panelVisible++;
      });

      // Also show subsection titles only if fields below them are visible
      let lastSubTitle = null;
      panel.querySelectorAll('.ed-panel-body > *').forEach(el => {
        if (el.classList.contains('ed-subsection-title')) {
          lastSubTitle = el;
          el.style.display = '';
        } else if (el.classList.contains('ed-field')) {
          if (lastSubTitle && q) {
            // Check that at least one visible field follows
          }
        }
      });

      panel.classList.toggle('all-hidden', panelVisible === 0 && q !== '');
      if (panelVisible > 0 && q) panel.classList.add('open');
      totalVisible += panelVisible;
    });

    const noMatch = totalVisible === 0 && q !== '';
    noResults.style.display = noMatch ? 'block' : 'none';
    if (noMatch) termEl.textContent = q;
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
  });
}

/* ─────────────────────────────────────────────────────────────
   9. VIEWPORT SWITCHING
   ───────────────────────────────────────────────────────────── */
function initViewportButtons() {
  const btns = document.querySelectorAll('.ed-vp-btn');
  const container = document.getElementById('ed-iframe-container');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const width = btn.dataset.width;
      container.classList.remove('viewport-tablet', 'viewport-mobile');

      if (width === '100%') {
        container.style.removeProperty('--vp-width');
      } else if (btn.id === 'vp-tablet') {
        container.classList.add('viewport-tablet');
        container.style.setProperty('--vp-width', '768px');
      } else if (btn.id === 'vp-mobile') {
        container.classList.add('viewport-mobile');
        container.style.setProperty('--vp-width', '390px');
      }
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   10. EXPORTAR HTML
   ───────────────────────────────────────────────────────────── */
function initExport() {
  document.getElementById('btn-export').addEventListener('click', () => {
    const doc = state.iframeDoc;
    if (!doc) { toast('El editor aún no está listo', 'error'); return; }

    // Serialize current iframe DOM
    const doctype = '<!DOCTYPE html>\n';
    const html = doc.documentElement.outerHTML;
    const blob = new Blob([doctype + html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);

    toast('✓ index.html descargado con todos los cambios', 'success', 3500);
  });
}

/* ─────────────────────────────────────────────────────────────
   11. RECARGAR IFRAME
   ───────────────────────────────────────────────────────────── */
function initReload() {
  document.getElementById('btn-reload').addEventListener('click', () => {
    const changed = state.changesCount;
    if (changed > 0) {
      const ok = confirm(`Tienes ${changed} cambio(s) sin descargar. ¿Recargar y perder los cambios?`);
      if (!ok) return;
    }
    const iframe = document.getElementById('site-iframe');
    iframe.src = iframe.src; // force reload
    toast('Vista previa recargada', 'default', 2000);
  });
}

/* ─────────────────────────────────────────────────────────────
   12. INICIALIZACION DEL IFRAME
   ───────────────────────────────────────────────────────────── */
function initIframe() {
  const iframe = document.getElementById('site-iframe');
  const statusEl = document.getElementById('ed-iframe-status');
  state.iframe = iframe;

  iframe.addEventListener('load', () => {
    try {
      state.iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      statusEl.classList.add('ready');
      statusEl.innerHTML = `<span class="ed-status-dot"></span>Listo`;

      // Store original HTML for reset purposes
      state.originalHtml = '<!DOCTYPE html>\n' + state.iframeDoc.documentElement.outerHTML;

      // Build panels now that iframe is ready
      buildPanels();

      // Smooth fade in
      document.getElementById('ed-panels').style.opacity = '0';
      requestAnimationFrame(() => {
        document.getElementById('ed-panels').style.transition = 'opacity 400ms ease';
        document.getElementById('ed-panels').style.opacity = '1';
      });

      toast('Editor listo — comienza a editar', 'success', 2500);
    } catch (err) {
      statusEl.innerHTML = `<span class="ed-status-dot" style="background:#ff5f57"></span>Error de acceso`;
      toast('No se pudo acceder al iframe (CORS)', 'error', 4000);
      console.error('[editor.js]', err);
    }
  });

  iframe.addEventListener('error', () => {
    statusEl.innerHTML = `<span class="ed-status-dot" style="background:#ff5f57"></span>Error al cargar`;
    toast('No se pudo cargar index.html', 'error', 4000);
  });
}

/* ─────────────────────────────────────────────────────────────
   13. KEYBOARD SHORTCUTS
   ───────────────────────────────────────────────────────────── */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    // Ctrl+S / Cmd+S → Export
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      document.getElementById('btn-export').click();
    }
    // Ctrl+Shift+R → Reload
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'r') {
      e.preventDefault();
      document.getElementById('btn-reload').click();
    }
  });
}

/* ─────────────────────────────────────────────────────────────
   14. ARRANQUE
   ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initIframe();
  initViewportButtons();
  initExport();
  initReload();
  initSearch();
  initKeyboardShortcuts();
});

console.log(
  '%cEditor Visual — Casa Museo Hermanas Mirabal',
  'font-family: Inter, sans-serif; font-size: 14px; color: #4E7A68; font-weight: 600;'
);
