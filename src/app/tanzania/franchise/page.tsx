'use client'
import StoreLocator from '@/components/countries/uganda/franchise/storeFinder'
import Header from '@/components/countries/uganda/header'
import react from 'react'

export default function Page() {

    const stores = [
  { "name": "Jibu Kisumu", "address": "Kisumu Kenya RE Shopping Centre", "position": [-0.0917, 34.7679] },
  { "name": "Jibu Machakos", "address": "Machakos Town", "position": [-1.5177, 37.2634] },
  { "name": "Jibu Uthiru", "address": "Uthiru, Near Uthiru Girls", "position": [-1.2691, 36.7125] },
  { "name": "Jibu Pangani", "address": "Pangani, At Keire Hotel Building", "position": [-1.2723, 36.8426] },
  { "name": "Jibu Lavington", "address": "Lavington, Along Ngong Road, Opposite Posta, Near Marsabit Plaza", "position": [-1.2927, 36.7638] },
  { "name": "Jibu Ruai", "address": "Ruai Shopping Centre", "position": [-1.2856, 37.0336] },
  { "name": "Jibu Kahawa Sukari", "address": "Kahawa Sukari", "position": [-1.1794, 36.9535] },
  { "name": "Jibu Kiambu", "address": "Kiambu Town", "position": [-1.1705, 36.8356] }
];

    return(
        <div>
            <div className="container mx-auto my-12 flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-6xl font-semibold mb-4">Find a Jibu Franchise Near you</h1> 
            </div>
            <div className="px-0 md:px-8 xl:px-32 py-8 ">
                <StoreLocator country="tanzania" stores={stores} center={[-1.9441, 30.0619]} /> {/* Place coordinates of capital city here */}
            </div>
            
        </div>
    )
}