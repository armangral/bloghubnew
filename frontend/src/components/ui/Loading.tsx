export default function Loading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center space-x-3">
        <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-bounce"></div>
        <div
          className="w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
}
