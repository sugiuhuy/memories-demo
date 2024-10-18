export default function paginationItems(data: { current_page: number; pages: number; maxLength: number }) {
  const result: number[] = [];

  if (data.pages <= data.maxLength) {
    for (let i = 1; i <= data.pages; i++) {
      result.push(i);
    }
  } else {
    const firstPage = 1;
    const confirmPage = 3;
    const deductedMaxLength = data.maxLength - confirmPage;
    const sideLength = deductedMaxLength / 2;

    if (data.current_page - firstPage < sideLength || data.pages - data.current_page < sideLength) {
      for (let i = 1; i <= firstPage + sideLength; i++) {
        result.push(i);
      }

      result.push(NaN);

      for (let i = data.pages - sideLength; i <= data.pages; i++) {
        result.push(i);
      }
    } else if (data.current_page - firstPage >= deductedMaxLength && data.pages - data.current_page >= deductedMaxLength) {
      const deductedSideLength = sideLength - 1;

      result.push(firstPage);
      result.push(NaN);

      for (let i = data.current_page - deductedSideLength; i <= data.current_page + deductedSideLength; i++) {
        result.push(i);
      }

      result.push(NaN);
      result.push(data.pages);
    } else {
      let remainingLength = data.maxLength;

      const isNearFirstPage = data.current_page - firstPage < data.pages - data.current_page;
      if (isNearFirstPage) {
        for (let i = 1; i <= data.current_page + 1; i++) {
          result.push(i);
          remainingLength--;
        }

        result.push(NaN);
        remainingLength--;

        for (let i = data.pages - (remainingLength - 1); i <= data.pages; i++) {
          result.push(i);
        }
      } else {
        for (let i = data.pages; i >= data.current_page - 1; i--) {
          result.unshift(i);
          remainingLength--;
        }

        result.unshift(NaN);
        remainingLength--;

        for (let i = remainingLength; i >= 1; i--) {
          result.unshift(i);
        }
      }
    }
  }

  return result;
}
