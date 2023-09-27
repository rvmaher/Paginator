# React Native Pagination

The `pagination-react-native` package provides a pagination component for React Native applications.

## Installation

To install `pagination-react-native`, simply run the following command in your project directory:

`npm install pagination-react-native`

## Features

| Feature       | Description                                          |
| ------------- | ---------------------------------------------------- |
| currPage      | The number shows current Page.                       |
| total Pages   | indicates pages for pagination.                      |
| onPageChange  | events to handle on page change events.              |
| pagesPerBatch | no of siblings on single batch.(default 3)(optional) |

## Usage

Here's an example of how to use the `Pagination` component in your React Native application:

```jsx
import React from "react";
import PaginationReactNative from "pagination-react-native";

const MyComponent = () => {
  const [currPage, setCurrPage] = useState(1);

  const onPageChange = (page: number) => {
    console.log(`page changed: ${page}`);
    setCurrPage(page);
  };

  return (
    <PaginationReactNative
      currPage={currPage}
      totalPages={10}
      onPageChange={onPageChange}
      pagesPerBatch={3}
    />
  );
};

export default MyComponent;
```
