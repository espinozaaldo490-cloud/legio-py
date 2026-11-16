import { Instagram, MessageCircle, ShoppingBag } from 'lucide-react';
import { StoreSettings } from '../types';
import { buildWhatsAppLink, safeURL } from '../utils/store';

interface HeroProps {
  settings: StoreSettings;
}

export function Hero({ settings }: HeroProps) {
  const waHref = buildWhatsAppLink(
    settings.phone,
    '¡Hola! Vi su página web y me gustaría saber más sobre Legión PY',
  );
  const igHref = safeURL(settings.instagram);

  return (
    <section
      id="inicio"
      className="bg-[radial-gradient(circle_at_top_center,#FFFFFF_0%,#F8F8F8_100%)] py-16 text-center md:py-24"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5">
        <div className="mb-6 inline-flex flex-col items-center">
          <h1 className="font-display gold-text-gradient text-5xl leading-[1.05] font-bold tracking-[0.04em] sm:text-6xl md:text-7xl">
            Legión
          </h1>
          <span className="font-display mt-1.5 pl-[0.55em] text-base font-semibold tracking-[0.55em] text-[#9B7718] md:text-lg">
            PY
          </span>
        </div>

        <p className="mx-auto mb-9 max-w-[650px] whitespace-pre-line text-base font-normal leading-relaxed text-[#555555] sm:text-lg">
          {settings.tagline}
        </p>

        <div className="mb-5 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <a
            href="#catalogo"
            className="gold-btn-gradient inline-flex w-full max-w-[320px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] px-7 py-3.5 text-sm font-semibold tracking-[0.04em] text-[#111111] shadow-[0_6px_20px_rgba(212,175,55,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(212,175,55,0.38)] sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          >
            <ShoppingBag className="h-[18px] w-[18px] shrink-0 text-[#111111]" aria-hidden="true" />
            Ver Catálogo
          </a>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn-gradient inline-flex w-full max-w-[320px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] px-7 py-3.5 text-sm font-semibold tracking-[0.04em] text-[#111111] shadow-[0_6px_20px_rgba(212,175,55,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(212,175,55,0.38)] sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          >
            <MessageCircle className="h-[18px] w-[18px] shrink-0 text-[#111111]" aria-hidden="true" />
            Contactar por WhatsApp
          </a>
        </div>

        <div className="flex justify-center">
          <a
            href={igHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-[320px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] border-[1.5px] border-[#D4AF37] bg-white px-7 py-3.5 text-sm font-semibold tracking-[0.04em] text-[#111111] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(212,175,55,0.08)] sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            <Instagram className="h-[18px] w-[18px] shrink-0 text-[#D4AF37]" aria-hidden="true" />
            Instagram @legionparaguay
          </a>
        </div>
      </div>
    </section>
  );
}
