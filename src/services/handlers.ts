import type { FetcherWithComponents } from "react-router";
import type { Status } from "../types";

export default function handleResetFetcherContext(
    fetcher: FetcherWithComponents<Status>,
) {
    if (!fetcher.data) {
        return;
    }

    fetcher.data = undefined;
}
