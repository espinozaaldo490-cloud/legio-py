import { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/store';

interface HeaderProps {
  phone: string;
}

export function Header({ phone }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const waHref = buildWhatsAppLink(
    phone,
    '¡Hola! Vi su página web y me gustaría saber más sobre Legión PY',
  );

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(212,175,55,0.35)] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] w-full max-w-[1240px] items-center justify-between gap-8 px-5">
        <a
          href="#inicio"
          className="font-display gold-text-gradient shrink-0 whitespace-nowrap text-2xl font-bold tracking-[0.06em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          aria-label="Legión PY Inicio"
        >
          Legión PY
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          <a
            href="#inicio"
            className="group relative shrink-0 whitespace-nowrap py-1.5 text-sm font-medium tracking-[0.06em] text-[#111111] uppercase transition-colors hover:text-[#9B7718] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            Inicio
            <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#D4AF37] transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#catalogo"
            className="group relative shrink-0 whitespace-nowrap py-1.5 text-sm font-medium tracking-[0.06em] text-[#111111] uppercase transition-colors hover:text-[#9B7718] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            Catálogo
            <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#D4AF37] transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#contacto"
            className="group relative shrink-0 whitespace-nowrap py-1.5 text-sm font-medium tracking-[0.06em] text-[#111111] uppercase transition-colors hover:text-[#9B7718] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            Contacto
            <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#D4AF37] transition-all duration-200 group-hover:w-full" />
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn-gradient hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-semibold tracking-wide text-[#111111] shadow-[0_4px_14px_rgba(212,175,55,0.28)] transition-transform duration-200 hover:-translate-y-0.5 md:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-[#111111]" aria-hidden="true" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[rgba(212,175,55,0.35)] text-[#111111] transition-colors hover:bg-[#F8F8F8] md:hidden"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-[rgba(212,175,55,0.25)] bg-white md:hidden"
          aria-label="Menú móvil"
        >
          <ul className="flex flex-col divide-y divide-[rgba(212,175,55,0.16)] text-center">
            <li>
              <a
                href="#inicio"
                onClick={() => setMenuOpen(false)}
                className="block py-3.5 text-sm font-medium tracking-[0.06em] text-[#111111] uppercase"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#catalogo"
                onClick={() => setMenuOpen(false)}
                className="block py-3.5 text-sm font-medium tracking-[0.06em] text-[#111111] uppercase"
              >
                Catálogo
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="block py-3.5 text-sm font-medium tracking-[0.06em] text-[#111111] uppercase"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
