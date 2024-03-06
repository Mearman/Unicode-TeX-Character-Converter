#!/bin/bash -e

# yarn tsx --test ./__tests__/**/*.test.ts
# # yarn node --loader ts-node/esm --test ./__tests__/**/*.test.ts
# yarn node --loader @esbuild-kit/esm-loader --test -r esbuild-register ./__tests__/**/*.test.ts
# yarn node --loader @esbuild-kit/esm-loader --test ./__tests__/**/*.test.ts
# yarn node --import tsx --test ./__tests__/**/*.test.ts
# yarn glob ./__tests__/**/*.test.ts -c 'tsx --test'
# yarn glob ./__tests__/**/*.test.ts -c 'node --import tsx --test'
# yarn dlx tsx --test ./__tests__/**/*.test.ts
# # yarn dlx node --loader ts-node/esm --test ./__tests__/**/*.test.ts
# # yarn dlx node --loader @esbuild-kit/esm-loader --test -r esbuild-register ./__tests__/**/*.test.ts
# # yarn dlx node --loader @esbuild-kit/esm-loader --test  ./__tests__/**/*.test.ts
# # yarn dlx node --import tsx --test ./__tests__/**/*.test.ts
# # yarn dlx glob ./__tests__/**/*.test.ts -c 'tsx --test'
# yarn dlx glob ./__tests__/**/*.test.ts -c 'node --import tsx --test'
# # node --loader ts-node/esm --test ./__tests__/**/*.test.ts
node --loader @esbuild-kit/esm-loader --test -r esbuild-register ./__tests__/**/*.test.ts
node --loader @esbuild-kit/esm-loader --test ./__tests__/**/*.test.ts
node --import tsx --test ./__tests__/**/*.test.ts
