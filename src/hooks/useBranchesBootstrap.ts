import { useEffect } from 'react';
import { useBranchesStore } from '@/store/useBranchesStore';

/**
 * Layout yuklanganda filiallar ma'lumotlarini oldindan yuklaydi
 */
export function useBranchesBootstrap() {
  const { fetchBranches, branches, isLoading } = useBranchesStore();

  useEffect(() => {
    if (branches.length === 0 && !isLoading) {
      fetchBranches();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
