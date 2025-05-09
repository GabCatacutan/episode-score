export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-white-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}