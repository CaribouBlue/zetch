import { z } from 'zod';
import { zetch } from './zetch';
import { ZetchParseError } from './zetch-errors';

const fetchSpy = jest.spyOn(global, 'fetch');

describe('zetch', () => {
  it('should exist', () => {
    expect(zetch).toBeDefined();
  });

  describe('create', () => {
    it('should exist', () => {
      expect(zetch.create).toBeDefined();
    });
  });

  describe('request', () => {
    it('should exist', () => {
      expect(zetch.request).toBeDefined();
    });

    it('should parse data', async () => {
      const mockResponseBody = { isTest: true };
      fetchSpy.mockResolvedValue(
        new Response(JSON.stringify(mockResponseBody))
      );

      const response = await zetch.request('/mock/path', {
        jsonSchema: z.object({ isTest: z.boolean() }),
      });

      expect(response.data).toEqual(mockResponseBody);
    });

    it('should throw parse error', async () => {
      const mockResponseBody = {};
      fetchSpy.mockResolvedValue(
        new Response(JSON.stringify(mockResponseBody))
      );

      expect(
        zetch.request('/mock/path', {
          jsonSchema: z.object({ isTest: z.boolean() }),
        })
      ).rejects.toBeInstanceOf(ZetchParseError);
    });
  });
});
