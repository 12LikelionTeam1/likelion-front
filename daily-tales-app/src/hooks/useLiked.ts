import { addLiked, deleteLiked, updateLiked } from '@store/liked/slice';
import { RootStoreStateType } from '@store/store';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const LikedStorage = {
  STORAGE_KEY: '@@LIKED',
  loadLiked: () => {
    const saved = window.localStorage.getItem(LikedStorage.STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved) as string[];
    } else return [];
  },
  saveLiked: (liked: string[]) =>
    window.localStorage.setItem(
      LikedStorage.STORAGE_KEY,
      JSON.stringify(liked),
    ),
  flushLiked: () => window.localStorage.removeItem(LikedStorage.STORAGE_KEY),
};

export default function useLiked() {
  const liked = useSelector((root: RootStoreStateType) => root.liked);

  const dispatch = useDispatch();

  const __updateLiked = useCallback(
    (liked: string[]) => {
      dispatch(updateLiked({ liked }));
      LikedStorage.saveLiked(liked);
    },
    [dispatch],
  );

  const __addLiked = useCallback(
    (id: string) => {
      dispatch(addLiked(id));
      LikedStorage.saveLiked([...liked.liked, id]);
    },
    [dispatch, liked],
  );

  const __deleteLiked = useCallback(
    (id: string) => {
      dispatch(deleteLiked(id));
      const res = [...liked.liked];

      res.splice(res.findIndex((v) => v == id));

      LikedStorage.saveLiked(res);
    },
    [dispatch, liked],
  );

  useEffect(() => {
    __updateLiked(LikedStorage.loadLiked());
  }, [__updateLiked]);

  return {
    liked,
    __addLiked,
    __deleteLiked,
  };
}
