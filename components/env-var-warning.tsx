import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center">
      <Badge variant={"outline"} className="font-normal">
        Supabase environment variables required
      </Badge>
      <div className="flex gap-2">
        <Button size="sm" variant={"outline"} disabled>
          ورود
        </Button>
        {/* <Button size="sm" variant={"default"} disabled>
          Sign up
        </Button> */}
      </div>
    </div>
  );
}
