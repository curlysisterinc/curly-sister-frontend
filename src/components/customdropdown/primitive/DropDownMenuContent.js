import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownArrow = DropdownMenuPrimitive.Arrow;
export const DropDownCheckBoxItem = DropdownMenuPrimitive.CheckboxItem;
export const DropDownItemIndicator = DropdownMenuPrimitive.ItemIndicator;

const DropDownMenuContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.Content
        {...props} //eslint-disable-line
        className={className}
        ref={forwardedRef}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    );
  }
);

export default DropDownMenuContent;
