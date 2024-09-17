export interface HeaderComponentProps {
  setDayIndex: React.Dispatch<React.SetStateAction<number>>;
  dayIndex: number;
}

export interface TaskAdditionComponentProps {
  title: string;
  subInput: React.ReactNode;
  children: React.ReactNode; // Add children to the props interface
}

export type RootStackParamList = {
  PromoSegment: {segmentIndex: number};
};

export interface FileDataProps {
  fileCopyUri: string | null;
  name: string;
  size: number;
  type: string;
  uri: string;
  check: boolean;
  date: string;
}

export interface HomeTaskBtnProps {
  tabIndex: number;
  handleNavigate: () => void;
}
