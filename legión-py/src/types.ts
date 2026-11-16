export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
}

export interface StoreSettings {
  phone: string;
  instagram: string;
  tagline: string;
}

export const DEFAULT_PASSWORD = 'Temporal.00';

export const STORAGE_KEYS = {
  PRODUCTS: 'legionpy_products_v2',
  SETTINGS: 'legionpy_settings_v2',
  PASS: 'legionpy_admin_pass_v2',
  SESSION: 'legionpy_admin_active',
} as const;

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Zapato Oxford Clásico Negro',
    description:
      'Cuero vacuno seleccionado con acabado artesanal, puntera elegante y suela antideslizante.',
    price: 'Gs. 480.000',
    stock: 6,
    image: '/src/assets/images/product_oxford_shoes_1794867527518.jpg',
  },
  {
    id: 'p2',
    name: 'Mocasín Italiano Gamuza',
    description:
      'Diseño slip-on distinguido en gamuza suave, costura reforzada y plantilla anatómica de confort.',
    price: 'Gs. 420.000',
    stock: 4,
    image: '/src/assets/images/product_suede_loafers_1794867528165.jpg',
  },
  {
    id: 'p3',
    name: 'Camisa Slim Fit Lino Puro',
    description:
      'Corte moderno entallado en lino y algodón transpirable. Ideal para clima cálido y eventos.',
    price: 'Gs. 240.000',
    stock: 9,
    image: '/src/assets/images/product_linen_shirt_1794867528301.jpg',
  },
  {
    id: 'p4',
    name: 'Sneaker Urbano Blanco & Oro',
    description:
      'Calzado casual minimalista con detalles dorados sutiles y suela liviana de alto agarre.',
    price: 'Gs. 360.000',
    stock: 7,
    image: '/src/assets/images/product_urban_sneakers_1794867528256.jpg',
  },
];

export const DEFAULT_SETTINGS: StoreSettings = {
  phone: '+595 971 629 878',
  instagram: 'https://www.instagram.com/legionparaguay/',
  tagline: 'Estilo masculino\nRopas y calzados para todos los gustos',
};
