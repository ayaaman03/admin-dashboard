/** Simple loading spinner with optional message. Used for all async loading states. */
function Spinner({ message = 'Loading...', size = 'md' }) {
  return (
    <div className="loading-wrap">
      <div className={`spinner ${size === 'sm' ? 'sm' : ''}`} />
      {message && <p>{message}</p>}
    </div>
  );
}

export default Spinner;
