export const getCurrentMonthAndYear = () => {
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11, so add 1
  const year = currentDate.getFullYear().toString();
  return `Tháng ${month}.${year}`;
};

export const getCurrentWeekDays = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  const endOfWeek = new Date(currentDate);

  // Adjust to the start of the week (Monday)
  startOfWeek.setDate(
    currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1),
  );
  // Adjust to the end of the week (Sunday)
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const daysOfWeek = [
    'C.Nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dayOfWeek = daysOfWeek[day.getDay()];
    const dayOfMonth = day.getDate().toString().padStart(2, '0');
    weekDays.push({dayOfWeek, dayOfMonth});
  }

  return weekDays;
};

export const getTodayIndex = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  return currentDay === 0 ? 6 : currentDay - 1; // Adjust so that Monday is 0 and Sunday is 6
};

export const getDayOfWeekByIndex = (index: number) => {
  const daysOfWeek = [
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
    'Chủ nhật',
  ];
  return daysOfWeek[index];
};

export const generateFormattedDate = (weekDayIndex: number): string => {
  const daysOfWeek = [
    'Chủ nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];

  // Get the current date
  const currentDate = new Date();

  // Calculate the start of the week (Monday)
  const startOfWeek = new Date(currentDate);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  startOfWeek.setDate(diff);

  // Calculate the date for the given weekDayIndex
  const targetDate = new Date(startOfWeek);
  targetDate.setDate(startOfWeek.getDate() + weekDayIndex);

  // Format the date
  const dayOfWeek = daysOfWeek[weekDayIndex];
  const date = targetDate.getDate();
  const month = targetDate.getMonth() + 1; // Months are zero-based
  const year = targetDate.getFullYear();

  return `${dayOfWeek}, ngày ${date} tháng ${month} năm ${year}`;
};
