import { FileExport } from '../../../types';
import { testIfNodeIsJSX } from '../../../utils';

export const getDefaultName = (
  node: any, // TODO: remove the any
  fileName?: string
) => {
  if (node.declaration) {
    if (node.declaration.id) {
      return node.declaration.id.name;
    }
    return node.declaration.name || fileName;
  }
  return fileName;
};

export const getNamedExport = (
  node: any // TODO: Remove the any
): FileExport | FileExport[] | undefined => {
  const isJSX = testIfNodeIsJSX(node);
  if (node.declaration?.id) {
    return {
      type: node.type,
      declarationType: node.declaration.id.type,
      name: node.declaration.id.name,
      jsx: isJSX
    };
  }
  if (node.declaration?.declarations) {
    return node.declaration.declarations.map((declaration: any) => {
      return {
        type: node.type,
        declarationType: declaration.id.type,
        jsx: isJSX,
        name: declaration.id.name
      };
    });
  }
  if (node.specifiers?.length >= 1) {
    return node.specifiers.map((specifier: any) => {
      return {
        type: node.type,
        declarationType: specifier.exported.type,
        jsx: isJSX,
        name: specifier.exported.name
      };
    });
  }
};
