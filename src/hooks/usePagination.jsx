import { getRange } from '../utils/util';
import { useMemo } from 'react';

// Separater for large page ranges - ex. 1 ... 14 15 16 ... 100
export const SEPERATOR = '...';

/**
 * @desc - Custom hook to retreive pagination range
 * @param - {number} total - The total number of items
 * @param - {number} numberPerPage - The number of items per page
 * @param - {number} currentPage - The current page
 * @param - {number} siblingCount - The number of sibling pages to show
 * @returns
 */
export const usePagination = ({ total, numberPerPage, currentPage, siblingCount = 1 }) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(total / numberPerPage);

    // siblingCount + firstPage + lastPage + 2*seperator
    const totalPageNumbers = siblingCount + 5;

    /*
            Case 1: If the total number of pages is less than the total number of page numbers
        */
    if (totalPageNumbers >= totalPageCount) {
      return getRange(1, totalPageCount);
    }

    /*
            Calculate the left and right sibling index 
        */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftSeperator = leftSiblingIndex > 2;
    const shouldShowRightSeperator = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
            Case 2: Right seperator is shown, but no left seperator
        */
    if (!shouldShowLeftSeperator && shouldShowRightSeperator) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = getRange(1, leftItemCount);

      return [...leftRange, SEPERATOR, totalPageCount];
    }

    /*
            Case 3: Left seperator is shown, but no right seperator
        */
    if (shouldShowLeftSeperator && !shouldShowRightSeperator) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = getRange(totalPageCount - rightItemCount + 1, totalPageCount);

      return [firstPageIndex, SEPERATOR, ...rightRange];
    }

    /*
            Case 4: Both seperators are shown
        */
    if (shouldShowLeftSeperator && shouldShowRightSeperator) {
      const middleRange = getRange(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, SEPERATOR, ...middleRange, SEPERATOR, lastPageIndex];
    }
  }, [total, numberPerPage, currentPage, siblingCount]);

  return paginationRange;
};
