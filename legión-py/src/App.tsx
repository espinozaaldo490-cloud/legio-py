import { useEffect, useState } from 'react';
import { LogOut, Plus, Settings } from 'lucide-react';
import {
  DeleteConfirmModal,
  LoginModal,
  ProductModal,
  SettingsModal,
} from './components/AdminModals';
import { ContactSection } from './components/ContactSection';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Product, StoreSettings } from './types';
import {
  getAdminPassword,
  isAdminSession,
  loadProducts,
  loadSettings,
  saveProducts,
  saveSettings,
  setAdminPassword,
  setAdminSession,
} from './utils/store';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => loadProducts());
  const [settings, setSettings] = useState<StoreSettings>(() => loadSettings());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminSession());

  const [loginOpen, setLoginOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleLoginSubmit = (entered: string): boolean => {
    if (entered === getAdminPassword()) {
      setAdminSession(true);
      setIsAdmin(true);
      setLoginOpen(false);
      setToast('Sesión de administrador iniciada.');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setAdminSession(false);
    setIsAdmin(false);
    setToast('Saliste del modo administrador.');
  };

  const handleSaveProduct = (data: Omit<Product, 'id'>, existingId?: string) => {
    if (!isAdmin) return;

    const updated = existingId
      ? products.map((p) => (p.id === existingId ? { ...data, id: existingId } : p))
      : [{ ...data, id: `prod_${Date.now()}` }, ...products];

    try {
      saveProducts(updated);
      setProducts(updated);
      setProductModalOpen(false);
      setEditingProduct(null);
      setToast(existingId ? 'Producto actualizado.' : 'Producto agregado al catálogo.');
    } catch {
      setToast('La memoria del navegador está llena. Usa imágenes más livianas o enlaces URL.');
    }
  };

  const handleDeleteConfirm = (id: string) => {
    if (!isAdmin) return;
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    setProducts(updated);
    setDeletingProduct(null);
    setToast('Producto eliminado.');
  };

  const handleSaveSettings = (newSettings: StoreSettings, newPass?: string) => {
    if (!isAdmin) return;
    saveSettings(newSettings);
    setSettings(newSettings);
    if (newPass) {
      setAdminPassword(newPass);
    }
    setSettingsModalOpen(false);
    setToast('Información actualizada.');
  };

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Header phone={settings.phone} />

      {isAdmin && (
        <div className="sticky top-[74px] z-30 border-b-2 border-[#D4AF37] bg-[#111111] px-5 py-3 text-white">
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase sm:text-sm">
              Modo Administrador — Legión PY
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setProductModalOpen(true);
                }}
                className="gold-btn-gradient inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold text-[#111111]"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                Agregar Producto
              </button>
              <button
                type="button"
                onClick={() => setSettingsModalOpen(true)}
                className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#D4AF37] bg-white px-3.5 py-2 text-xs font-semibold text-[#111111] hover:bg-[rgba(212,175,55,0.1)]"
              >
                <Settings className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                Contacto y Redes
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-white/25 bg-transparent px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#b91c1c] hover:border-[#b91c1c]"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                Salir
              </button>
            </div>
          </div>
        </div>
      )}

      <main>
        <Hero settings={settings} />

        <hr className="gold-divider" />

        <section id="catalogo" className="bg-[#F8F8F8] py-16 md:py-20">
          <div className="mx-auto w-full max-w-[1240px] px-5">
            <div className="mb-11 text-center">
              <h2 className="font-display text-3xl font-bold tracking-[0.04em] text-[#111111] md:text-4xl">
                Catálogo Exclusivo
              </h2>
              <div className="gold-divider-short" />
              <p className="mt-3 text-sm text-[#555555] md:text-base">
                Toca cualquier prenda o calzado para consultar disponibilidad directa por WhatsApp.
              </p>
            </div>

            {products.length === 0 ? (
              <div className="rounded-[14px] border border-dashed border-[rgba(212,175,55,0.75)] bg-white px-5 py-12 text-center text-sm text-[#555555]">
                Aún no hay productos cargados en el catálogo.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    phone={settings.phone}
                    isAdmin={isAdmin}
                    onEdit={(prod) => {
                      setEditingProduct(prod);
                      setProductModalOpen(true);
                    }}
                    onDelete={(prod) => setDeletingProduct(prod)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <hr className="gold-divider" />

        <ContactSection settings={settings} />
      </main>

      <footer className="border-t border-[rgba(212,175,55,0.35)] bg-white px-5 py-8 text-center text-sm text-[#555555]">
        <div className="mx-auto max-w-[1240px]">
          <p>
            <span className="font-display font-bold tracking-[0.06em] text-[#9B7718]">
              LEGIÓN PY
            </span>{' '}
            — Estilo Masculino. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => {
          if (isAdmin) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setLoginOpen(true);
          }
        }}
        title="Acceso administrativo"
        className="fixed right-3.5 bottom-2.5 z-30 cursor-pointer border-0 bg-transparent px-1.5 py-1 text-[11px] text-[#C2C2C2] transition-colors hover:text-[#888888]"
      >
        ⚙️ Admin
      </button>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-[#D4AF37] bg-[#111111] px-4 py-2.5 text-xs font-medium text-white shadow-xl"
        >
          {toast}
        </div>
      )}

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSubmitPassword={handleLoginSubmit}
      />

      <ProductModal
        open={productModalOpen}
        editingProduct={editingProduct}
        onClose={() => {
          setProductModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        onNotify={(msg) => setToast(msg)}
      />

      <SettingsModal
        open={settingsModalOpen}
        settings={settings}
        onClose={() => setSettingsModalOpen(false)}
        onSave={handleSaveSettings}
      />

      <DeleteConfirmModal
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
