'use client';

import {
  Query,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useFirestore } from '@/firebase/provider';

export function useCollection<T>(path: string, key?: string, value?: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    if (!firestore) {
      return;
    }
    let q: Query;
    if (key && value) {
      q = query(collection(firestore, path), where(key, '==', value));
    } else {
      q = query(collection(firestore, path));
    }
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as T;
      });
      setData(documents);
    });
    return () => unsubscribe();
  }, [firestore, path, key, value]);

  return data;
}