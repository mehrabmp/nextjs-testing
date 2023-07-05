import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <button
        className="flex w-full items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;
