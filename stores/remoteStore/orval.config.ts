import { defineConfig } from 'orval';

export default defineConfig({
  develoggerStore: {
    output: {
      mode: 'tags-split',
      target: 'endpoints/develoggerFromFileSpecWithTransformer.ts',
      client: 'react-query',
      schemas: 'model',
      mock: false,
      headers: true,
      clean: true,
      override: {
        useTypeOverInterfaces: true,
        mutator: {
          path: 'mutator/customAxios.ts',
          name: 'customAxios',
        },
        operations: {
          // getApiContentsFaqSearch: {
          //   query: {
          //     useInfinite: true,
          //     useInfiniteQueryParam: 'offset',
          //     signal: true,
          //   },
          // },
        },
        query: {
          useQuery: true,
          signal: true,
        },
      },
    },
    input: {
      target: 'http://localhost:3030/api-json',
      override: {
        transformer: 'transformer/input-filter',
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
