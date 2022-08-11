import React from "react";
import { DropdownMenu, DropdownMenuTrigger } from "./DropDownMenuContent";

function DropDown({ children, content, disabled }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} asChild className="">
        {children}
      </DropdownMenuTrigger>
      {content}
    </DropdownMenu>
  );
}

export default DropDown;
