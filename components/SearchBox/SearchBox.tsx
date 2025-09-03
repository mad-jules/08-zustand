import { useState } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
    debounced: (val: string) => void;
}

export default function SearchBox({ debounced }: SearchBoxProps) {
    const [value, setValue] = useState('');

    return (
        <input
            onChange={(e) => {
                setValue(e.target.value);
                debounced(e.target.value);
            }}
            value={value}
            className={css.input}
            type="text"
            placeholder="Search notes"
        />
    );
}
