export function SkeletonCard() {
  return (
    <div className="border flex flex-col justify-center items-center p-10 rounded w-80 gap-3 animate-pulse mx-10 mobile:mx-5">
      <div className="max-w-20 max-h-20 bg-red-300 rounded"></div>
      <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
      <span className="font-Bevan bg-red-300 h-6 w-32 rounded"></span>
      <div className="flex gap-3">
        <span className="bg-red-300 px-2 py-1 h-6 w-12 rounded"></span>
        <span className="bg-red-300 px-2 py-1 h-6 w-12 rounded"></span>
      </div>
    </div>
  );
}
