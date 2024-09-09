export function MakePegination(lastPage:number, activePage:number, delta :number=2) {
    const pagination:(string|number)[] = [];
  
    const range = {
      start: Math.max(2, activePage - delta),
      end: Math.min(lastPage - 1, activePage + delta),
    };
  
    pagination.push(1);
  
    if (range.start > 2) {
      pagination.push("...");
    }
  
    for (let i = range.start; i <= range.end; i++) {
      pagination.push(i);
    }
  
    if (range.end < lastPage - 1) {
      pagination.push("...");
    }
  
    if (lastPage > 1) {
      pagination.push(lastPage);
    }
  
    return pagination;
  }