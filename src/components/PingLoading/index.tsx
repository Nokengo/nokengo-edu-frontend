import React from 'react';

// import { Container } from './styles';

interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  waiting?: boolean;
}

const PingLoadingButton: React.FC<Props> = ({ text, onClick, disabled, waiting }) => {
  return (
    <div className="flex items-center justify-center">
      <span className="relative inline-flex">
        <button type="button" disabled={disabled} onClick={onClick}
          className={`${disabled && 'cursor-not-allowed '}inline-flex items-center px-8 py-5 font-semibold leading-6 text-sm shadow rounded-3xl text-sky-500 bg-slate-900 hover:bg-slate-800 transition ease-in-out duration-150 ring-1 ring-slate-200/20`}>
          {text}
        </button>
        {waiting && (
          <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        )}
      </span>
    </div>
  );
}

export default PingLoadingButton;