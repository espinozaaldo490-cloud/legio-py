import { useState } from 'react';
import { MessageCircle, Pencil, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppLink } from '../utils/store';

interface ProductCardProps {
  product: Product;
  phone: string;
  isAdmin: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductCard({
  product,
  phone,
  isAdmin,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  const stockNum = Number(product.stock) || 0;
  const stockLabel = stockNum > 0 ? `Disponibles: ${stockNum}` : 'Consultar stock';

  const message = `¡Hola Legión PY! Quisiera consultar por: ${product.name} — Precio: ${product.price}. ¿Está disponible?`;
  const waHref = buildWhatsAppLink(phone, message);

  return (
    <article className="group flex flex-col overflow-hidden rounded-[14px] border border-[rgba(212,175,55,0.35)] bg-white shadow-[0_8px_28px_rgba(17,17,17,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.75)] hover:shadow-[0_14px_36px_rgba(212,175,55,0.18)]">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Consultar por ${product.name} — Precio: ${product.price}`}
        className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D4AF37]"
      >
        <div className="relative aspect-square w-full overflow-hidden border-b border-[rgba(212,175,55,0.18)] bg-white">
          {!imgError && product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#F8F8F8] p-6 text-center">
              <ShoppingBag className="h-10 w-10 text-[#D4AF37]" aria-hidden="true" />
              <span className="font-display text-xs tracking-[0.2em] text-[#9B7718] uppercase">
                Legión PY
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display gold-text-gradient mb-2 text-[1.08rem] leading-snug font-bold">
            {product.name}
          </h3>

          <p className="mb-4 flex-1 text-sm leading-relaxed text-[#555555]">
            {product.description}
          </p>

          <div className="flex items-baseline justify-between gap-2 border-t border-[rgba(212,175,55,0.22)] pt-3.5">
            <span className="gold-text-gradient text-[1.3rem] leading-none font-bold tabular-nums">
              {product.price}
            </span>
            <span
              className={`text-xs font-medium tabular-nums ${
                stockNum > 0 ? 'text-[#111111]' : 'text-[#777777]'
              }`}
            >
              {stockLabel}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wider text-[#9B7718] uppercase">
            <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" aria-hidden="true" />
            <span>Consultar por WhatsApp</span>
          </div>
        </div>
      </a>

      {isAdmin && (
        <div className="flex gap-2 border-t border-[rgba(212,175,55,0.3)] bg-[#F8F8F8] px-5 py-3">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#D4AF37] bg-white px-3 py-2 text-xs font-semibold text-[#111111] transition-colors hover:bg-[rgba(212,175,55,0.1)]"
          >
            <Pencil className="h-3.5 w-3.5 text-[#9B7718]" aria-hidden="true" />
            Editar
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#111111] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#b91c1c]"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Eliminar
          </button>
        </div>
      )}
    </article>
  );
}
