# Mirror Store Pattern Implementation

## ✅ COMPLETED REFACTOR

### Before → After Summary

#### BEFORE (Prop Drilling - FORBIDDEN)
```tsx
// LandingRenderUi.tsx - BAD
export function LandingRenderUi() {
  const { t, isRTL } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <Header
      t={t}                    // ❌ Prop drilling
      isRTL={isRTL}            // ❌ Prop drilling
      isMobileMenuOpen={...}   // ❌ Prop drilling
      onMobileMenuToggle={...} // ❌ Prop drilling
      onScrollToSection={...}  // ❌ Prop drilling
    />
    <Hero t={t} isRTL={isRTL} />  // ❌ Prop drilling
    ...
  );
}
```

**Problems:**
- ❌ Prop drilling through multiple layers
- ❌ Any state change causes wide re-renders
- ❌ Components receive unnecessary props
- ❌ Hard to maintain and scale

#### AFTER (Mirror Store - CORRECT)
```tsx
// LandingRenderUi.tsx - GOOD
export function LandingRenderUi() {
  return (
    <Header />  // ✅ No props - reads from store
    <Hero />    // ✅ No props - reads from store
    ...
  );
}

// Header.tsx - GOOD
export function Header() {
  const t = useMirror('t');                    // ✅ Subscribe to specific slice
  const isRTL = useMirror('isRTL');            // ✅ Subscribe to specific slice
  const isMobileMenuOpen = useMirror('isMobileMenuOpen');
  const handleMobileMenuToggle = useMirror('handleMobileMenuToggle');
  const scrollToSection = useMirror('scrollToSection');
  // ✅ Only re-renders when subscribed slices change
}
```

**Benefits:**
- ✅ No prop drilling
- ✅ Granular re-renders (only subscribed components update)
- ✅ Clean component interfaces
- ✅ Scalable architecture

---

## 📁 Final Folder Structure (Golden Pattern)

```
app/
├── page.tsx              ✅ SERVER ONLY - renders <Factory />
├── factory.tsx           ✅ Composes Init > State > Utils > Ui
├── init/
│   └── index.tsx        ✅ Registers static props/data (if any)
├── state/
│   └── index.tsx        ✅ Registers reactive state + setters
├── utils/
│   └── index.tsx        ✅ Registers actions
├── ui/
│   ├── index.tsx        ✅ Renders LandingRenderUi
│   ├── LandingRenderUi.tsx  ✅ Page composition (no props)
│   ├── layout/
│   │   ├── Header.tsx   ✅ Uses useMirror('t'), useMirror('isRTL'), etc.
│   │   └── Footer.tsx   ✅ Uses useMirror('t')
│   └── sections/
│       ├── Hero.tsx     ✅ Uses useMirror('t'), useMirror('isRTL')
│       ├── Features.tsx ✅ Uses useMirror('t')
│       ├── HowItWorks.tsx ✅ Uses useMirror('t'), useMirror('isRTL')
│       └── Testimonial.tsx ✅ Uses useMirror('t')
└── store/               ✅ Page-scoped Mirror Store
    ├── index.ts         ✅ Creates mirror store, exports hooks
    ├── state.ts         ✅ Defines state store shape
    └── utils.ts         ✅ Defines utils store shape
```

---

## 🔑 Store Keys Registered

### State Layer (`app/state/index.tsx`)
- `isMobileMenuOpen` (boolean) - Mobile menu state
- `setIsMobileMenuOpen` (function) - Mobile menu setter
- `t` (TranslationType) - Translation object (value comparison)
- `isRTL` (boolean) - RTL flag

### Utils Layer (`app/utils/index.tsx`)
- `scrollToSection` (function) - Scrolls to section, closes mobile menu
- `handleMobileMenuToggle` (function) - Toggles mobile menu state

---

## 📊 Props Removed (Before → After)

### LandingRenderUi
**BEFORE:** Received `t`, `isRTL`, `isMobileMenuOpen`, handlers
**AFTER:** ✅ No props - reads from store

### Header
**BEFORE:** Received `t`, `isRTL`, `isMobileMenuOpen`, `onMobileMenuToggle`, `onScrollToSection`
**AFTER:** ✅ No props - uses `useMirror('t')`, `useMirror('isRTL')`, etc.

### Hero
**BEFORE:** Received `t`, `isRTL`
**AFTER:** ✅ No props - uses `useMirror('t')`, `useMirror('isRTL')`

### Features
**BEFORE:** Received `t`
**AFTER:** ✅ No props - uses `useMirror('t')`

