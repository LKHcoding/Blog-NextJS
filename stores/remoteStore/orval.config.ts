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
          getUsers: {
            query: {
              useQuery: true,
              signal: true,
              options: {
                staleTime: 0,
                cacheTime: 0,
              },
            },
          },
        },
        query: {
          useQuery: true,
          signal: true,
        },
        header: (infoObject) => `/**
 * Do not edit manually.
 * ${infoObject.title}
 * OpenAPI spec version: ${infoObject.version}
*/
`,
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
