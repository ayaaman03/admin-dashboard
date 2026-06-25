/**
 * Reusable text/number input with label + validation error display.
 * Keeping form fields consistent across Add/Edit product forms and Login.
 */
function Input({ label, error, required, optionalText, prefix, className = '', id, ...rest }) {
  const inputId = id || rest.name;

  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={inputId}>
          {label}
          {required && ' *'}
          {!required && optionalText && <span className="optional"> ({optionalText})</span>}
        </label>
      )}
      {prefix ? (
        <div className="input-prefix-wrap">
          <span className="prefix">{prefix}</span>
          <input
            id={inputId}
            className={`form-input ${error ? 'has-error' : ''} ${className}`}
            {...rest}
          />
        </div>
      ) : (
        <input
          id={inputId}
          className={`form-input ${error ? 'has-error' : ''} ${className}`}
          {...rest}
        />
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

export default Input;
