import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { getNextPage, getPreviousPage, getPageByPath, pages } from '@/lib/navigation';

export default function PageNavigation() {
  const [location] = useLocation();
  const currentPage = getPageByPath(location);
  const prevPage = getPreviousPage(location);
  const nextPage = getNextPage(location);
  const totalSteps = pages.length;

  return (
    <div className="mt-16 pt-8 border-t border-border">
      {/* プログレスバー */}
      {currentPage && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>STEP {currentPage.step} / {totalSteps}</span>
            <span>{Math.round((currentPage.step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(currentPage.step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 前後ナビゲーション */}
      <div className="flex justify-between gap-4">
        {prevPage ? (
          <Link
            href={prevPage.path}
            className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group flex-1 max-w-[45%]"
          >
            <ChevronLeft size={20} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            <div className="text-left min-w-0">
              <p className="text-xs text-muted-foreground">前のステップ</p>
              <p className="text-sm font-medium text-foreground truncate">{prevPage.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPage ? (
          <Link
            href={nextPage.path}
            className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group flex-1 max-w-[45%] justify-end text-right"
          >
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">次のステップ</p>
              <p className="text-sm font-medium text-foreground truncate">{nextPage.title}</p>
            </div>
            <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
