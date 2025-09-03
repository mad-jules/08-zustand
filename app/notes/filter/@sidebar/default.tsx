import React from 'react';
import css from './SideBarNotes.module.css';
import Link from 'next/link';

export const tagList: string[] = [
  'All',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Todo',
];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tagList.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
