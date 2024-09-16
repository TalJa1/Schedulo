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
