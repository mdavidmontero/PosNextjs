import TransactionFilter from "../../../components/transactions/TransactionFilter";
import Headin from "../../../components/ui/Headin";
import { format } from "date-fns";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getSalesByDate } from "@/api";

export default async function SalesPage() {
  const queryClient = new QueryClient();
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");
  await queryClient.prefetchQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });
  return (
    <>
      <Headin>Ventas</Headin>
      <p className="text-lg">
        En esta sección apareceran todas las ventas, utiliza el calendario para
        filtrar por fecha
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
    </>
  );
}
