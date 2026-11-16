import { Instagram, MessageCircle } from 'lucide-react';
import { StoreSettings } from '../types';
import { buildWhatsAppLink, safeURL } from '../utils/store';

interface ContactSectionProps {
  settings: StoreSettings;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const waHref = buildWhatsAppLink(
    settings.phone,
    '¡Hola! Vi su página web y me gustaría saber más sobre Legión PY',
  );
  const igHref = safeURL(settings.instagram);

  return (
    <section id="contacto" className="bg-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1240px] px-5">
        <div className="mb-11 text-center">
          <h2 className="font-display text-3xl font-bold tracking-[0.04em] text-[#111111] md:text-4xl">
            Atención Personalizada
          </h2>
          <div className="gold-divider-short" />
          <p className="mt-3 text-sm text-[#555555] md:text-base">
            Coordinamos tus pedidos, tallas y envíos directamente por mensaje.
          </p>
        </div>

        <div className="mx-auto max-w-[780px] rounded-[14px] border border-[rgba(212,175,55,0.35)] bg-[#F8F8F8] px-6 py-10 text-center shadow-[0_8px_28px_rgba(17,17,17,0.06)] sm:px-10">
          <p className="mb-1.5 text-xs font-medium tracking-[0.16em] text-[#555555] uppercase">
            WhatsApp Directo
          </p>
          <p className="font-display gold-text-gradient mb-7 inline-block text-2xl font-bold tabular-nums sm:text-3xl">
            {settings.phone}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn-gradient inline-flex w-full max-w-[320px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] px-7 py-3.5 text-sm font-semibold tracking-[0.04em] text-[#111111] shadow-[0_6px_20px_rgba(212,175,55,0.28)] transition-all duration-200 hover:-translate-y-0.5 sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
            >
              <MessageCircle className="h-[18px] w-[18px] shrink-0 text-[#111111]" aria-hidden="true" />
              Escribir por WhatsApp
            </a>

            <a
              href={igHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-[320px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] border-[1.5px] border-[#D4AF37] bg-white px-7 py-3.5 text-sm font-semibold tracking-[0.04em] text-[#111111] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(212,175,55,0.08)] sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
            >
              <Instagram className="h-[18px] w-[18px] shrink-0 text-[#D4AF37]" aria-hidden="true" />
              Seguir en Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
