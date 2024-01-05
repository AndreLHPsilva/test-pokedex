import { SkeletonCard } from "./SkeletonCard";

export function CardPokemonSkeleton() {
  return (
    <div className="w-full flex justify-center tablet:flex-col mobile:flex-col tablet:gap-5 mobile:gap-5 tablet:items-center mobile:items-center my-10">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
