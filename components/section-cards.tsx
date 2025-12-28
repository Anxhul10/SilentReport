import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Welcome to SilentReport</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Speak Up Safely
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Secure</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">
            Anonymous whistleblowing for healthcare
          </div>
          <div className="text-muted-foreground">
            Powered by CyborgDB encrypted search
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>How SilentReport Works</CardDescription>
          <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
            Simple & Anonymous
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div>1. Write your report — no login required.</div>
          <div>2. Report is encrypted & stored via CyborgDB.</div>
          <div>3. No identity or metadata is collected.</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Public Transparency</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Search Reports
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Optional</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium">Choose to make reports public</div>
          <div className="text-muted-foreground">
            Public reports become searchable
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Open Source</CardDescription>
          <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
            Apache 2.0
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Transparent</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium">Fully open-source platform</div>
          <div className="text-muted-foreground">
            Audit, trust, and contribute freely
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
