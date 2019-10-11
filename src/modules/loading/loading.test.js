import loading, { finishLoading, initialState, startLoading } from './loading';

describe('loading', () => {
  describe('action', () => {
    describe('startLoading', () => {
      it('should successfully fetch action', () => {
        expect(startLoading('module/REQUEST_TYPE'))
          .toStrictEqual({
            type: 'loading/START_LOADING',
            payload: 'module/REQUEST_TYPE',
          });
      });
    });

    describe('finishLoading', () => {
      it('should successfully fetch action', () => {
        expect(finishLoading('module/REQUEST_TYPE'))
          .toStrictEqual({
            type: 'loading/FINISH_LOADING',
            payload: 'module/REQUEST_TYPE',
          });
      });
    });
  });

  describe('reducer', () => {
    describe('START_LOADING', () => {
      it('should successfully update states', () => {
        expect(loading(
          initialState,
          { type: 'loading/START_LOADING', payload: 'module/REQUEST_TYPE' },
        )).toStrictEqual({
          'module/REQUEST_TYPE': true,
        });
      });
    });

    describe('FINISH_LOADING', () => {
      expect(loading(
        initialState,
        { type: 'loading/FINISH_LOADING', payload: 'module/REQUEST_TYPE' },
      )).toStrictEqual({
        'module/REQUEST_TYPE': false,
      });
    });
  });
});
