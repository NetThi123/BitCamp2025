import '../styles/MyCollege_PopUpStyles.css';

function MyCollege_PopUp({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select Your School</h2>
        <button className="modal-close-btn" onClick={onClose}>
        &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default MyCollege_PopUp;
