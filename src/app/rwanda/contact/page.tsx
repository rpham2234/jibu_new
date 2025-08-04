'use client';


import React from 'react';
import ContactInfo from '@/components/countries/uganda/contact/contactinfo';
import ContactForm from '@/components/countries/uganda/contact/contactForm';

export default function Contact() {
  return (
    <div>
        {/* Header and contact Info */}
        <ContactInfo phone='+250 785 121 071' address='KG 625 Street, Kimihurura, Kigali, Rwanda' twitter='https://twitter.com/jiburwanda' facebook='https://facebook.com/jiburwanda' instagram='https://instagram.com/jiburwanda' />
        <ContactForm />
    </div>
  );
}
