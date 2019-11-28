import { Config, SupportedComponentTestFrameWorks } from '../../../types';

const getImportForComponentFramework = (
  testComponentFramework: SupportedComponentTestFrameWorks
) => {
  switch (testComponentFramework) {
    case 'enzyme':
      return `import { shallow } from 'enzyme';`;
    case 'react-test-renderer':
      return `import { create } from 'react-test-renderer'`;
    case 'react-testing-library':
    case '@test-library/react':
      return `import { render } from '@testing-library/react'`;
    default:
      return '';
  }
};
export const getFrameworkImports = (config: Config, hasAnyJSX: boolean) => {
  const { testComponentFramework } = config;
  const importForComponentFrameWork = getImportForComponentFramework(
    testComponentFramework
  );
  switch (config.testFramework) {
    case 'ava': {
      const ava = `import test from 'ava'`;
      return `
        ${ava} 
        ${hasAnyJSX ? importForComponentFrameWork : ''}
      `;
    }
    case 'tape': {
      const tape = `import test from 'tape'`;
      return `
        ${tape} 
        ${hasAnyJSX ? importForComponentFrameWork : ''}
      `;
    }
    case 'jest':
    default: {
      return `
        ${hasAnyJSX ? importForComponentFrameWork : ''}
      `;
    }
  }
};
