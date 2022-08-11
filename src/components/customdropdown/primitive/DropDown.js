import React from "react";
import DropDownMenuContent, {
  DropdownMenu,
  DropdownMenuTrigger,
} from "./DropDownMenuContent";

function DropDown({ children, trigger, disabled, contentClassName }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} asChild className="">
        {trigger}
      </DropdownMenuTrigger>
      <DropDownMenuContent className={contentClassName}>
        {children}
      </DropDownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
