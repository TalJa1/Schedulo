export const tabs = ['Việc cần làm', 'Thử thách', 'Thời gian biểu'];

export const PromodoroPlayContent = [
  {
    img: require('../assets/promodoro/reading.png'),
    title: 'Đọc sách',
    time: 60,
  },
  {
    img: require('../assets/promodoro/study.png'),
    title: 'Học',
    time: 120,
  },
  {
    img: require('../assets/promodoro/drawing.png'),
    title: 'Vẽ tranh',
    time: 4,
  },
];

export const pdfImage = require('../assets/fileStorage/pdf.png'); // Adjust the import path as needed
export const docxImage = require('../assets/fileStorage/docs.png'); // Adjust the import path as needed

export const TaskGroupRadio = [
  {
    label: 'Học bài',
    img: require('../assets/home/addition/study.png'),
    backColor: '#B0DC8B',
    txtColor: '#0F684C',
  },
  {
    label: 'Học thêm',
    img: require('../assets/home/addition/study+.png'),
    backColor: '#C5DFE1',
    txtColor: '#606D8E',
  },
  {
    label: 'Học chính',
    img: require('../assets/home/addition/mainstudy.png'),
    backColor: '#EBDDF4',
    txtColor: '#814375',
  },
  {
    label: 'Vận động',
    img: require('../assets/home/addition/workout.png'),
    backColor: '#E9CDCB',
    txtColor: '#852521',
  },
  {
    label: 'Giải trí',
    img: require('../assets/home/addition/entertaining.png'),
    backColor: '#F1D6BC',
    txtColor: '#D3775D',
  },
  {
    label: 'Cá nhân',
    img: require('../assets/home/addition/selfcare.png'),
    backColor: '#E5E7F2',
    txtColor: '#3A5DA5',
  },
  {
    label: 'Ăn uống',
    img: require('../assets/home/addition/eating.png'),
    backColor: '#ECECC9',
    txtColor: '#AF4F33',
  },
  {
    label: 'Du lịch',
    img: require('../assets/home/addition/traveling.png'),
    backColor: '#AC9B43',
    txtColor: '#E6C4B4',
  },
  {
    label: 'Việc nhà',
    img: require('../assets/home/addition/washing.png'),
    backColor: '#3F4425',
    txtColor: '#EDCFD6',
  },
  {
    label: 'Bạn bè',
    img: require('../assets/home/addition/chat.png'),
    backColor: '#6A3F2B',
    txtColor: '#E0EBF2',
  },
];

export const TaskReminderRadio = [
  'Đúng giờ',
  '15 phút',
  '30 phút',
  '1 tiếng',
  '6 tiếng',
  '12 tiếng',
  '1 ngày',
  '2 ngày',
];

export const TaskRepeatRadio = ['Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'CN'];

export interface TaskItem {
  title: string;
  note: string;
  date: Date;
  time: string; // format HH:mm - HH:mm
  reminder: string;
  repeat: string[];
  group: string;
}

export const generateEmptyTaskData = (): TaskItem[][] => {
  const emptyTask: TaskItem = {
    title: '',
    note: '',
    date: new Date(),
    time: '',
    reminder: '',
    repeat: [],
    group: '',
  };

  // Create an array of 7 arrays, each containing the emptyTask object
  return Array.from({length: 7}, () => [{...emptyTask}]);
};

export const ShouldDoTask = [
  {
    title: 'Hoàn thành bài tập tin học',
    isFinished: false,
    img: require('../assets/home/homework1.png'),
  },
  {
    title: 'Đọc sách giáo khoa 30 phút',
    isFinished: false,
    img: require('../assets/home/homework2.png'),
  },
  {
    title: 'Ôn tập bài giảng buổi sáng',
    isFinished: false,
    img: require('../assets/home/homework2.png'),
  },
  {
    title: 'Chuẩn bị bài cho ngày mai',
    isFinished: false,
    img: require('../assets/home/homework1.png'),
  },
  {
    title: 'Dọn dẹp góc học tập',
    isFinished: false,
    img: require('../assets/home/homework2.png'),
  },
  {
    title: 'Học từ vựng tiếng Anh',
    isFinished: false,
    img: require('../assets/home/homework1.png'),
  },
  {
    title: 'Làm bài tập toán',
    isFinished: false,
    img: require('../assets/home/homework2.png'),
  },
  {
    title: 'Nghiên cứu tài liệu tham khảo',
    isFinished: false,
    img: require('../assets/home/homework1.png'),
  },
  {
    title: 'Thực hành lập trình',
    isFinished: false,
    img: require('../assets/home/homework1.png'),
  },
  {
    title: 'Viết bài luận văn',
    isFinished: false,
    img: require('../assets/home/homework2.png'),
  },
];
