import { getStatusBadge } from "../../utils/getStatusBadge";

interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusBadge(
        status
      )}`}
    >
      {status}
    </span>
  );
}