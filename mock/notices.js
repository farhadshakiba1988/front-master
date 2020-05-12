const fakeNotices = [
  {
    id: '000000001',
    avatar: 'images/avatar/01.jpg',
    title: 'از طرف دوست عزیز',
    datetime: '1398-08-09',
    type: 'notification',
  },
  {
    id: '000000006',
    avatar: 'images/avatar/02.jpg',
    title: 'از طرف دوست عزیز',
    description: 'توضیح ',
    datetime: '1398-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000009',
    title: 'رویداد اول',
    description: 'چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم ',
    extra: 'انجام نشده',
    status: 'todo',
    type: 'event',
  },
  {
    id: '000000010',
    title: 'رویداد دوم',
    description: 'چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم ',
    extra: 'انجام شده',
    status: 'urgent',
    type: 'event',
  },
  {
    id: '000000011',
    title: 'رویداد سوم',
    description: 'چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم ',
    extra: 'در حال انجام',
    status: 'doing',
    type: 'event',
  },
];

const getNotices = (req, res) => {
  if (req.query && req.query.type) {
    const startFrom = parseInt(req.query.lastItemId, 10) + 1;
    const result = fakeNotices
      .filter(({ type }) => type === req.query.type)
      .map((notice, index) => ({
        ...notice,
        id: `0000000${startFrom + index}`,
      }));
    return res.json(startFrom > 24 ? result.concat(null) : result);
  }
  return res.json(fakeNotices);
};

export default {
  'GET /api/notices': getNotices,
};
