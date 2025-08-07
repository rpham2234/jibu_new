'use client'
import ProductPage from '@/components/countries/productPage'
import { products } from '../../products'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{ id: string }>; // Fix for Next.js typing
};

export default async function Page({ params }: PageProps) {
    const productId = parseInt((await params).id, 10);
    const product = products.find((p) => p._id === productId);

    if(!product) return notFound();

    return(
        <div>
            <ProductPage product={product}/>
            
        </div>
    )
}