import { IconType } from 'react-icons/lib';
import { ChangeEventHandler } from 'react';

const style = {
  inputContainer: `text-left mb-6`,
  inputLabel: `mb-2 flex`,
  inputText: `w-full px-4 py-2 text-lg text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,
};

const Input = (props: {
  type: string;
  title: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
}) => {
  return (
    <div className={style.inputContainer}>
      <label className={style.inputLabel}>{props.title}</label>
      <input
        type={props.type}
        className={style.inputText}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required
      />
    </div>
  );
};

export default Input;
