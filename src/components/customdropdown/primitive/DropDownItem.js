import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

const DropDownItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.Item
        className={className}
        {...props} //eslint-disable-line
        ref={forwardedRef}
      >
        {children}
      </DropdownMenuPrimitive.Item>
    );
  }
);

export default DropDownItem;
