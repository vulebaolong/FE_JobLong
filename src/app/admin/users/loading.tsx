import { TableSkeleton } from "@/components/common/skeleton/table.skeleton";

export default function Loading() {
  return <TableSkeleton rowsNum={10} />;
}
