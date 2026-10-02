import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PercolationData } from "../_lib/api";

export default function PercolationTable({
  percolation,
}: {
  percolation: PercolationData[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Percolation</CardTitle>
        <CardDescription>Soil type class per area</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Area</TableHead>
              <TableHead>Soil type class</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {percolation.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="h-24 text-center text-muted-foreground"
                >
                  No percolation data available.
                </TableCell>
              </TableRow>
            ) : (
              percolation.map(({ id, soil_type_area, soil_type_class }) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">
                    {soil_type_area}
                  </TableCell>
                  <TableCell className="capitalize">
                    {soil_type_class}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
