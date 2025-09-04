import React from 'react';
import css from './not-found.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'Sorry, the page you are looking for does not exist',
  openGraph: {
    title: '404 Not Found',
    description: 'Page not found',
    url: 'https://08-zustand-chi-ten.vercel.app/404',
    images: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
