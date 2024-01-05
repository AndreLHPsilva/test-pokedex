export function DatasPokemonSkeleton() {
  return (
    <div className="w-full flex justify-center">
      <div className="border flex flex-col justify-center items-center p-10 rounded w-40 h-60 gap-3 animate-pulse mx-10 mobile:mx-5">
        <span className="text-sm bg-red-300 h-28 w-28 rounded"></span>
        <div className="flex gap-3">
          <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
          <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
        </div>
        <div className="flex gap-3">
          <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
          <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
        </div>
        <div className="flex gap-3">
          <span className="text-sm bg-red-300 h-8 w-12 rounded"></span>
          <span className="text-sm bg-red-300 h-8 w-12 rounded"></span>
        </div>
        <div className="flex gap-3">
          <span className="text-sm bg-red-300 h-4 w-28 rounded"></span>
        </div>
      </div>
    </div>
  );
}
