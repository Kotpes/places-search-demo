//@flow
import React from "react";
import css from './Search.module.css'

type Props = {
  onChange: Function
};

const Search = ({ onChange }: Props) => {
  return (
    <section className={css.component}>
      <input 
        type="text" 
        placeholder="Start typing" 
        onChange={(element: SyntheticInputEvent<HTMLInputElement>) => onChange(element.target.value)} />
    </section>
  );
};

export default Search;
