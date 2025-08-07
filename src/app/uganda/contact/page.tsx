'use client';


import React from 'react';
import ContactInfo from '@/components/countries/uganda/contact/contactinfo';
import ContactForm from '@/components/countries/uganda/contact/contactForm';
import {info} from '../../uganda/info'

export default function Contact() {
  return (
    <div>
        {/* Header and contact Info */}
        <ContactInfo phone={info.phone} address={info.address} facebook={info.facebook} twitter={info.twitter} instagram={info.instagram} linkedin={info.linkedin} />
        <ContactForm />
    </div>
  );
}
