export function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-20 bg-gray-100 rounded-full" />
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-4 w-2/3 bg-gray-100 rounded" />
        <div className="h-3 w-full bg-gray-50 rounded" />
        <div className="h-3 w-4/5 bg-gray-50 rounded" />
        <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gray-50">
          <div className="w-6 h-6 rounded-full bg-gray-100" />
          <div className="h-3 w-16 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FeaturedCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden animate-pulse flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/5 aspect-[16/10] lg:aspect-auto lg:min-h-[420px] bg-gray-100" />
      <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center gap-4">
        <div className="h-5 w-24 bg-gray-100 rounded-full" />
        <div className="h-8 w-full bg-gray-100 rounded" />
        <div className="h-8 w-4/5 bg-gray-100 rounded" />
        <div className="h-4 w-full bg-gray-50 rounded" />
        <div className="h-4 w-3/4 bg-gray-50 rounded" />
        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full bg-gray-100" />
          <div className="h-3 w-24 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-4 animate-pulse">
      <div className="px-2 pb-3 mb-1 border-b border-gray-50">
        <div className="h-3 w-24 bg-gray-100 rounded" />
      </div>
      <div className="space-y-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 items-start p-4">
            <div className="w-20 h-16 rounded-xl bg-gray-100 shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 w-16 bg-gray-100 rounded-full" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-2/3 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function CategorySectionSkeleton() {
  return (
    <div className="py-10 border-t border-gray-100 first:border-t-0 first:pt-0 animate-pulse">
      <div className="h-6 w-40 bg-gray-100 rounded mb-6" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="aspect-[16/9] bg-gray-100" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-20 bg-gray-100 rounded-full" />
              <div className="h-5 w-full bg-gray-100 rounded" />
              <div className="h-5 w-3/4 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="aspect-[16/10] bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-16 bg-gray-100 rounded-full" />
                  <div className="h-4 w-full bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3 bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-3 w-16 bg-gray-100 rounded-full" />
                <div className="h-3 w-full bg-gray-100 rounded" />
                <div className="h-3 w-2/3 bg-gray-100 rounded" />
              </div>
              <div className="w-16 h-14 rounded-lg bg-gray-100 shrink-0" />
            </div>
          ))}
          <div className="h-11 w-full bg-gray-200 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
}