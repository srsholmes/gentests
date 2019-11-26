import { FileExport } from '../../../types';

let expectation = `
      const expected = null;
      expect(actual).toBe(expected);
     });
`;

function getDescribeStatement(name: string) {
  return `describe('${name}', () => {
    it('${name} should fail the automatically generated test', () => {
`;
}

export const testTemplate = ({ name, jsx }: FileExport) => {
  return ` 
      ${getDescribeStatement(name)}      
      const actual = ${jsx ? `<${name}/>` : `${name}()`};
      ${expectation}    
  });
 `;
};

export const enzymeTemplate = ({ name, jsx }: FileExport) => {
  return `
    ${getDescribeStatement(name)}      
      const actual = ${jsx ? `shallow(<${name}/>)` : `${name}()`};
      ${expectation}    
    });
  });
 `;
};

export const reacteTestRendererTemplate = ({ name, jsx }: FileExport) => {
  return `
    ${getDescribeStatement(name)}      
      const actual = ${jsx ? `create(<${name}/>)` : `${name}()`};
      ${expectation}    
    });
  });
 `;
};

export const reactTestingLibraryTemplate = ({ name, jsx }: FileExport) => {
  return `
    ${getDescribeStatement(name)}      
      const actual = ${jsx ? `render(<${name}/>)` : `${name}()`};
      ${expectation}    
    });
  });
 `;
};
