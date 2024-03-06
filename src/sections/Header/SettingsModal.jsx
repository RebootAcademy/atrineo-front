function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-x-hidden overflow-y-auto">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content mx-auto my-10 p-6 bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
          <span className="modal-close absolute top-4 right-4 text-xl cursor-pointer" onClick={onClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal