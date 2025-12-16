import {
  Card,
  CardHeader,
  CardAction,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function ViewReportContainer({
  title,
  created_at,
  description,
  visibility,
  filter,
  id,
}: {
  title: string;
  created_at: string;
  description: string;
  visibility: string;
  filter?: boolean;
  id?: string;
}) {
  const router = useRouter();
  function processTitle(title: string) {
    const data = [];
    for (let i = 0; i < 45; i++) {
      data.push(title[i]);
    }
    return data;
  }
  return (
    <div className="w-9/10 h-auto">
      <Card className="@container/card ml-15">
        <CardHeader>
          <CardDescription>Report Overview</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {processTitle(title)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">{visibility}</Badge>
            {filter && (
              <Button
                className="size-6 ml-2"
                onClick={() => {
                  router.push({
                    pathname: "/edit",
                    query: {
                      id,
                      title,
                      created_at,
                      description,
                      visibility,
                    },
                  });
                }}
              >
                edit
              </Button>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">
            {description === "" ? (
              <div className="text-red-600">description not provided</div>
            ) : (
              description.split(" ").map((val, index) => {
                if (index < 5) {
                  if (index === 4) return "....";
                  return val + " ";
                }
              })
            )}
          </div>
          <div className="text-muted-foreground">
            Created-at: {created_at.split("T")[0]}
          </div>
        </CardFooter>
      </Card>
      {/* <Card className="w-9/10 h-auto">
        <CardTitle className="ml-5">{title}</CardTitle>
        <CardDescription className="flex justify-end mr-4">
          created at - {created_at}
        </CardDescription>
      </Card> */}
    </div>
  );
}
