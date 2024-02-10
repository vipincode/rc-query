# intro

## refetchInterval: number | false | ((query: Query) => number | false | undefined)

-Optional
-If set to a number, all queries will continuously refetch at this frequency in milliseconds
-If set to a function, the function will be executed with the query to compute a frequency

## refetchIntervalInBackground: boolean

-Optional
-If set to true, queries that are set to continuously refetch with a refetchInterval will continue to refetch while their tab/window is in the background

Use this when you want to load or refetch data every seconds,
Background Refetch work when user switch the tab.
