import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { compressImageFile } from '../utils/store';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitPassword: (password: string) => boolean;
}

export function LoginModal({ open, onClose, onSubmitPassword }: LoginModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (open) {
      setPassword('');
      setError(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = onSubmitPassword(password);
    if (!ok) {
      setError(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="w-full max-w-[400px] rounded-[14px] border border-[rgba(212,175,55,0.75)] bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-[rgba(212,175,55,0.3)] pb-3">
          <h3 id="login-modal-title" className="font-display text-xl font-bold text-[#111111]">
            Acceso Administrador
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#555555] hover:bg-[#F8F8F8] hover:text-[#111111]"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="adminPasswordInput"
              className="mb-1.5 block text-xs font-semibold text-[#111111]"
            >
              Contraseña
            </label>
            <input
              id="adminPasswordInput"
              type="password"
              autoFocus
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Ingresa la contraseña"
              className="w-full rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-3.5 py-2.5 text-sm text-[#111111] outline-none focus:border-[#D4AF37] focus:bg-white"
            />
          </div>

          {error && (
            <p className="mb-3 text-xs font-semibold text-[#b91c1c]">
              Contraseña incorrecta.
            </p>
          )}

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#D4AF37] bg-white px-4 py-2 text-xs font-semibold text-[#111111] hover:bg-[rgba(212,175,55,0.08)]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="gold-btn-gradient rounded-lg px-4 py-2 text-xs font-semibold text-[#111111]"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface ProductModalProps {
  open: boolean;
  editingProduct: Product | null;
  onClose: () => void;
  onSave: (data: Omit<Product, 'id'>, existingId?: string) => void;
  onNotify: (msg: string) => void;
}

export function ProductModal({
  open,
  editingProduct,
  onClose,
  onSave,
  onNotify,
}: ProductModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(1);
  const [image, setImage] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');

  useEffect(() => {
    if (!open) return;
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setStock(editingProduct.stock);
      setImage(editingProduct.image);
      setImageUrlInput(
        editingProduct.image.startsWith('http') ? editingProduct.image : '',
      );
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setStock(1);
      setImage('');
      setImageUrlInput('');
    }
  }, [open, editingProduct]);

  if (!open) return null;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      setImage(compressed);
      setImageUrlInput('');
    } catch {
      onNotify('No se pudo procesar la imagen seleccionada.');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(
      {
        name: name.trim(),
        description: description.trim(),
        price: price.trim(),
        stock: Number.isFinite(stock) ? Math.max(0, stock) : 0,
        image: image || '/src/assets/images/product_oxford_shoes_1794867527518.jpg',
      },
      editingProduct?.id,
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-[14px] border border-[rgba(212,175,55,0.75)] bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-[rgba(212,175,55,0.3)] pb-3">
          <h3 id="product-modal-title" className="font-display text-xl font-bold text-[#111111]">
            {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#555555] hover:bg-[#F8F8F8] hover:text-[#111111]"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#111111]">
              Imagen del producto
            </label>
            <div className="mb-2.5 flex h-[170px] w-full items-center justify-center overflow-hidden rounded-[10px] border border-dashed border-[rgba(212,175,55,0.75)] bg-[#F8F8F8]">
              {image ? (
                <img
                  src={image}
                  alt="Vista previa"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xs text-[#777777]">Sin imagen seleccionada</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-2 w-full rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-3 py-2 text-xs text-[#111111] file:mr-3 file:rounded-md file:border-0 file:bg-[#111111] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
            />
            <input
              type="url"
              value={imageUrlInput}
              onChange={(e) => {
                const val = e.target.value;
                setImageUrlInput(val);
                if (val.trim()) setImage(val.trim());
              }}
              placeholder="O pega un enlace (URL) de imagen aquí"
              className="w-full rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-3.5 py-2.5 text-sm text-[#111111] outline-none focus:border-[#D4AF37] focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="prodName" className="mb-1.5 block text-xs font-semibold text-[#111111]">
              Nombre del producto
            </label>
            <input
              id="prodName"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Zapato Oxford Cuero Negro"
              className="w-full rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-3.5 py-2.5 text-sm text-[#111111] outline-none focus:border-[#D4AF37] focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="prodDesc" className="mb-1.5 block text-xs font-semibold text-[#111111]">
              Descripción breve
            </label>
            <textarea
              id="prodDesc"
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Material, corte, detalles..."
              className="w-full rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-3.5 py-2.5 text-sm text-[#111111] outline-none focus:border-[#D4AF37] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="prodPrice" className="mb-1.5 block text-xs font-semibold text-[#111111]">
                Precio
              </label>
              <input
                id="prodPrice"
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ej: Gs. 450.000"
                className="w-full rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-3.5 py-2.5 text-sm text-[#111111] outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>
            <div>
              <label htmlFor="prodStock" className="mb-1.5 block text-xs font-semibold text-[#111111]">
                Cantidad disponible
              </label>
              <input
                id="prodStock"
                type="number"
                min={0}
                required
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value, 10) || 0)}
                className="w-full rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-3.5 py-2.5 text-sm text-[#111111] tabular-nums outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#D4AF37] bg-white px-4 py-2 text-xs font-semibold text-[#111111] hover:bg-[rgba(212,175,55,0.08)]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="gold-btn-gradient rounded-lg px-4 py-2 text-xs font-semibold text-[#111111]"
            >
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface SettingsModalProps {
  open: boolean;
  settings: StoreSettings;
  onClose: () => void;
  onSave: (newSettings: StoreSettings, newPassword?: string) => void;
}

export function SettingsModal({ open, settings, onClose, onSave }: SettingsModalProps) {
  const [phone, setPhone] = useState(settings.phone);
  const [instagram, setInstagram] = useState(settings.instagram);
  const [tagline, setTagline] = useState(settings.tagline);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (open) {
      setPhone(settings.phone);
      setInstagram(settings.instagram);
      setTagline(settings.tagline);
      setNewPassword('');
    }
  }, [open, settings]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(
      {
        phone: phone.trim(),
        instagram: instagram.trim(),
        tagline: tagline.trim(),
      },
      newPassword.trim() || undefined,
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div className="max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-[14px] border border-[rgba(212,175,55,0.75)] bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-[rgba(212,175,55,0.3)] pb-3">
          <h3 id="settings-modal-title" className="font-display text-xl font-bold text-[#111111]">
            Contacto y Redes Sociales
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#555555] hover:bg-[#F8F8F8] hover:text-[#111111]"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="setPhone" className="mb-1.5 block text-xs font-semibold text-[#111111]">
              Número de WhatsApp (visible y enlace)
            </label>
            <input
              id="setPhone"
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+595 971 629 878"
              className="w-full rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-3.5 py-2.5 text-sm text-[#111111] outline-none focus:border-[#D4AF37] focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="setInstagram" className="mb-1.5 block text-xs font-semibold text-[#111111]">
              Enlace de Instagram
            </label>
            <input
              id="setInstagram"
              type="url"
              required
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://www.instagram.com/legionparaguay/"
              className="w-full rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-3.5 py-2.5 text-sm text-[#111111] outline-none focus:border-[#D4AF37] focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="setTagline" className="mb-1.5 block text-xs font-semibold text-[#111111]">
              Frase de bienvenida (Inicio)
            </label>
            <textarea
              id="setTagline"
              required
              rows={3}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-3.5 py-2.5 text-sm text-[#111111] outline-none focus:border-[#D4AF37] focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="setNewPassword" className="mb-1.5 block text-xs font-semibold text-[#111111]">
              Cambiar contraseña de administrador (opcional)
            </label>
            <input
              id="setNewPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Dejar vacío para mantener la actual"
              className="w-full rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-3.5 py-2.5 text-sm text-[#111111] outline-none focus:border-[#D4AF37] focus:bg-white"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#D4AF37] bg-white px-4 py-2 text-xs font-semibold text-[#111111] hover:bg-[rgba(212,175,55,0.08)]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="gold-btn-gradient rounded-lg px-4 py-2 text-xs font-semibold text-[#111111]"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface DeleteModalProps {
  product: Product | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export function DeleteConfirmModal({ product, onClose, onConfirm }: DeleteModalProps) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="w-full max-w-[400px] rounded-[14px] border border-[rgba(212,175,55,0.75)] bg-white p-6 shadow-2xl">
        <div className="mb-3 flex items-center justify-between border-b border-[rgba(212,175,55,0.3)] pb-3">
          <h3 id="delete-modal-title" className="font-display text-lg font-bold text-[#111111]">
            Eliminar Producto
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#555555] hover:bg-[#F8F8F8] hover:text-[#111111]"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-5 text-sm text-[#555555]">
          ¿Estás seguro de eliminar <strong className="text-[#111111]">{product.name}</strong> del catálogo?
        </p>

        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#D4AF37] bg-white px-4 py-2 text-xs font-semibold text-[#111111] hover:bg-[rgba(212,175,55,0.08)]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(product.id)}
            className="rounded-lg bg-[#b91c1c] px-4 py-2 text-xs font-semibold text-white hover:bg-[#991b1b]"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
