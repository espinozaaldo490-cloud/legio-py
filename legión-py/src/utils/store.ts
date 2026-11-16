import {
  DEFAULT_PASSWORD,
  DEFAULT_PRODUCTS,
  DEFAULT_SETTINGS,
  Product,
  STORAGE_KEYS,
  StoreSettings,
} from '../types';

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

export function loadProducts(): Product[] {
  return loadJSON<Product[]>(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

export function loadSettings(): StoreSettings {
  return loadJSON<StoreSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export function saveSettings(settings: StoreSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function getAdminPassword(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.PASS) || DEFAULT_PASSWORD;
  } catch {
    return DEFAULT_PASSWORD;
  }
}

export function setAdminPassword(newPass: string): void {
  localStorage.setItem(STORAGE_KEYS.PASS, newPass);
}

export function isAdminSession(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.SESSION) === '1';
  } catch {
    return false;
  }
}

export function setAdminSession(active: boolean): void {
  try {
    if (active) {
      sessionStorage.setItem(STORAGE_KEYS.SESSION, '1');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.SESSION);
    }
  } catch {
    // Ignore storage restriction errors
  }
}

export function sanitizePhone(phone: string): string {
  return String(phone || '').replace(/\D/g, '');
}

export function safeURL(url: string): string {
  try {
    const u = new URL(url, window.location.origin);
    if (u.protocol === 'http:' || u.protocol === 'https:') {
      return u.href;
    }
  } catch {
    // Invalid URL fallback
  }
  return '#';
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const cleanNum = sanitizePhone(phone);
  return `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;
}

export function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const MAX_SIZE = 750;
        let w = img.width;
        let h = img.height;
        if (w > MAX_SIZE || h > MAX_SIZE) {
          if (w > h) {
            h = Math.round((h * MAX_SIZE) / w);
            w = MAX_SIZE;
          } else {
            w = Math.round((w * MAX_SIZE) / h);
            h = MAX_SIZE;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas not supported'));
          return;
        }
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = String(ev.target?.result || '');
    };
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}
