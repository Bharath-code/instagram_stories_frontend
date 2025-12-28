import { useState, useEffect, useCallback } from 'react';
import { UserStoryGroup } from '../types';
import { retryWithBackoff } from '../utils/helpers';
import { MAX_RETRIES } from '../utils/constants';

export const useStoryData = () => {
  const [stories, setStories] = useState<UserStoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await retryWithBackoff(async () => {
        const response = await fetch('/assets/data/stories.json');
        if (!response.ok) throw new Error('Failed to fetch stories');
        return response.json();
      }, MAX_RETRIES);

      if (data && data.length > 0) {
        setStories(data);
      } else {
        setStories([]);
      }
    } catch (err) {
      setError('Failed to load stories. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const retry = () => {
    setRetryCount(prev => prev + 1);
  };

  return { stories, loading, error, retry };
};
