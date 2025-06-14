import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function để combine class names
 * Sử dụng clsx để merge class names một cách thông minh
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
