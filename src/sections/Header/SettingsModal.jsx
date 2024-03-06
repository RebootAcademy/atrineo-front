import{ useEffect } from "react"

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && !e.target.closest(".modal-content")) {
        onClose()
      }
    }

    // Agregar un event listener para cerrar el modal al hacer clic fuera de él
    document.addEventListener("mousedown", handleOutsideClick)

    // Limpiar el event listener al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 mt-6">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content mx-auto my-10 p-6 bg-red-400 rounded-lg shadow-lg">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
