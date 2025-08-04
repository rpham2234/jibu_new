'use client';


import React from 'react';
import ContactInfo from '@/components/countries/uganda/contact/contactinfo';
import ContactForm from '@/components/countries/uganda/contact/contactForm';

export default function Contact() {
  return (
    <div>
        {/* Header and contact Info */}
        <ContactInfo phone='+254 757 019151' address='Swaminarayan St, Nairobi, Kenya' twitter='https://x.com/jibukenya?lang=en' facebook='https://www.facebook.com/jibukenya/' instagram='https://www.instagram.com/jibukenya/?hl=en' />
        <ContactForm />
    </div>
  );
}
