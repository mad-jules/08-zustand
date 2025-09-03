'use client';

import React, { useEffect, useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import { tagList } from '@/app/notes/filter/@sidebar/default';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const close = () => setIsOpen(false);
    document.addEventListener('click', close);

    return () => document.removeEventListener('click', close);
  }, [isOpen]);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tagList.map((tag) => (
            <li className={css.menuItem} key={tag}>
              <Link
                onClick={toggle}
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
