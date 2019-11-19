import { parse, ParserPlugin } from '@babel/parser';
import { Statement } from '@babel/types';

const getDefaultName = (node: any, fileName: string) => {
  if (node.declaration) {
    if (node.declaration.id) {
      return node.declaration.id.name;
    }
    return node.declaration.name || fileName;
  }
  return fileName;
};

const getNamedExport = (node: any) => {
  console.log({ node });
  if (node.declaration && node.declaration.id) {
    return {
      type: node.type,
      declarationType: node.declaration.id.type,
      name: node.declaration.id.name
    };
  }
  if (node.declaration && node.declaration.declarations) {
    return node.declaration.declarations.map((declaration: any) => {
      console.log('LOL');
      console.log({ declaration });
      console.log('AAAAAAAAAAAAAA');
      console.log(declaration.init.params);
      console.log('BBBBBBBBBBBBB');
      console.log(declaration.init.params[0].typeAnnotation.type);
      return {
        type: node.type,
        declarationType: declaration.id.type,
        name: declaration.id.name
      };
    });
  }
  if (node.specifiers && node.specifiers.length >= 1) {
    return node.specifiers.map((specifier: any) => {
      return {
        type: node.type,
        declarationType: specifier.exported.type,
        name: specifier.exported.name
      };
    });
  }
};

function flatten(arr: any[]) {
  return [].concat(...arr);
}

const flowComments = ['// @flow', '/* @flow */'];
const getPlugins = (
  fileContents: string,
  fileExtension: ValidFileExtensions
) => {
  console.log({ fileExtension });
  if (fileExtension === '.ts' || fileExtension === '.tsx') {
    return ['typescript', 'jsx'] as ParserPlugin[];
  }

  // TODO: FLow support
  // if (
  //   fileExtension === 'js' &&
  //   flowComments.some((x: string) => fileContents.includes(x))
  // ) {
  //   return ['flow'];
  // }
  return ['jsx'] as ParserPlugin[];
};

export type ValidFileExtensions = '.tsx' | '.ts' | '.js' | '.jsx';

type ParseFileArgs = {
  fileContents: string;
  fileName: string;
  fileExtension: ValidFileExtensions;
};
export const parseFile = ({
  fileContents,
  fileName,
  fileExtension
}: ParseFileArgs) => {
  try {
    const parsedCode = parse(fileContents, {
      sourceType: 'module',
      plugins: getPlugins(fileContents, fileExtension)
    });
    const arr = parsedCode.program.body.map((node: Statement) => {
      if (node.type === 'ExportDefaultDeclaration') {
        return {
          type: node.type,
          name: getDefaultName(node, fileName)
        };
      }
      if (node.type === 'ExportNamedDeclaration') {
        return getNamedExport(node);
      }
      return null;
    });

    return {
      fileExports: flatten(arr).filter(Boolean)
    };
  } catch (err) {
    console.log({ err });
    console.error('Something went wrong parsing the file');
  }
};
