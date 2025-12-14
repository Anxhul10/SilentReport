import { AlertCircleIcon } from "lucide-react";

import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Toogle() {
  return (
    <>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <InputGroupAddon>
              <InputGroupButton variant="secondary" size="icon-xs">
                <AlertCircleIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex flex-col gap-1 rounded-xl text-sm"
          >
            <div>
              <div>
                <strong>Corruption:</strong>{" "}
                <span className="text-muted">
                  Bribery, misuse of funds, abuse of power
                </span>
              </div>

              <div>
                <strong>Fraud:</strong>{" "}
                <span className="text-muted">
                  Financial fraud, fake billing, scams
                </span>
              </div>

              <div>
                <strong>Misconduct:</strong>{" "}
                <span className="text-muted">
                  Ethical or professional misconduct
                </span>
              </div>

              <div>
                <strong>Abuse:</strong>{" "}
                <span className="text-muted">
                  Abuse of authority or position
                </span>
              </div>

              <div>
                <strong>Negligence:</strong>{" "}
                <span className="text-muted">Carelessness causing harm</span>
              </div>

              <div>
                <strong>Cover-Up:</strong>{" "}
                <span className="text-muted">
                  Evidence suppression or hiding facts
                </span>
              </div>

              <div>
                <strong>Data Tampering:</strong>{" "}
                <span className="text-muted">Record manipulation</span>
              </div>

              <div>
                <strong>Conflict of Interest:</strong>{" "}
                <span className="text-muted">Personal gain over duty</span>
              </div>

              <div>
                <strong>Policy Violation:</strong>{" "}
                <span className="text-muted">Breaking internal rules</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