### HowItWorks
**BEFORE:** Received `t`, `isRTL`
**AFTER:** ✅ No props - uses `useMirror('t')`, `useMirror('isRTL')`

### Testimonial
**BEFORE:** Received `t`
**AFTER:** ✅ No props - uses `useMirror('t')`

### Footer
**BEFORE:** Received `t`
**AFTER:** ✅ No props - uses `useMirror('t')`

---

## ✅ Architecture Compliance

### R1: page.tsx Server-Only ✅
- `app/page.tsx` - No "use client", no hooks, only renders `<Factory />`

### R2: Mirror Store Per Page ✅
- `app/store/` - Page-scoped mirror store created
- `app/store/index.ts` - Exports `useMirror`, `useMirrorRegistry`, `getStore`

### R3: Layer Registration ✅
- **Init:** Registers static props (currently minimal for static site)
- **State:** Registers `isMobileMenuOpen`, `setIsMobileMenuOpen`, `t`, `isRTL`
- **Utils:** Registers `scrollToSection`, `handleMobileMenuToggle`

### R4: UI Reads from Store ✅
- All UI components use `useMirror(selector)` with specific keys
- No components receive store objects as props
- No components call `useMirrorRegistry`

### R5: Render Isolation ✅
- Each UI component subscribes to smallest possible slice
- Example: `const t = useMirror('t')` ✅ NOT `const store = useMirror(s => s)` ❌
- State updates only re-render subscribed components

---

## 🎯 Performance Benefits

### Before (Prop Drilling)
- Changing `isMobileMenuOpen` → Re-renders: LandingRenderUi, Header, Hero, Features, HowItWorks, Testimonial, Footer
- **7 components re-render** for one state change

### After (Mirror Store)
- Changing `isMobileMenuOpen` → Re-renders: Only Header (subscribed to `isMobileMenuOpen`)
- **1 component re-renders** for one state change
- Changing `t` → Re-renders: Only components that use `useMirror('t')`

---

## 📝 Implementation Details

### Store Setup (`app/store/index.ts`)
```typescript
import { mirrorFactory } from '@/hooks/use-mirror-factory';
import { stateStore } from './state';
import { utilsStore } from './utils';

const { useMirror, useMirrorRegistry, getStore } = mirrorFactory({
  ...stateStore(),
  ...utilsStore(),
});

export { useMirror, useMirrorRegistry, getStore };
```

### State Registration (`app/state/index.tsx`)
```typescript
export function State({ children }: PropsWithChildren) {
  const { t, isRTL } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMirrorRegistry('isMobileMenuOpen', isMobileMenuOpen);
  useMirrorRegistry('setIsMobileMenuOpen', setIsMobileMenuOpen);
  useMirrorRegistry('t', t, 'value');  // Value comparison for object
  useMirrorRegistry('isRTL', isRTL);

  return <>{children}</>;
}
```

### Utils Registration (`app/utils/index.tsx`)
```typescript
export function Utils({ children }: PropsWithChildren) {
  useMirrorRegistry('scrollToSection', (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    getStore().setState({ isMobileMenuOpen: false });
  });

  useMirrorRegistry('handleMobileMenuToggle', () => {
    const store = getStore();
    const current = store.getState().isMobileMenuOpen;
    store.setState({ isMobileMenuOpen: !current });
  });

  return <>{children}</>;
}
```

### UI Usage (`app/ui/layout/Header.tsx`)
```typescript
export function Header() {
  const t = useMirror('t');                    // ✅ Specific selector
  const isRTL = useMirror('isRTL');            // ✅ Specific selector
  const isMobileMenuOpen = useMirror('isMobileMenuOpen');
  const handleMobileMenuToggle = useMirror('handleMobileMenuToggle');
  const scrollToSection = useMirror('scrollToSection');
  // ✅ Only re-renders when these specific values change
}
```

---

## ✅ Verification Checklist

- [x] No state/utils prop drilling
- [x] page.tsx has no "use client"
- [x] UI reads via useMirror selectors only
- [x] Each component subscribes to smallest slice
- [x] Store created per page in `app/store/`
- [x] State layer registers reactive values
- [x] Utils layer registers actions
- [x] UI components have no props from store
- [x] No components call useMirrorRegistry in UI layer

---

## 🚀 Next Steps

This pattern should be applied to:
- `app/login/` route (if it needs state management)
- Any future routes that need state/actions

The same pattern applies:
1. Create `app/<route>/store/` with `index.ts`, `state.ts`, `utils.ts`
2. Register state in `app/<route>/state/index.tsx`
3. Register actions in `app/<route>/utils/index.tsx`
4. Update UI components to use `useMirror(selector)`

