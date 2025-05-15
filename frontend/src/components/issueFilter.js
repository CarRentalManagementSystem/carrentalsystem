
export const filterByCategory = (issues, category) => {
  if (!category) return issues;
  return issues.filter((issue) => issue.issueCategory === category);
};

export const sortByStatusAndDate = (issues) => {
  return issues.slice().sort((a, b) => {
    if (a.issueStatus === 'incomplete' && b.issueStatus === 'completed') return -1;
    if (a.issueStatus === 'completed' && b.issueStatus === 'incomplete') return 1;
    return new Date(b.createdDate) - new Date(a.createdDate);
  });
};
