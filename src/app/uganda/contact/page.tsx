'use client';


import React from 'react';
import ContactInfo from '@/components/countries/uganda/contact/contactinfo';
import ContactForm from '@/components/countries/uganda/contact/contactForm';

export default function Contact() {
  return (
    <div>
        {/* Header and contact Info */}
        <ContactInfo phone='+256 700 818 455' address='Plot 25, Bukoto St, Kamwokya, Kampala'/>
        <ContactForm />
    </div>
  );
}
