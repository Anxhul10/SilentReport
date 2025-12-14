import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function ViewReportContainer({
  title,
  created_at,
}: {
  title: string;
  created_at: string;
}) {
  return (
    <div className="flex justify-center">
      <Card className="w-9/10 h-auto">
        <CardTitle className="ml-5">{title}</CardTitle>
        <CardDescription className="flex justify-end mr-4">
          created at - {created_at}
        </CardDescription>
      </Card>
    </div>
  );
}
