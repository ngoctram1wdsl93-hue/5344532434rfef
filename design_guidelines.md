{
  "project": {
    "name": "PNEVMO — Mobile/Tablet Responsive Blueprint",
    "goal": "Зберегти існуючу Monochrome Industrial Premium дизайн-систему та зробити повний mobile-first адаптив (320/375/414 + tablet 768/1024) без зміни копірайту та без поломки функціоналу.",
    "non_negotiables": [
      "Не змінювати тексти/копірайт.",
      "Немає горизонтального скролу на мобільних.",
      "Touch targets мінімум 44×44px (особливо Header, StickyMobileCTA, FloatingContact, фільтри, accordion).",
      "CTA кнопки завжди доступні (hero + sticky mobile).",
      "Safe-area-inset підтримка для iOS (notch/home indicator).",
      "React .js компоненти (не .tsx).",
      "Усі інтерактивні та ключові інфо-елементи мають data-testid (kebab-case)."
    ]
  },

  "design_tokens": {
    "palette_locked": {
      "bg": "#F7F7F5",
      "surface": "#FFFFFF",
      "muted": "#F1F1EF",
      "text": "#111111",
      "text_secondary": "#666666",
      "border": "#E7E7E7",
      "cta_primary": "#111111",
      "cta_primary_hover": "#2A2A2A"
    },
    "typography_locked": {
      "heading": "Space Grotesk",
      "body": "Inter"
    },
    "radii_locked": {
      "cards": "24–28px",
      "buttons": "14–16px"
    },
    "add_css_tokens_in_index_css": {
      "note": "Не міняємо палітру, але додаємо mobile-safe токени для відступів/висот/контейнерів. Це зменшує ризик роз’їзду секцій.",
      "tokens": {
        "--container-pad-x": "16px",
        "--container-pad-x-sm": "24px",
        "--tap": "44px",
        "--header-h": "64px",
        "--sticky-cta-h": "64px",
        "--section-y-mobile": "48px",
        "--section-y-tablet": "64px",
        "--section-y-desktop": "96px"
      }
    }
  },

  "global_responsive_fixes": {
    "container_and_spacing": {
      "problem": [
        "На mobile часто завеликі вертикальні відступи (section-y = py-16) і великі gap у грідах.",
        "Контент інколи виглядає ‘розтягнутим’ і CTA може опинятись нижче фолду."
      ],
      "change": {
        "recommendation": "Перевести секції на mobile-first: менше py на <640px, більше на lg.",
        "tailwind": {
          "container-page": "mx-auto max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 (залишити)",
          "section-y": "py-12 sm:py-16 lg:py-24 (замість py-16 sm:py-20 lg:py-28)",
          "section-y-sm": "py-8 sm:py-12 lg:py-16 (замість py-10 sm:py-14 lg:py-20)",
          "default_gaps": "gap-4 sm:gap-6 lg:gap-8 (у більшості грідів/стеків)"
        }
      }
    },

    "typography_scaling": {
      "problem": [
        "Hero heading ~84px на mobile — зашкалює, ламає перенос, провокує overflow.",
        "Дрібні підписи/лейбли можуть бути <14px і погано читатись."
      ],
      "change": {
        "hero_h1": "text-4xl sm:text-5xl lg:text-6xl leading-[0.98] (використати існуючий .display-heading + tailwind розміри)",
        "section_h2": "text-2xl sm:text-3xl lg:text-4xl",
        "body": "text-sm sm:text-base",
        "fineprint": "text-xs sm:text-sm",
        "max_width": "max-w-[22ch] sm:max-w-[28ch] lg:max-w-[34ch] для великих заголовків, щоб перенос був контрольований"
      }
    },

    "no_horizontal_scroll": {
      "checklist": [
        "На root контейнерах: overflow-x-hidden (обережно: не на елементах зі sticky).",
        "На грідах: min-w-0 для flex дітей, щоб текст не розпирає.",
        "На зображеннях: w-full h-auto object-cover + aspect-*.",
        "На badge/eyebrow: flex-wrap + gap-2.",
        "На таблицях/адмін: ScrollArea або overflow-x-auto тільки для таблиць."
      ],
      "tailwind_snippets": {
        "page_wrapper": "min-h-screen overflow-x-hidden",
        "flex_child": "min-w-0",
        "long_text": "break-words [overflow-wrap:anywhere]"
      }
    },

    "safe_area_insets": {
      "problem": "StickyMobileCTA/FloatingContact можуть перекривати home indicator на iOS.",
      "change": {
        "tailwind": "pb-[calc(env(safe-area-inset-bottom)+16px)] для контейнера sticky CTA; bottom-[env(safe-area-inset-bottom)] для floating",
        "css": "додати утиліту .safe-bottom { padding-bottom: calc(env(safe-area-inset-bottom) + 16px); }"
      }
    },

    "touch_targets": {
      "rule": "Усі клікабельні елементи мінімум h-11 w-11 (44px).",
      "apply_to": [
        "Header: burger, CTA, nav links",
        "Accordion triggers",
        "Catalog filters (chips, checkboxes, selects)",
        "Product gallery thumbs",
        "FloatingContact items",
        "Pagination"
      ],
      "tailwind": {
        "icon_button": "h-11 w-11 inline-flex items-center justify-center",
        "link": "py-3",
        "accordion_trigger": "py-4"
      }
    }
  },

  "section_blueprints": {
    "Header": {
      "issues": [
        "Sticky header + mobile menu може перекривати контент/anchor scroll.",
        "Nav items на mobile часто занадто дрібні або близько один до одного.",
        "CTA може зникати або бути не в thumb-zone."
      ],
      "changes": [
        {
          "target": "Header wrapper",
          "tailwind": "sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-[#E7E7E7]",
          "notes": "backdrop тільки легкий, без градієнтів."
        },
        {
          "target": "Inner layout",
          "tailwind": "container-page h-16 sm:h-[72px] flex items-center justify-between gap-3",
          "data_testid": "header"
        },
        {
          "target": "Burger button",
          "tailwind": "h-11 w-11 rounded-[14px] border border-[#E7E7E7] bg-white hover:bg-[#F1F1EF]",
          "data_testid": "header-mobile-menu-button"
        },
        {
          "target": "Desktop nav",
          "tailwind": "hidden lg:flex items-center gap-6",
          "data_testid": "header-desktop-nav"
        },
        {
          "target": "Mobile menu panel (Sheet/Drawer)",
          "tailwind": "lg:hidden",
          "component": "ui/sheet.jsx або ui/drawer.jsx",
          "notes": "Меню: великі лінки py-3, розділювачі Separator, CTA кнопка внизу.",
          "data_testid": "header-mobile-menu"
        },
        {
          "target": "Header CTA",
          "tailwind": "hidden sm:inline-flex btn-primary h-11 px-5",
          "notes": "На xs (320) можна сховати CTA в header і покладатись на StickyMobileCTA після скролу.",
          "data_testid": "header-primary-cta"
        }
      ]
    },

    "Hero": {
      "issues": [
        "H1 завеликий на mobile.",
        "Фото може бути занадто високим або обрізатись неконтрольовано.",
        "Trust badges можуть не влазити в ряд і створювати overflow."
      ],
      "changes": [
        {
          "target": "Hero section",
          "tailwind": "hero-bg section-y-sm sm:section-y relative overflow-hidden",
          "notes": "Додати bg-grain тільки як декоративний overlay (не більше 20% viewport).",
          "data_testid": "hero-section"
        },
        {
          "target": "Hero grid",
          "tailwind": "container-page grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start",
          "notes": "Mobile: stack; Desktop: текст 6/12, фото 6/12."
        },
        {
          "target": "Text column",
          "tailwind": "lg:col-span-6 min-w-0",
          "notes": "min-w-0 щоб довгі слова не розпирали."
        },
        {
          "target": "H1",
          "tailwind": "display-heading hero-heading-shadow text-4xl sm:text-5xl lg:text-6xl max-w-[22ch] sm:max-w-[28ch]",
          "data_testid": "hero-heading"
        },
        {
          "target": "Subheading",
          "tailwind": "mt-4 text-sm sm:text-base text-[#666666] max-w-prose",
          "data_testid": "hero-subheading"
        },
        {
          "target": "CTA row",
          "tailwind": "mt-6 flex flex-col sm:flex-row gap-3 sm:items-center",
          "notes": "Primary CTA перший, secondary нижче на mobile.",
          "data_testid": "hero-cta-row"
        },
        {
          "target": "Primary CTA",
          "tailwind": "btn-primary cta-lift h-12 sm:h-12 w-full sm:w-auto",
          "data_testid": "hero-primary-cta"
        },
        {
          "target": "Trust badges",
          "tailwind": "mt-6 flex flex-wrap gap-2",
          "notes": "Кожен badge: h-9 px-3 text-xs; не робити горизонтальний скрол.",
          "data_testid": "hero-trust-badges"
        },
        {
          "target": "Image column",
          "tailwind": "lg:col-span-6",
          "notes": "На mobile: aspect-[4/3] або aspect-[16/11] щоб не з’їдати фолд."
        },
        {
          "target": "Hero image wrapper",
          "tailwind": "surface-card overflow-hidden aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3]",
          "data_testid": "hero-image"
        }
      ]
    },

    "PainBlock": {
      "issues": [
        "Dark card може мати занадто великі внутрішні відступи на mobile.",
        "Дві колонки (pains vs solution) мають складатись в 1 колонку без втрати ієрархії."
      ],
      "changes": [
        {
          "target": "Section wrapper",
          "tailwind": "section-y-sm",
          "data_testid": "painblock-section"
        },
        {
          "target": "Dark card",
          "tailwind": "surface-dark px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10",
          "notes": "Mobile padding зменшити, але зберегти преміум ‘air’."
        },
        {
          "target": "Inner grid",
          "tailwind": "mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6",
          "notes": "На 768px вже можна 2 колонки."
        },
        {
          "target": "List items",
          "tailwind": "flex gap-3 items-start",
          "notes": "Іконки/маркер: min-w-0, текст: text-sm sm:text-base leading-relaxed."
        }
      ]
    },

    "Testimonials": {
      "issues": [
        "3 cards в ряд на tablet можуть бути затісні.",
        "Відгуки можуть мати різну висоту — ламає ритм."
      ],
      "changes": [
        {
          "target": "Grid",
          "tailwind": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
          "data_testid": "testimonials-grid"
        },
        {
          "target": "Card",
          "tailwind": "surface-card p-5 sm:p-6 flex flex-col",
          "notes": "Додати mt-auto для footer (аватар/ім’я), щоб вирівняти висоти."
        },
        {
          "target": "Stars row",
          "tailwind": "flex items-center gap-1 h-6",
          "data_testid": "testimonial-rating"
        }
      ]
    },

    "MiniTrust": {
      "issues": [
        "Live counter strip може бути занадто високим або мати дрібні клікабельні елементи.",
        "На mobile краще робити 2-рядний layout."
      ],
      "changes": [
        {
          "target": "Strip container",
          "tailwind": "surface-muted px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
          "data_testid": "minitrust-strip"
        },
        {
          "target": "Counter",
          "tailwind": "font-heading text-2xl sm:text-3xl",
          "data_testid": "minitrust-counter"
        }
      ]
    },

    "CategoriesGrid": {
      "issues": [
        "6 карток: на mobile має бути 1 колонка, на 375/414 можна 2.",
        "Картки можуть мати занадто маленькі клікабельні області."
      ],
      "changes": [
        {
          "target": "Grid",
          "tailwind": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
          "data_testid": "categories-grid"
        },
        {
          "target": "Category card link",
          "tailwind": "surface-card soft-lift p-5 sm:p-6 block",
          "notes": "Вся картка клікабельна; додати focus-visible ring.",
          "data_testid": "category-card-link"
        }
      ]
    },

    "FeaturedProductsGrid": {
      "issues": [
        "13 SKU: на mobile 1 колонка, на sm 2, на lg 3.",
        "Кнопки ‘деталі/купити/запит’ мають бути 44px і не злипатися.",
        "Зображення повинні мати стабільний aspect, щоб не стрибав layout."
      ],
      "changes": [
        {
          "target": "Grid",
          "tailwind": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
          "data_testid": "featured-products-grid"
        },
        {
          "target": "Product card",
          "tailwind": "surface-card p-5 sm:p-6 flex flex-col",
          "data_testid": "product-card"
        },
        {
          "target": "Image",
          "tailwind": "aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#F1F1EF]",
          "notes": "img: object-cover w-full h-full img-neutral",
          "data_testid": "product-card-image"
        },
        {
          "target": "Card actions",
          "tailwind": "mt-4 flex flex-col sm:flex-row gap-3",
          "notes": "Mobile: stacked buttons full width."
        },
        {
          "target": "Primary action button",
          "tailwind": "btn-primary h-11 w-full sm:w-auto",
          "data_testid": "product-card-primary-cta"
        },
        {
          "target": "Secondary action button",
          "tailwind": "btn-secondary h-11 w-full sm:w-auto",
          "data_testid": "product-card-secondary-cta"
        }
      ]
    },

    "UseCasesGrid": {
      "issues": [
        "Vehicle tiles: на mobile 1 колонка, на tablet 2, desktop 3.",
        "Текст на картках може виходити за межі."
      ],
      "changes": [
        {
          "target": "Grid",
          "tailwind": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
          "data_testid": "usecases-grid"
        },
        {
          "target": "Tile",
          "tailwind": "surface-card p-5 sm:p-6 min-w-0",
          "data_testid": "usecase-tile"
        }
      ]
    },

    "WhyChooseUs": {
      "issues": [
        "6 reasons з нумерацією: на mobile краще 1 колонка, на tablet 2.",
        "Нумерація може з’їдати місце — потрібен компактний badge."
      ],
      "changes": [
        {
          "target": "Grid",
          "tailwind": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
          "data_testid": "why-grid"
        },
        {
          "target": "Number badge",
          "tailwind": "h-10 w-10 rounded-full border border-[#E7E7E7] bg-white flex items-center justify-center font-heading text-sm",
          "data_testid": "why-item-number"
        }
      ]
    },

    "GalleryCasesMasonry": {
      "issues": [
        "Masonry на mobile часто створює ‘дірки’ або overflow.",
        "Badges поверх фото можуть бути занадто дрібні/нечитабельні."
      ],
      "changes": [
        {
          "target": "Layout",
          "tailwind": "columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 [column-fill:_balance]",
          "notes": "Кожен item: break-inside-avoid mb-4 sm:mb-6.",
          "data_testid": "gallery-masonry"
        },
        {
          "target": "Case card",
          "tailwind": "surface-card overflow-hidden",
          "data_testid": "gallery-case-card"
        },
        {
          "target": "Image",
          "tailwind": "w-full h-auto object-cover",
          "notes": "Додати aspect на wrapper якщо потрібно стабілізувати."
        },
        {
          "target": "Badge",
          "tailwind": "eyebrow absolute top-3 left-3",
          "notes": "На mobile: top-2 left-2 px-2.5 py-1 text-[10px].",
          "data_testid": "gallery-case-badge"
        }
      ]
    },

    "HowItWorks": {
      "issues": [
        "Dark section: 4 steps на mobile мають бути 1 колонка.",
        "Відступи всередині dark блоку часто завеликі."
      ],
      "changes": [
        {
          "target": "Section wrapper",
          "tailwind": "section-y",
          "data_testid": "howitworks-section"
        },
        {
          "target": "Dark container",
          "tailwind": "surface-dark px-5 py-8 sm:px-8 sm:py-10",
          "data_testid": "howitworks-card"
        },
        {
          "target": "Steps grid",
          "tailwind": "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5",
          "data_testid": "howitworks-steps"
        },
        {
          "target": "Step item",
          "tailwind": "rounded-[20px] bg-white/5 border border-white/10 p-4",
          "notes": "Текст: text-sm leading-relaxed; заголовок: font-heading text-base."
        }
      ]
    },

    "FAQ": {
      "issues": [
        "Accordion triggers можуть бути занадто низькі для touch.",
        "Довгі питання можуть ламати layout без min-w-0."
      ],
      "changes": [
        {
          "target": "Accordion",
          "component": "ui/accordion.jsx",
          "tailwind": "surface-card p-2 sm:p-3",
          "data_testid": "faq-accordion"
        },
        {
          "target": "AccordionTrigger",
          "tailwind": "py-4 px-3 sm:px-4 text-left min-w-0",
          "notes": "Забезпечити h>=44px; іконка chevron: h-5 w-5."
        },
        {
          "target": "AccordionContent",
          "tailwind": "px-3 sm:px-4 pb-4 text-sm sm:text-base text-[#666666]",
          "data_testid": "faq-answer"
        }
      ]
    },

    "FinalCTA_Form": {
      "issues": [
        "Форма з 3 полями: на mobile має бути 1 колонка, кнопка завжди видима.",
        "Клавіатура на iOS може перекривати submit.",
        "Помилки/validation мають бути читабельні."
      ],
      "changes": [
        {
          "target": "Section wrapper",
          "tailwind": "section-y",
          "data_testid": "final-cta-section"
        },
        {
          "target": "Card",
          "tailwind": "surface-card p-5 sm:p-8",
          "data_testid": "final-cta-card"
        },
        {
          "target": "Form grid",
          "tailwind": "mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4",
          "notes": "На tablet/desktop 3 колонки; на mobile stack."
        },
        {
          "target": "Inputs",
          "component": "ui/input.jsx + ui/label.jsx + ui/form.jsx",
          "tailwind": "h-11 rounded-[16px]",
          "data_testid": "final-cta-input"
        },
        {
          "target": "Submit",
          "tailwind": "btn-primary h-11 w-full md:w-auto md:col-span-1",
          "notes": "На mobile кнопка full width. Додати loading state.",
          "data_testid": "final-cta-submit-button"
        },
        {
          "target": "Helper/FOMO row",
          "tailwind": "mt-4 flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-[#666666]",
          "data_testid": "final-cta-helper"
        }
      ]
    },

    "StickyMobileCTA": {
      "issues": [
        "Може перекривати FloatingContact або важливі кнопки.",
        "Потрібен safe-area inset і правильний z-index.",
        "На 320px текст/кнопки можуть не влазити."
      ],
      "changes": [
        {
          "target": "Wrapper",
          "tailwind": "fixed left-0 right-0 z-[60] bottom-0",
          "notes": "Показувати після scroll>500px як зараз."
        },
        {
          "target": "Inner",
          "tailwind": "bg-white/95 backdrop-blur border-t border-[#E7E7E7] px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+12px)]",
          "data_testid": "sticky-mobile-cta"
        },
        {
          "target": "Layout",
          "tailwind": "container-page flex items-center gap-3",
          "notes": "Ліва частина: короткий текст (truncate), права: кнопка."
        },
        {
          "target": "Button",
          "tailwind": "btn-primary h-11 px-5 whitespace-nowrap",
          "data_testid": "sticky-mobile-cta-button"
        }
      ]
    },

    "FloatingContact": {
      "issues": [
        "Може конфліктувати зі StickyMobileCTA.",
        "На iOS потрібен safe-area bottom.",
        "Меню контактів має бути великим для touch."
      ],
      "changes": [
        {
          "target": "Position",
          "tailwind": "fixed right-4 sm:right-6 bottom-[calc(env(safe-area-inset-bottom)+88px)] sm:bottom-6 z-[70]",
          "notes": "88px — щоб не перекривати sticky CTA (64px + відступ).",
          "data_testid": "floating-contact"
        },
        {
          "target": "Trigger button",
          "tailwind": "h-12 w-12 rounded-full bg-[#111111] text-white shadow-lg",
          "data_testid": "floating-contact-trigger"
        },
        {
          "target": "Menu",
          "component": "ui/popover.jsx або ui/dropdown-menu.jsx",
          "tailwind": "w-56 p-2 surface-card",
          "notes": "Кожен пункт: h-11 px-3 rounded-[14px] hover:bg-[#F1F1EF].",
          "data_testid": "floating-contact-menu"
        }
      ]
    },

    "Footer": {
      "issues": [
        "4 колонки на mobile мають складатись в 1 колонку.",
        "Лінки мають бути зручні для touch."
      ],
      "changes": [
        {
          "target": "Footer wrapper",
          "tailwind": "bg-[#111111] text-white",
          "data_testid": "footer"
        },
        {
          "target": "Grid",
          "tailwind": "container-page py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
          "notes": "Links: py-2.5 block; min 44px якщо це основні CTA."
        }
      ]
    }
  },

  "pages_blueprints": {
    "HomePage": {
      "priority": "Виправити hero typography + всі гріди на mobile/tablet + sticky overlaps.",
      "tests": [
        "320px: hero H1 не виходить за екран, CTA видно без горизонтального скролу.",
        "375/414: badges wrap, grids 1→2 колонки на sm.",
        "768: PainBlock 2 колонки, grids 2 колонки.",
        "1024: стандартні desktop гріди 3 колонки."
      ]
    },

    "CatalogPage": {
      "issues": [
        "Фільтри на mobile мають бути в Drawer/Sheet, а не в лівій колонці.",
        "Sort + filters повинні бути sticky під header (але не перекривати).",
        "Product grid має стабільні card heights і image aspect."
      ],
      "changes": [
        {
          "target": "Filters",
          "component": "ui/drawer.jsx або ui/sheet.jsx + ui/accordion.jsx + ui/checkbox.jsx + ui/slider.jsx + ui/select.jsx",
          "tailwind": "lg:hidden",
          "notes": "Кнопка ‘Фільтри’ (h-11) відкриває Drawer з accordion секціями. На lg — sidebar visible.",
          "data_testid": "catalog-filters-button"
        },
        {
          "target": "Top bar",
          "tailwind": "sticky top-16 sm:top-[72px] z-40 bg-[#F7F7F5]/95 backdrop-blur border-b border-[#E7E7E7] py-3",
          "notes": "top залежить від висоти header."
        },
        {
          "target": "Grid",
          "tailwind": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
          "data_testid": "catalog-grid"
        }
      ]
    },

    "ProductDetailPage": {
      "issues": [
        "Галерея зображень: thumbs можуть бути дрібні.",
        "CTA має бути sticky на mobile (але не дублювати StickyMobileCTA некоректно).",
        "Спеки/опис: довгі рядки, потрібен max-w і правильні відступи."
      ],
      "changes": [
        {
          "target": "Layout",
          "tailwind": "container-page grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10",
          "data_testid": "product-detail"
        },
        {
          "target": "Gallery",
          "tailwind": "lg:col-span-7",
          "notes": "Main image: aspect-[4/3] sm:aspect-[16/10]; thumbs: grid grid-cols-4 gap-2, кожен thumb button h-11."
        },
        {
          "target": "Info panel",
          "tailwind": "lg:col-span-5",
          "notes": "На mobile: CTA блок зробити sticky bottom всередині сторінки тільки якщо StickyMobileCTA не активний для detail (узгодити логіку)."
        },
        {
          "target": "Primary CTA",
          "tailwind": "btn-primary h-11 w-full",
          "data_testid": "product-detail-primary-cta"
        }
      ]
    },

    "CategoryPage": {
      "changes": [
        {
          "target": "Hero/intro",
          "tailwind": "section-y-sm",
          "notes": "Заголовок: text-3xl sm:text-4xl; опис: text-sm sm:text-base."
        },
        {
          "target": "Grid",
          "tailwind": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
          "data_testid": "category-grid"
        }
      ]
    },

    "AboutPage": {
      "changes": [
        {
          "target": "Content width",
          "tailwind": "container-page max-w-3xl",
          "notes": "Читабельність: leading-relaxed, text-sm sm:text-base."
        }
      ]
    },

    "ContactsPage": {
      "issues": [
        "Карта/контакти: на mobile stack, кнопки call/telegram/whatsapp великі.",
        "Форма (якщо є) — 1 колонка."
      ],
      "changes": [
        {
          "target": "Layout",
          "tailwind": "container-page grid grid-cols-1 lg:grid-cols-12 gap-6",
          "data_testid": "contacts-page"
        },
        {
          "target": "Contact buttons",
          "tailwind": "grid grid-cols-1 sm:grid-cols-2 gap-3",
          "notes": "Кожна кнопка: h-11, full width."
        }
      ]
    },

    "FAQPage": {
      "changes": [
        {
          "target": "Accordion",
          "tailwind": "max-w-3xl mx-auto",
          "notes": "На mobile не центрувати весь app, але FAQ блок може бути centered в межах container-page."
        }
      ]
    }
  },

  "admin_panel_responsive": {
    "goals": [
      "Dashboard/cards: 1 колонка на mobile, 2 на md, 3-4 на lg.",
      "Tables: горизонтальний скрол тільки всередині ScrollArea.",
      "Filters/forms: Drawer на mobile.",
      "Sidebar: collapsible Sheet на mobile."
    ],
    "components": {
      "table": "ui/table.jsx + ui/scroll-area.jsx",
      "tabs": "ui/tabs.jsx",
      "dialog": "ui/dialog.jsx",
      "drawer": "ui/drawer.jsx",
      "form": "ui/form.jsx + ui/input.jsx + ui/select.jsx + ui/textarea.jsx"
    },
    "tailwind": {
      "admin_shell": "min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]",
      "admin_sidebar": "hidden lg:block border-r border-[#E7E7E7] bg-white",
      "admin_sidebar_mobile": "lg:hidden (Sheet)",
      "admin_content": "min-w-0",
      "kpi_grid": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
      "table_wrap": "overflow-x-auto rounded-[24px] border border-[#E7E7E7] bg-white"
    },
    "data_testid_examples": [
      "admin-sidebar-toggle-button",
      "admin-products-create-button",
      "admin-products-table",
      "admin-leads-table",
      "admin-settings-save-button"
    ]
  },

  "motion_and_microinteractions": {
    "library": "framer-motion (вже є)",
    "principles": [
      "Hover: тільки на інтерактивних елементах (soft-lift, btn hover).",
      "Entrance: секції fade-up 12–16px, duration 0.45–0.6s, stagger 0.06–0.1s.",
      "Sticky elements: з’являються з translateY(12) + opacity 0→1.",
      "НЕ використовувати transition: all."
    ],
    "recommended_patterns": {
      "section_reveal": "motion.div initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.55, ease:[0.22,1,0.36,1]}}",
      "button_press": "whileTap={{scale:0.98}}",
      "reduced_motion": "поважати prefers-reduced-motion: вимикати parallax/large transitions"
    }
  },

  "accessibility_and_testing": {
    "a11y": [
      "Focus-visible вже заданий у index.css — не ламати.",
      "Контраст: текст #111 на #F7F7F5/#FFF ок; secondary #666 тільки для допоміжного.",
      "Accordion: aria attributes від shadcn.",
      "Form errors: показувати під полем, role=alert."
    ],
    "data_testid_policy": {
      "rule": "Додати data-testid на всі кнопки/лінки/inputs/accordion triggers/filters/pagination та ключові інфо-лейбли (counter, price, sku).",
      "naming": "kebab-case, описує роль: catalog-filters-apply-button, product-price-text",
      "examples": [
        "hero-primary-cta",
        "catalog-filters-button",
        "catalog-sort-select",
        "product-detail-primary-cta",
        "faq-accordion",
        "sticky-mobile-cta-button",
        "floating-contact-trigger"
      ]
    }
  },

  "component_path": {
    "shadcn_primary": [
      "/app/frontend/src/components/ui/sheet.jsx",
      "/app/frontend/src/components/ui/drawer.jsx",
      "/app/frontend/src/components/ui/accordion.jsx",
      "/app/frontend/src/components/ui/button.jsx",
      "/app/frontend/src/components/ui/card.jsx",
      "/app/frontend/src/components/ui/badge.jsx",
      "/app/frontend/src/components/ui/separator.jsx",
      "/app/frontend/src/components/ui/scroll-area.jsx",
      "/app/frontend/src/components/ui/table.jsx",
      "/app/frontend/src/components/ui/input.jsx",
      "/app/frontend/src/components/ui/select.jsx",
      "/app/frontend/src/components/ui/checkbox.jsx",
      "/app/frontend/src/components/ui/slider.jsx",
      "/app/frontend/src/components/ui/dialog.jsx",
      "/app/frontend/src/components/ui/sonner.jsx"
    ]
  },

  "image_urls": {
    "note": "Зображення не запитувались на заміну (копірайт/контент locked). Якщо потрібні плейсхолдери для тесту responsive — використати нейтральні grayscale industrial shots локально або через існуючі assets."
  },

  "instructions_to_main_agent": {
    "execution_order": [
      "1) Пройти Header + StickyMobileCTA + FloatingContact: вирішити overlap, safe-area, touch targets.",
      "2) Hero: зменшити H1, стабілізувати image aspect, зробити badges wrap.",
      "3) Уніфікувати гріди (Categories/Featured/UseCases/Why): 1→2→3 колонки з gap-4/6.",
      "4) PainBlock/HowItWorks dark cards: зменшити padding на mobile, 1→2→4 steps.",
      "5) FAQ accordion: збільшити trigger padding, min-w-0.",
      "6) Catalog: mobile filters у Drawer + sticky top bar.",
      "7) Product detail: gallery aspect + thumbs 44px + CTA behavior.",
      "8) Admin: sidebar sheet на mobile + table scroll containment."
    ],
    "qa_matrix": {
      "phones": ["320×568", "375×812", "414×896"],
      "tablets": ["768×1024", "1024×768"],
      "checks": [
        "No horizontal scroll",
        "All tap targets >=44px",
        "Sticky elements don’t overlap content",
        "Safe-area bottom respected",
        "Hero H1 fits without overflow",
        "Grids break correctly",
        "Images keep aspect ratio",
        "Accordion usable with thumb",
        "Filters usable in Drawer",
        "data-testid present on interactive + key info"
      ]
    }
  },

  "General UI UX Design Guidelines": "    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
}
