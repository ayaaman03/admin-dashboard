/** Reusable textarea, mirrors Input's API for consistency. */
function Textarea({ label, error, required, className = '', id, ...rest }) {
  const inputId = id || rest.name;

  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={inputId}>
          {label}
          {required && ' *'}
        </label>
      )}
      <textarea
        id={inputId}
        className={`form-textarea ${error ? 'has-error' : ''} ${className}`}
        {...rest}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

export default Textarea;
