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
