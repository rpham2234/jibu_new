'use client'
import StoreLocator from '@/components/countries/uganda/franchise/storeFinder'
import Header from '@/components/countries/uganda/header'
import react from 'react'

export default function Page() {

const stores = [
  {
    "name": "Jibu Bugarama",
    "address": "Kabusunzu, Kigali, Rwanda",
    "position": [-1.9536, 30.0605]
  },
  {
    "name": "Jibu Busanza",
    "address": "KK 152 St, Kigali, Rwanda",
    "position": [-1.9771, 30.1355]
  },
  {
    "name": "Jibu Gahanga",
    "address": "KK 15 Rd, Gahanga Center, Kigali, Rwanda",
    "position": [-2.0075, 30.1426]
  },
  {
    "name": "Jibu Gasogi",
    "address": "KK 359 St, Kigali, Rwanda",
    "position": [-1.9217, 30.1444]
  },
  {
    "name": "Jibu Gatenga",
    "address": "KK 44 Ave, KK 593 St, Kigali, Rwanda",
    "position": [-1.9820, 30.1035]
  },
  {
    "name": "Jibu Gatsata",
    "address": "RN3, Kigali, Gatuna Rd, Rwanda",
    "position": [-1.8952, 30.0987]
  }
];

    return(
        <div>
            <div className="container mx-auto my-12 flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-6xl font-semibold mb-4">Find a Jibu Franchise Near you</h1> 
            </div>
            <div className="px-0 md:px-8 xl:px-32 py-8 ">
                <StoreLocator country="rwanda" stores={stores} center={[-1.9441, 30.0619]} /> {/* Place coordinates of capital city here */}
            </div>
            
        </div>
    )
}