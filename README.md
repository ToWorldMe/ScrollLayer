# React Scroll Layer

This library provides a React component and hooks to manage scroll-based animations and visibility tracking within a scrollable container. It is especially useful for creating a layer that remains sticky on the screen as the user scrolls through content.

## Features

- **ScrollLayer Component**: A React component that enables sticky behavior and frame-based scroll animations for child components. It makes the layer sticky until the user scrolls past it.
- **useScrollLayer Hook**: A custom React hook to subscribe to scroll events and track visibility and scroll position.
- **Responsive**: Automatically adjusts to changes in screen size or orientation.

## Installation

Install the package using npm:

```bash
npm install react-scroll-layer
```

or using yarn:

```bash
yarn add react-scroll-layer
```

## Usage

### `ScrollLayer` Component

The `ScrollLayer` component wraps any child components that should react to the scroll position:

```jsx
import { ScrollLayer } from 'react-scroll-layer';

const App = () => {
  return (
    <div>
      <ScrollLayer id="unique-id" frames={10}>
        <div>Your content here</div>
      </ScrollLayer>
    </div>
  );
}

export default App;
```

This component will keep its children "sticky" as you scroll through, based on the number of frames specified.

### `useScrollLayer` Hook

Use the `useScrollLayer` hook to subscribe to the scroll events for specific elements:

```jsx
import { useRef } from 'react';
import { useScrollLayer } from 'react-scroll-layer';

const ScrollComponent = () => {
  const ref = useRef();
  const { visible, percent } = useScrollLayer("unique-id-2", { onScreen: true });

  return (
    <div ref={ref}>
      {visible && <p>Scroll Percent: {percent}%</p>}
    </div>
  );
}

export default ScrollComponent;

```

## API
### `<ScrollLayer>`

Props:

- **id (`string`)**: A unique identifier for the scroll layer.
- **frames (`number`)**: The number of frames to divide the scrollable height into.
- **className (`string`)**: Optional CSS class to apply to the container.
- **noSticky (`boolean`)**: If true, disables the sticky positioning of the first child.

### `useScrollLayer`

Arguments:

- **id (`string`)**: The unique identifier of the scroll layer component.
- **options (`object`)**:
  - **onScreen (`boolean`)**: If true, tracks the element based on its presence on the screen.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

### License

Distributed under the MIT License. See LICENSE for more information.
