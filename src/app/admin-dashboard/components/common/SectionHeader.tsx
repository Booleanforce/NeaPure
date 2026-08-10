interface Props {
  title: string;
  action?: React.ReactNode;
}

export default function SectionHeader({
  title,
  action,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h3 className="font-bold text-gray-900 text-lg">
        {title}
      </h3>

      {action}
    </div>
  );
}