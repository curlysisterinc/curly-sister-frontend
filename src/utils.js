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

export const getNextPageParam = (currentPage) => {
  const totalPage = currentPage.data.totalStylistCount / currentPage.data.size;
  const lastPage =
    currentPage.data.totalStylistCount % currentPage.data.size === 0
      ? totalPage
      : Math.floor(totalPage + 1);
  const nextPage =
    currentPage?.data?.page !== lastPage
      ? currentPage.data.page + 1
      : undefined;
  return nextPage;
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt({ min = 0, max = 0 }) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
