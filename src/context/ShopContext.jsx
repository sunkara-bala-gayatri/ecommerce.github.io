import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const safeParse = (key, defaultValue) => {
        try {
            const saved = localStorage.getItem(key);
            if (!saved || saved === "undefined") return defaultValue;
            return JSON.parse(saved);
        } catch (error) {
            console.error(`Error parsing localStorage key "${key}":`, error);
            localStorage.removeItem(key); // Clear corrupted data
            return defaultValue;
        }
    };

    const [cart, setCart] = useState(() => safeParse('fashion_hall_cart', []));
    const [wishlist, setWishlist] = useState(() => safeParse('fashion_hall_wishlist', []));
    const [user, setUser] = useState(() => safeParse('fashion_hall_user', null));
    const [orders, setOrders] = useState(() => safeParse('fashion_hall_orders', []));

    useEffect(() => {
        localStorage.setItem('fashion_hall_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('fashion_hall_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('fashion_hall_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('fashion_hall_user');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('fashion_hall_orders', JSON.stringify(orders));
    }, [orders]);

    const addToCart = (product) => {
        setCart((prev) => {
            const isExist = prev.find((item) => item.id === product.id);
            if (isExist) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const isExist = prev.find((item) => item.id === product.id);
            if (isExist) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const login = (userData) => setUser(userData);
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('fashion_hall_cart');
    };

    const addOrder = (order) => {
        setOrders(prev => [order, ...prev]);
    };

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    useEffect(() => {
        const initializeData = async () => {
            try {
                const [prodData, catData] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                setProducts(prodData);
                setCategories(catData);
                setIsDataLoading(false);
            } catch (err) {
                console.error("Failed to fetch initial data:", err);
                setIsDataLoading(false);
            }
        };
        initializeData();
    }, []);

    const value = {
        cart,
        wishlist,
        user,
        products,
        categories,
        isDataLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        login,
        logout,
        clearCart,
        orders,
        addOrder,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
