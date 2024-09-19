# `useCardStore` Documentation

This file defines a Pinia store named `useCardStore`, which manages the state and actions related to handling "card" data in a Nuxt 3 application. The store is responsible for fetching, adding, editing, and removing cards, as well as handling house values, pagination, and toasts.

## Functions

### `fetchHouseValues()`

This asynchronous function fetches house values from the backend API and handles potential errors. Used to set the initial House Values.

### Error Handling

Errors that occur during API requests are caught and logged to the console, but no specific user-facing error messages or actions are handled here.
Errors are logged into the console, the user if however informed that there was an error.

### State

- **`cardData`** (`Card[]`): An array that holds card data fetched from the backend.
- **`houseValues`** (`number[]`): An array of house values fetched from the backend.
- **`cardBeingEdited`** (`Card`): Represents a single card currently being edited.
- **`totalPages`** (`number`): The total number of pages available for pagination when fetching deals.
- **`currentPage`** (`number`): The current page of fetched data.
- **`toastTimeout`** (`number`): Timeout duration for toast messages in milliseconds.

### Actions

#### `loadInitialData()`

Fetches the initial house values by calling the `fetchHouseValues()` function and assigns the result to the `houseValues` state.

#### `addCard(newCard: Card)`

Sends a `POST` request to add a new card to the backend database.

- **URL**: `${baseURL}/deals`
- **Parameters**:
  - `newCard` (of type `Card`): The new card data to be sent.
- **Returns**: The HTTP response status code, or `null` in case of an error.

#### `removeCard(cardId: string)`

Sends a `DELETE` request to remove a card from the backend.

- **URL**: `${baseURL}/deals/${cardId}`
- **Parameters**:
  - `cardId` (`string`): The ID of the card to be removed.
- **Returns**: The HTTP response status code, or `null` if the request fails.

#### `editCard(updatedData: Card)`

Sends a `PUT` request to update the details of an existing card.

- **URL**: `${baseURL}/deals/${updatedData._id}`
- **Parameters**:
  - `updatedData` (`Card`): The updated card data.
- **Returns**: The HTTP response status code, or `null` in case of an error.

#### `fetchDeals(page: number, searchInput: string)`

Fetches a paginated list of deals from the backend and updates the `cardData`, `totalPages`, and `currentPage` state.

- **URL**: `${baseURL}/deals`
- **Parameters**:
  - `page` (`number`): The current page number to fetch.
  - `searchInput` (`string`): A search string to filter deals.
- **Updates**:
  - `cardData`: Array of fetched deals.
  - `totalPages`: The total number of pages.
  - `currentPage`: The current page number.
- **Error Handling**: Logs any errors to the console.
