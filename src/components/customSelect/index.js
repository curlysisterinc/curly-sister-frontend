import React from "react";

import * as SelectPrimitive from "@radix-ui/react-select";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";

export const Select = React.forwardRef(
  ({ children, ...props }, forwardedRef) => {
    return (
      // eslint-disable-next-line
      <SelectPrimitive.Root
        defaultValue={props.default}
        value={props.value}
        name={props.name}
        onValueChange={props.onChange}
      >
        <SelectPrimitive.Trigger
          disabled={props.disabled}
          id={props.id}
          className={props.className}
          ref={forwardedRef}
        >
          <SelectPrimitive.Value aria-label={props.value}>
            {props.value}
          </SelectPrimitive.Value>

          <SelectPrimitive.Icon>
            <FiChevronDown />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Content className="bg-white p-3 border rounded border-solid border-black-50">
          <SelectPrimitive.ScrollUpButton>
            <FiChevronUp />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton>
            <FiChevronDown />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
    );
  }
);
export const SelectItem = React.forwardRef(
  ({ children, ...props }, forwardedRef) => {
    return (
      // eslint-disable-next-line
      <SelectPrimitive.Item
        className="flex items-center justify-between cursor-pointer  hover:bg-gray-100"
        value={props.value}
        ref={forwardedRef}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

        <SelectPrimitive.ItemIndicator>
          <FiCheck />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  }
);
