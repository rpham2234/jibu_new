'use client'
import StoreLocator from '@/components/countries/uganda/franchise/storeFinder'
import Header from '@/components/countries/uganda/header'
import react from 'react'

export default function Page() {

    const stores = [
  {
    "name": "Jibu Asylumdown",
    "address": "Asylumdown, Accra, Ghana",
    "position": [5.5627, -0.2140]
  },
  {
    "name": "Jibu North Legon",
    "address": "North Legon, Accra, Ghana",
    "position": [5.6230, -0.1969]
  },
  {
    "name": "Jibu Dansoman",
    "address": "Dansoman, Accra, Ghana",
    "position": [5.5540, -0.2947]
  },
  {
    "name": "Jibu Adenta",
    "address": "Adenta, Accra, Ghana",
    "position": [5.6200, -0.1880]
  },
  {
    "name": "Jibu Madina Estate",
    "address": "Madina Estate, Accra, Ghana",
    "position": [5.6550, -0.1930]
  }
]

    return(
        <div>
            <div className="container mx-auto my-12 flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-6xl font-semibold mb-4">Find a Jibu Franchise Near you</h1> 
            </div>
            <div className="px-0 md:px-8 xl:px-32 py-8 ">
                <StoreLocator country="ghana" stores={stores} center={[5.6037, -0.1870]} /> {/* Place coordinates of capital city here */}
            </div>
            
        </div>
    )
}