# Design Patterns

This document describes the common design patterns used in the BarFindr application.

## Component Patterns

### Compound Components

Compound components are a pattern where multiple components work together to provide a cohesive API. This pattern is used for complex UI elements like tabs, accordions, and forms.

Example:

```tsx
// Usage
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab2">Tab 2 content</TabsContent>
</Tabs>

// Implementation
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{
  value: string;
  onChange: (value: string) => void;
}>({
  value: '',
  onChange: () => {},
});

function Tabs({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) {
  const [value, setValue] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ value, onChange: setValue }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="tabs-list">{children}</div>;
}

function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const { value: selectedValue, onChange } = useContext(TabsContext);
  
  return (
    <button
      className={`tabs-trigger ${value === selectedValue ? 'active' : ''}`}
      onClick={() => onChange(value)}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  const { value: selectedValue } = useContext(TabsContext);
  
  if (value !== selectedValue) return null;
  
  return <div className="tabs-content">{children}</div>;
}
```

### Render Props

Render props is a pattern where a component takes a function as a prop that returns a React element. This pattern is used for components that need to share logic but have different rendering.

Example:

```tsx
// Usage
<Toggle>
  {({ on, toggle }) => (
    <div>
      <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
      {on && <div>Content when on</div>}
    </div>
  )}
</Toggle>

// Implementation
import { useState } from 'react';

function Toggle({ children }: { children: (props: { on: boolean; toggle: () => void }) => React.ReactNode }) {
  const [on, setOn] = useState(false);
  
  const toggle = () => setOn(!on);
  
  return <>{children({ on, toggle })}</>;
}
```

### Higher-Order Components (HOCs)

Higher-order components are functions that take a component and return a new component with additional props or behavior. This pattern is used for cross-cutting concerns like authentication, logging, and error handling.

Example:

```tsx
// Usage
const EnhancedComponent = withAuth(MyComponent);

// Implementation
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuth(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (!user) {
      router.push('/login');
      return null;
    }
    
    return <Component {...props} />;
  };
}
```

### Custom Hooks

Custom hooks are functions that use React hooks and can be reused across components. This pattern is used for encapsulating complex logic and state management.

Example:

```tsx
// Usage
function MyComponent() {
  const { value, setValue, reset } = useFormField('');
  
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// Implementation
import { useState, useCallback } from 'react';

function useFormField<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  
  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);
  
  return { value, setValue, reset };
}
```

## State Management Patterns

### Context + Reducer

The Context + Reducer pattern combines React Context for sharing state with useReducer for state management. This pattern is used for complex state that needs to be accessed by multiple components.

Example:

```tsx
// Usage
function App() {
  return (
    <CartProvider>
      <Header />
      <ProductList />
      <Cart />
    </CartProvider>
  );
}

function Header() {
  const { state } = useCartContext();
  
  return (
    <header>
      <div>Cart: {state.items.length} items</div>
    </header>
  );
}

function Cart() {
  const { state, dispatch } = useCartContext();
  
  return (
    <div>
      {state.items.map((item) => (
        <div key={item.id}>
          {item.name} - ${item.price}
          <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

// Implementation
import { createContext, useContext, useReducer, ReactNode } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string };

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCartContext() {
  return useContext(CartContext);
}
```

### Custom Hooks for State

Custom hooks can be used to encapsulate state logic and provide a clean API for components. This pattern is used for reusable state logic.

Example:

```tsx
// Usage
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// Implementation
import { useState, useCallback } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount((c) => c - 1);
  }, []);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
}
```

## Data Fetching Patterns

### Custom Hooks for Data Fetching

Custom hooks can be used to encapsulate data fetching logic. This pattern is used for reusable data fetching logic.

Example:

```tsx
// Usage
function BarList() {
  const { bars, loading, error } = useBars();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {bars.map((bar) => (
        <BarCard key={bar.id} bar={bar} />
      ))}
    </div>
  );
}

// Implementation
import { useState, useEffect } from 'react';
import { Bar } from '@/lib/types';
import { bars as barsData } from '@/lib/data';

function useBars() {
  const [bars, setBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchBars = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setBars(barsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch bars'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchBars();
  }, []);
  
  return { bars, loading, error };
}
```

### SWR for Data Fetching

SWR is a React hook for data fetching that provides caching, revalidation, and more. This pattern is used for data that needs to be kept in sync with the server.

Example:

```tsx
// Usage
function BarList() {
  const { data, error, isLoading } = useSWR('/api/bars', fetcher);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data.map((bar) => (
        <BarCard key={bar.id} bar={bar} />
      ))}
    </div>
  );
}

// Implementation
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
```

## UI Patterns

### Controlled Components

Controlled components are components where the value is controlled by React state. This pattern is used for form elements and other interactive components.

Example:

```tsx
// Usage
function Form() {
  const [name, setName] = useState('');
  
  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  );
}
```

### Uncontrolled Components

Uncontrolled components are components where the value is controlled by the DOM. This pattern is used for simple form elements where you don't need to track the value in React state.

Example:

```tsx
// Usage
function Form() {
  const nameRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(nameRef.current?.value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={nameRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Composition

Composition is a pattern where components are composed together to create more complex components. This pattern is used for building reusable component libraries.

Example:

```tsx
// Usage
function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button>Button</Button>
      </CardFooter>
    </Card>
  );
}

// Implementation
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="card-title">{children}</h3>;
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="card-description">{children}</p>;
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="card-content">{children}</div>;
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="card-footer">{children}</div>;
}

function Button({ children }: { children: React.ReactNode }) {
  return <button className="button">{children}</button>;
}
```

## Error Handling Patterns

### Error Boundaries

Error boundaries are components that catch JavaScript errors in their child component tree and display a fallback UI. This pattern is used for handling errors in React components.

Example:

```tsx
// Usage
function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <MyComponent />
    </ErrorBoundary>
  );
}

// Implementation
import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
```

### Try/Catch with Error State

Try/catch with error state is a pattern where errors are caught and stored in state. This pattern is used for handling errors in async functions.

Example:

```tsx
// Usage
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/data');
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render data */}</div>;
}
```

## Best Practices

1. **Use the right pattern for the job**
   - Choose patterns based on the specific requirements
   - Don't overcomplicate simple components

2. **Keep components focused**
   - Each component should have a single responsibility
   - Extract complex logic to custom hooks

3. **Use composition over inheritance**
   - Compose components together to create more complex components
   - Avoid inheritance for component reuse

4. **Handle errors gracefully**
   - Use error boundaries for component errors
   - Use try/catch for async errors

5. **Use TypeScript**
   - Define types for all props and state
   - Use generics for reusable components and hooks

6. **Document patterns**
   - Add comments to explain complex patterns
   - Provide examples for how to use patterns

## Related Documentation

- [Component System](../components/component-system.md) - Overview of the component system
- [Application Architecture](./application-architecture.md) - Overview of the application architecture
