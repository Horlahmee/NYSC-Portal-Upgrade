import { clsx } from 'clsx'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={clsx('animate-pulse rounded-lg bg-gray-100', className)} />
}

export function SkeletonCard() {
  return (
    <div className="card space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="card space-y-3">
      <Skeleton className="h-4 w-1/4 mb-4" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  )
}
