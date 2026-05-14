import { z } from 'zod';

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const refreshTokens = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});

export default {
  login,
  refreshTokens,
};
