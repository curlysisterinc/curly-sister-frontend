/**
 *function for accessibility that allows user to run a function using the
 *keyboard instead of click.
 * @param e:any, keyboard event
 * @param fn: ()=> void, function to run
 */
export const runFunctionWhenSpaceOrEnterIsClicked = (e, fn) => {
  const enterOrSpace =
    e.key === "Enter" ||
    e.key === " " ||
    e.key === "Spacebar" ||
    e.which === 13 ||
    e.which === 32;
  if (enterOrSpace) {
    e.preventDefault();
    fn();
  }
};

// toggle Disables Background Scrolling whilst the SideDrawer/Modal is open
export const toggleFixedAppLayout = () => {
  if (typeof window !== "undefined" && window.document) {
    const appLayout = document.querySelector("#appLayout");
    if (appLayout.style.position === "fixed") {
      appLayout.style.position = "unset";
    } else if (
      appLayout.style.position === "unset" ||
      !appLayout.style.position
    ) {
      appLayout.style.position = "fixed";
    }
  }
};
