import { FaSpinner } from 'react-icons/fa';

/**
 * Reusable Button component.
 * variant: 'primary' | 'secondary' | 'danger' | 'ghost'
 * size: 'md' (default) | 'sm'
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  isLoading = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'sm' ? 'btn-sm' : '',
    block ? 'btn-block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} disabled={isLoading || rest.disabled} {...rest}>
      {isLoading && <FaSpinner className="spin-icon" style={{ animation: 'spin 0.7s linear infinite' }} />}
      {children}
    </button>
  );
}

export default Button;
