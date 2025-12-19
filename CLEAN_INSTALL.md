# Clean Install Instructions - React 19.2.1 + R3F v9 + Drei v10

## Fix React Three Fiber + React 19 Compatibility Issue

This fix uses React 19.2.1 (pinned exact versions), React Three Fiber v9, and Drei v10 to resolve the `ReactCurrentOwner` error in Next.js 15.

### Step 1: Delete build artifacts and dependencies

```powershell
# Windows PowerShell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Force yarn.lock -ErrorAction SilentlyContinue
Remove-Item -Force pnpm-lock.yaml -ErrorAction SilentlyContinue
```

### Step 2: Install dependencies (NO --force or --legacy-peer-deps)

```bash
npm install
```

**Important:** Do NOT use `--force` or `--legacy-peer-deps` flags. If installation fails, see fallback instructions below.

### Step 3: Verify versions

After installation, verify these versions are correct:

```bash
# Check for single React version (no duplicates)
npm ls react react-dom

# Verify R3F is v9
npm ls @react-three/fiber

# Verify Drei is v10
npm ls @react-three/drei
```

Expected versions:
- `react`: 19.2.1 (exact, must match react-dom)
- `react-dom`: 19.2.1 (exact, must match react)
- `@react-three/fiber`: ^9.0.0 (React 19 compatible)
- `@react-three/drei`: ^10.0.0 (compatible with R3F v9 and React 19)
- `next`: ^15.1.6
- `@types/react`: ^19.0.0
- `@types/react-dom`: ^19.0.0

### Step 4: Test the application

```bash
npm run dev
```

The Hero section should now load without ReactCurrentOwner errors.

## Fallback: Next.js 14 + React 18.2 + R3F v8 + Drei v9

If the above still crashes, downgrade to stable versions:

### Update package.json:

```json
{
  "dependencies": {
    "next": "14.2.16",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@react-three/fiber": "^8.17.10",
    "@react-three/drei": "^9.114.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

Then run the clean install steps above.

## What was fixed:

1. ✅ Pinned React and react-dom to 19.2.1 (same exact versions)
2. ✅ Upgraded @react-three/fiber to v9.0.0 (React 19 compatible)
3. ✅ Upgraded @react-three/drei to v10.0.0 (compatible with R3F v9 and React 19)
4. ✅ Updated @types/react and @types/react-dom to 19.0.0
5. ✅ Hero3D component is client-only with 'use client' directive
6. ✅ Dynamic import with SSR disabled prevents server-side rendering
7. ✅ Loader only shows in 3D area, doesn't block page
8. ✅ Text content renders immediately
9. ✅ GLB file path verified: `/models/hero.glb` → `public/models/hero.glb` ✓

## Reference

Based on the fix from: https://github.com/vercel/next.js/issues/71836
