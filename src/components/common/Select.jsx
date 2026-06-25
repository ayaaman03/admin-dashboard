/** Reusable select dropdown. `options` is an array of { value, label }. */
function Select({ label, options, className = '', id, name, ...rest }) {
  const inputId = id || name;

  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <select id={inputId} name={name} className={`form-select ${className}`} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
