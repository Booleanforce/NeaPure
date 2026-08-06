export const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-50 text-green-600 border border-green-200";

    case "In Progress":
      return "bg-blue-50 text-blue-600 border border-blue-200";

    case "Pending":
      return "bg-orange-50 text-orange-600 border border-orange-200";

    default:
      return "bg-red-50 text-red-600 border border-red-200";
  }
};