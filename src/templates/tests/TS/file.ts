export const mockTestTS = (testStr: string) => `
describe('The describe block', () => {
  test('true equals true', () => {
    expect(true).toBe(true);
  });
});
`;
