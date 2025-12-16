"use client";

import * as React from "react";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AppearanceSettings() {
  return (
    <FieldSet>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Choose Visibility</FieldLegend>
          <FieldDescription>
            Choose the visibility for your report
          </FieldDescription>
          <RadioGroup defaultValue="kubernetes">
            <FieldLabel htmlFor="kubernetes-r2h">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Public</FieldTitle>
                  <FieldDescription>
                    This report will be visible to everyone
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem
                  value="kubernetes"
                  id="kubernetes-r2h"
                  aria-label="Kubernetes"
                />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="vm-z4k">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Private</FieldTitle>
                  <FieldDescription>
                    This report will be visible to you only
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem
                  value="vm"
                  id="vm-z4k"
                  aria-label="Virtual Machine"
                />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </FieldSet>
  );
}
