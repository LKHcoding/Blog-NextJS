module.exports = (inputSchema) => {
  return {
    ...inputSchema,
    paths: Object.entries(inputSchema.paths).reduce((acc, [path, pathItem]) => {
      const operationPath = path
        .replace(/{./g, (m) => m[1].toUpperCase())
        .replace(/}/g, '')
        .replace(/\/./g, (m) => m[1].toUpperCase())
        .replace(/\-./g, (m) => m[1].toUpperCase())
        .replace(/V1/g, '');
      console.log('-> operationPath', operationPath);

      return {
        ...acc,
        [path]: Object.keys(pathItem)
          .filter((key) => {
            const filterOperationTagList = ['AUTH', 'BLOG', 'USER'];
            for (const item of filterOperationTagList) {
              if (pathItem[key].tags?.includes(item)) {
                return true;
              }
            }
            return false;
          })
          .reduce((obj, key) => {
            obj[key] = pathItem[key];
            obj[key] = { ...obj[key], operationId: `${key}${operationPath}` };
            return obj;
          }, {}),
      };
    }, {}),
  };
};
