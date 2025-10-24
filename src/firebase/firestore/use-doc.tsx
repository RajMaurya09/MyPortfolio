'use client';

import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useFirestore } from '@/firebase/provider';

export function useDoc<T>(path: string, id: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!firestore) {
      return;
    }
    const docRef = doc(firestore, path, id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setData({ ...doc.data(), id: doc.id } as T);
      } else {
        setData(null);
      }
    });
    return () => unsubscribe();
  }, [firestore, path, id]);

  return data;
}