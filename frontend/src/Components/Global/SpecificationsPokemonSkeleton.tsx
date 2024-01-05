export function SpecificationsPokemonSkeleton() {
  return (
    <div className="w-full flex justify-center px-5">
      <div className="border flex flex-col justify-center items-center p-10 rounded gap-5 animate-pulse mx-10 mobile:mx-5">
        <div className="flex flex-col gap-3">
          <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
          <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
          <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
        </div>
        <div className="flex gap-3 justify-between w-full">
          <div className="flex flex-col gap-3">
            <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
            <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
            <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
            <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm bg-red-300 h-4 w-12 rounded"></span>
          <div className="grid grid-cols-3 xs-tablet:grid-cols-1 gap-3">
            <span className="text-sm bg-red-300 h-28 w-28 rounded"></span>
            <span className="text-sm bg-red-300 h-28 w-28 rounded"></span>
            <span className="text-sm bg-red-300 h-28 w-28 rounded"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
