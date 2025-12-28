export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> => {
  let delay = 1000;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
  throw new Error('Max retries exceeded');
};

export const getStoryKey = (userId: string, storyId: string) => `${userId}-${storyId}`;
