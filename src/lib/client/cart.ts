import { writable } from 'svelte/store';
import type { ShoppingCart, CartItem } from '$lib/types';


function createShoppingCart(): ShoppingCart {
    const isBrowser = typeof window !== 'undefined';
    let initialCart: CartItem[] = [];

    if (isBrowser) {
        const storedCart = localStorage.getItem('shoppingCart');
        initialCart = storedCart ? JSON.parse(storedCart) as CartItem[] : [];
    }

    const { subscribe, set, update } = writable<CartItem[]>(initialCart);

    const updateLocalStorage = (cart: CartItem[]) => {
        if (isBrowser) {
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
        }
    };

    return {
        subscribe,
        addItem: (item: CartItem) => {
            update((items) => {
                const existingItem = items.find((i) => i.name === item.name);
                if (existingItem) {
                    existingItem.quantity += 1;
                    return items;
                }
                const updatedCart = [...items, { ...item, quantity: 1 }];
                updateLocalStorage(updatedCart);
                return updatedCart;
            });
        },
        removeItem: (name: string) => {
            update((items) => {
                const updatedCart = items.filter((item) => item.name !== name);
                updateLocalStorage(updatedCart);
                return updatedCart;
            });
        },
        updateQuantity: (name: string, quantity: number) => {
            update((items) => {
                const updatedCart = items
                    .map((item) =>
                        item.name === name ? { ...item, quantity: Math.max(0, quantity) } : item
                    )
                    .filter((item) => item.quantity > 0);
                updateLocalStorage(updatedCart);
                return updatedCart;
            });
        },
        clearCart: () => {
            set([]);
            updateLocalStorage([]);
        },
        getCartCount: () => {
            let cartCount = 0;
            cart.subscribe((cart) => {
                cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
            });
            return cartCount;
        }

    };
}

export const cart: ShoppingCart = createShoppingCart();
