import React from 'react';

function Button({
  className,
  children,
  onClick,
  type = 'submit',
  loading = false,
  loadingText = 'Lütfen bekleyiniz.',
}) {
  return (
    <button
      className={className}
      type={type}
      disabled={loading}
      onClick={onClick}
    >
      {!loading ? children : loadingText}
    </button>
  );
}

export default Button;
