import * as React from 'react';
import { cn } from '@/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <>
        <input
          className={cn(
            'w-full rounded-md border border-solid border-neutral-300 p-2 text-sm focus:outline-blue-600',
            {
              'border-red-500 focus:outline-red-500': error,
            }
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span
            className="text-xs font-normal text-red-600"
            data-cy="error-message"
            data-testid="error-message"
          >
            {error}
          </span>
        )}
      </>
    );
  }
);
Input.displayName = 'Input';

export default Input;
