import { useState, useCallback } from "react";

interface AddPostModalState {
  title: string;
  content: string;
  selectedBoard: string;
  description: string;
  recruitCount: number;
  position: number | null;
  selectedPositionIds: number[];
  selectedStackIds: number[];
  location: { lat: number; lng: number } | null;
}

interface AddPostModalActions {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setSelectedBoard: (board: string) => void;
  setDescription: (description: string) => void;
  setRecruitCount: (count: number) => void;
  setPosition: (position: number | null) => void;
  setSelectedPositionIds: (positionIds: number[]) => void;
  setSelectedStackIds: (stackIds: number[]) => void;
  setLocation: (location: { lat: number; lng: number } | null) => void;
  reset: () => void;
}

export const useAddPostModal = (): AddPostModalState &
  AddPostModalActions & { isRecruitBoard: boolean } => {
  const [state, setState] = useState<AddPostModalState>({
    title: "",
    content: "",
    selectedBoard: "자유",
    description: "",
    recruitCount: 1,
    position: null,
    selectedPositionIds: [],
    selectedStackIds: [],
    location: null,
  });

  const setTitle = useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }));
  }, []);

  const setContent = useCallback((content: string) => {
    setState((prev) => ({ ...prev, content }));
  }, []);

  const setSelectedBoard = useCallback((selectedBoard: string) => {
    setState((prev) => ({ ...prev, selectedBoard }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setState((prev) => ({ ...prev, description }));
  }, []);

  const setRecruitCount = useCallback((recruitCount: number) => {
    setState((prev) => ({ ...prev, recruitCount }));
  }, []);

  const setPosition = useCallback((position: number | null) => {
    setState((prev) => ({ ...prev, position }));
  }, []);

  const setSelectedPositionIds = useCallback(
    (selectedPositionIds: number[]) => {
      setState((prev) => ({ ...prev, selectedPositionIds }));
    },
    []
  );

  const setSelectedStackIds = useCallback((selectedStackIds: number[]) => {
    setState((prev) => ({ ...prev, selectedStackIds }));
  }, []);

  const setLocation = useCallback(
    (location: { lat: number; lng: number } | null) => {
      setState((prev) => ({ ...prev, location }));
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      title: "",
      content: "",
      selectedBoard: "자유",
      description: "",
      recruitCount: 1,
      position: null,
      selectedPositionIds: [],
      selectedStackIds: [],
      location: null,
    });
  }, []);

  const isRecruitBoard =
    state.selectedBoard === "모각코" || state.selectedBoard === "프로젝트";

  return {
    ...state,
    setTitle,
    setContent,
    setSelectedBoard,
    setDescription,
    setRecruitCount,
    setPosition,
    setSelectedPositionIds,
    setSelectedStackIds,
    setLocation,
    reset,
    isRecruitBoard,
  };
};
