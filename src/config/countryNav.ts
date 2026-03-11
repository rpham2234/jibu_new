// src/config/countryNav.ts

export type NavItem = {
    name: string;
    href: string;
    current?: boolean;
};

// Map of ISO country codes (or slugs) to their specific navigation items
export const countryNavigationParams: Record<string, NavItem[]> = {
    // Rwanda specific navigation
    rw: [
        { name: "Global Home", href: "/" },
        { name: "Shop", href: "/rw#products" },
        { name: "Franchise Locations", href: "/rw/franchise" },
        { name: "Our Team", href: "/rw/ourTeam" },
        { name: "Our Franchisees", href: "/rw/ourFranchise" },
        { name: "Contact Us", href: "/rw/contact" },
    ],
    // Add other countries here as needed
    // ug: [...],
    // ke: [...],
};
