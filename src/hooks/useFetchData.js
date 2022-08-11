import { useEffect } from "react";

function useFetchData(endpoint, stateSetter, state, dependant) {
  useEffect(() => {
    const ac = new AbortController();
    endpoint
      .then((response) => {
        console.log(response.data, `data fetched ${state}`);
        stateSetter(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, `error fetching ${state}`);
      });

    return function cleanup() {
      ac.abort();
    };
  }, [dependant]);
}

export default useFetchData;
