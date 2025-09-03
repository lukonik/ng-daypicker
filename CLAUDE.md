# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Nx monorepo for `ng-daypicker`, an Angular library project with accompanying documentation. The workspace uses Angular 20, Nx 21, and Vitest for testing.

## Workspace Structure

- **Apps**:
  - `apps/docs/`: Angular SSR documentation application that demonstrates the ng-daypicker library
  - `apps/ng-daypicker/`: The main Angular library containing the daypicker component

- **Library Structure**:
  - Main export: `apps/ng-daypicker/src/index.ts`
  - Core component: `apps/ng-daypicker/src/lib/ng-daypicker/ng-daypicker.ts`
  - Component prefix: `dp-` (e.g., `<dp-ng-daypicker>`)

## Common Development Commands

### Building
```bash
# Build all projects
npx nx run-many -t build

# Build library only
npx nx build ng-daypicker

# Build docs app only  
npx nx build docs
```

### Testing
```bash
# Run all tests
npx nx run-many -t test

# Test library only
npx nx test ng-daypicker

# Test docs app only
npx nx test docs
```

### Linting
```bash
# Lint all projects
npx nx run-many -t lint

# Lint library only
npx nx lint ng-daypicker

# Lint docs app only
npx nx lint docs
```

### Development Server
```bash
# Serve docs app (for testing library integration)
npx nx serve docs
```

### Package Management
```bash
# Start local registry for testing published packages
npx nx local-registry

# Build and test release
npx nx run-many -t build  # (preVersionCommand runs this automatically)
```

## Technical Stack

- **Angular**: v20.1.0 with standalone components
- **Nx**: v21.4.1 for monorepo management
- **Testing**: Vitest with @analogjs/vitest-angular
- **Linting**: ESLint v9 with Angular ESLint and Nx ESLint plugin
- **Build**: ng-packagr for library builds, Angular CLI for app builds
- **Packaging**: Configured for npm publishing with Nx release

## Architecture Notes

- Uses Angular standalone components (no NgModules)
- Components use OnPush change detection strategy
- ViewEncapsulation.None for styling flexibility
- Library exports through barrel export pattern in `index.ts`
- Path mapping: `"ng-daypicker": ["apps/ng-daypicker/src/index.ts"]`

## Development Workflow

1. Library development happens in `apps/ng-daypicker/src/lib/`
2. Test integration using the docs app in `apps/docs/`
3. Both projects must pass linting before commits
4. Build both projects before release to ensure compatibility

## Coding Standards

### TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Angular Best Practices
- Always use standalone components over NgModules
- Do NOT set `standalone: true` inside the `@Component`, `@Directive` and `@Pipe` decorators
- Use signals for state management
- Use `NgOptimizedImage` for all static images
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead

### Components
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- DO NOT use `ngStyle`, use `style` bindings instead

### State Management
- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

### Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

### Services
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## MCP Configuration

This project includes an MCP server configuration in `mcp.json`:
- **nx-mcp**: Provides Nx-specific tools and capabilities via `nx-mcp@latest`

## Configuration Files

- `nx.json`: Nx workspace configuration with target defaults
- `tsconfig.base.json`: TypeScript base configuration with path mappings
- `vitest.workspace.ts`: Test configuration for both projects
- `eslint.config.mjs`: Workspace-wide linting rules
- `apps/ng-daypicker/ng-package.json`: Library packaging configuration
- `mcp.json`: MCP server configuration for enhanced Nx tooling