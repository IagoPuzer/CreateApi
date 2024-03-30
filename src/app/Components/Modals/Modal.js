export default function EditedCardModal({ isOpen, children }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          {children}
        </div>
      )}
    </>
  );
}
